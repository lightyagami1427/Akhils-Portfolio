import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { checkSupabase, connect, presenceMode, presenceTarget } from './transports';
import { getMe, initialsOf } from './names';
import { caseStudies } from '../case-studies';

/*
  Live visitors. Everyone on the site gets a funny tech-job alias; other people's
  cursors appear (small, quiet, at most five), and new arrivals pop up bottom right.

  Cursor positions are sent relative to the section under the pointer, so they land
  on the same content even when two people's screens are different sizes.
*/

const MAX_CURSORS = 5; // more than this gets confusing
const SEND_EVERY_MS = 320; // ~3 updates a second, smoothed on arrival (keeps well inside Supabase's free limits)
const IDLE_AFTER_MS = 4000; // fade a cursor that stopped moving
const HIDE_AFTER_MS = 45000; // remove one that's been still a long time
const TOAST_MS = 4500;
const SETTLE_MS = 1000; // anyone already listed this soon after connecting was here before you

// Add ?presence=debug to the site's address to see the live connection's status
const DEBUG = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('presence') === 'debug';

// Sections and the footer are the landmarks cursors are pinned to
const landmarks = () => Array.from(document.querySelectorAll('section, footer'));

const locate = (clientX, clientY) => {
  const list = landmarks();
  let index = -1;
  list.forEach((element, i) => {
    const box = element.getBoundingClientRect();
    if (clientX >= box.left && clientX <= box.right && clientY >= box.top && clientY <= box.bottom) index = i;
  });
  if (index === -1) {
    return { a: -1, fx: clientX / window.innerWidth, fy: (clientY + window.scrollY) / document.documentElement.scrollHeight };
  }
  const box = list[index].getBoundingClientRect();
  return { a: index, fx: (clientX - box.left) / box.width, fy: (clientY - box.top) / box.height };
};

const place = ({ a, fx, fy }) => {
  const element = landmarks()[a];
  if (!element) return { x: fx * window.innerWidth, y: fy * document.documentElement.scrollHeight };
  const box = element.getBoundingClientRect();
  return { x: box.left + window.scrollX + fx * box.width, y: box.top + window.scrollY + fy * box.height };
};

const describeView = (view) => {
  if (!view) return 'browsing';
  if (view === 'home') return 'on the home page';
  if (view === 'quick') return 'reading the 60-second version';
  const study = caseStudies[view.replace('case-', '')];
  return study ? `reading ${study.title}` : 'browsing';
};

const Avatar = ({ person, size = 28 }) => (
  <span
    className="shrink-0 rounded-full ring-2 ring-surface flex items-center justify-center font-bold text-white"
    style={{ width: size, height: size, fontSize: size * 0.38, backgroundColor: person.color }}
    aria-hidden="true"
  >
    {initialsOf(person.name)}
  </span>
);

const LiveCursor = ({ person, x, y, idle, flip, reduceMotion }) => (
  <div
    className="absolute left-0 top-0 pointer-events-none select-none"
    style={{
      transform: `translate(${x}px, ${y}px)`,
      transition: reduceMotion ? 'opacity 300ms' : `transform ${SEND_EVERY_MS + 40}ms linear, opacity 400ms`,
      opacity: idle ? 0.35 : 0.9,
    }}
  >
    <svg width="16" height="16" viewBox="0 0 22 22" className="block drop-shadow-sm">
      <path d="M3 2.5 18.5 9l-6.6 2.3L9.5 18 3 2.5Z" fill={person.color} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
    <span
      className="absolute top-3.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight text-white"
      style={{ backgroundColor: person.color, ...(flip ? { right: 10 } : { left: 10 }) }}
    >
      {person.name}
    </span>
  </div>
);

const PresenceLayer = ({ view, raised = false }) => {
  const reduceMotion = useReducedMotion();
  const [me] = useState(getMe);
  const [fine] = useState(() => window.matchMedia('(pointer: fine)').matches);
  const [peers, setPeers] = useState([]);
  const [cursors, setCursors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [overFooter, setOverFooter] = useState(false);
  const [restCheck, setRestCheck] = useState('checking…');
  const [status, setStatus] = useState({ state: presenceMode === 'off' ? 'off' : 'connecting', detail: '' });
  const [showCursors, setShowCursors] = useState(() => {
    try {
      return sessionStorage.getItem('presence-cursors') !== 'off';
    } catch {
      return true;
    }
  });

  const connection = useRef(null);
  const known = useRef(new Set());
  const viewRef = useRef(view);
  const peerCount = useRef(0);
  const liveSince = useRef(0); // local time we went live; never compared with other devices' clocks

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    peerCount.current = peers.length;
  }, [peers]);

  const addToast = useCallback((person, text) => {
    const id = `${person.id}-${Date.now()}`;
    setToasts((list) => [...list.slice(-2), { id, person, text }]);
    setTimeout(() => setToasts((list) => list.filter((toast) => toast.id !== id)), TOAST_MS);
  }, []);

  // Connect once, and hear about everyone else
  useEffect(() => {
    if (presenceMode === 'off') return undefined;
    let cancelled = false;
    let current = null;

    connect({
      me,
      onPeers: (list) => {
        if (cancelled) return;
        setPeers(list);
        list.forEach((peer) => {
          if (known.current.has(peer.id)) return;
          known.current.add(peer.id);
          // Only people who arrive after you get a "just landed". Timed on this device only,
          // because other people's clocks can be minutes off.
          if (liveSince.current && Date.now() - liveSince.current > SETTLE_MS) addToast(peer, 'landed just now');
          // Let the newcomer know which page I'm on, even if I haven't moved my mouse
          connection.current?.sendCursor({ view: viewRef.current, viewOnly: true });
        });
        const ids = new Set(list.map((peer) => peer.id));
        setCursors((previous) => Object.fromEntries(Object.entries(previous).filter(([id]) => ids.has(id))));
      },
      onStatus: (state, detail) => {
        if (cancelled) return;
        setStatus({ state, detail: detail || '' });
        if (DEBUG) console.info('[presence]', state, detail || '');
        if (state !== 'SUBSCRIBED' || liveSince.current) return;
        liveSince.current = Date.now();
        try {
          if (!sessionStorage.getItem('presence-welcomed')) {
            sessionStorage.setItem('presence-welcomed', '1');
            addToast(me, 'that’s you, for this visit');
          }
        } catch {
          // no storage, no welcome
        }
      },
      onCursor: (data) => {
        if (cancelled || !data || !data.id) return;
        setCursors((previous) => {
          const before = previous[data.id];
          if (data.viewOnly) {
            // Same page: keep their cursor where it was. New page: their old cursor no longer applies.
            if (before && before.view === data.view) return previous;
            return { ...previous, [data.id]: { id: data.id, view: data.view, gone: true, at: Date.now() } };
          }
          return { ...previous, [data.id]: { ...data, at: Date.now() } };
        });
      },
    })
      .then((made) => {
        if (cancelled) {
          made?.close();
          return;
        }
        current = made;
        connection.current = made;
        if (!made) setStatus({ state: 'unsupported', detail: '' });
      })
      .catch((error) => {
        // If the live connection fails, the site simply works without it
        setStatus({ state: 'failed', detail: error?.message || String(error) });
      });

    return () => {
      cancelled = true;
      current?.close();
      connection.current = null;
    };
  }, [me, addToast]);

  // Send my cursor, a few times a second, only while someone else is here to see it
  useEffect(() => {
    if (!fine || presenceMode === 'off') return undefined;
    let last = 0;
    let timer = null;
    let pending = null;
    let pointer = null;

    const flush = () => {
      timer = null;
      if (!pending || !connection.current) return;
      connection.current.sendCursor(pending);
      last = Date.now();
      pending = null;
    };

    const schedule = (payload) => {
      if (peerCount.current === 0) return;
      pending = payload;
      // Busier site, slower updates, so the free plan's message limit is never hit
      const interval = SEND_EVERY_MS * Math.max(1, (peerCount.current + 1) / 5);
      const wait = interval - (Date.now() - last);
      if (wait <= 0) flush();
      else if (!timer) timer = setTimeout(flush, wait);
    };

    const onMove = (event) => {
      if (document.hidden) return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule({ view: viewRef.current, ...locate(pointer.x, pointer.y) });
    };
    const onScroll = () => {
      if (pointer && !document.hidden) schedule({ view: viewRef.current, ...locate(pointer.x, pointer.y) });
    };
    const onLeave = () => {
      pointer = null;
      schedule({ view: viewRef.current, gone: true });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [fine]);

  // Tell others which page I'm on when it changes (works for phones too)
  useEffect(() => {
    if (connection.current && peerCount.current > 0) connection.current.sendCursor({ view, viewOnly: true });
  }, [view]);

  // Debug: test the URL and key with an ordinary request
  useEffect(() => {
    if (!DEBUG || presenceMode !== 'supabase') return undefined;
    let cancelled = false;
    checkSupabase().then((result) => {
      if (!cancelled) setRestCheck(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A slow tick to fade idle cursors and follow layout changes
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1500);
    const onResize = () => setNow(Date.now());
    window.addEventListener('resize', onResize);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Move up out of the way of the scroll counter at the footer
  useEffect(() => {
    const footer = document.getElementById('contact');
    if (!footer) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [view]);

  const toggleCursors = () => {
    setShowCursors((previous) => {
      try {
        sessionStorage.setItem('presence-cursors', previous ? 'off' : 'on');
      } catch {
        // fine without storage
      }
      return !previous;
    });
  };

  const debugPanel = DEBUG && (
    <div className="fixed left-3 top-3 z-50 max-w-[calc(100vw-1.5rem)] rounded-lg bg-black/85 px-3 py-2 text-[12px] leading-relaxed text-white font-mono">
      <div>Live visitors · {presenceMode}</div>
      {presenceMode === 'supabase' && (
        <>
          <div>URL: {presenceTarget.url}</div>
          <div>Key: {presenceTarget.key}</div>
          <div>Check: {restCheck}</div>
        </>
      )}
      <div>
        Status: <b className={status.state === 'SUBSCRIBED' ? 'text-emerald-400' : 'text-amber-300'}>{status.state}</b>
        {status.detail && ` (${status.detail})`}
      </div>
      <div>You: {me.name} · {me.id.slice(0, 8)}</div>
      <div>Others here: {peers.length}</div>
    </div>
  );

  if (presenceMode === 'off') return debugPanel || null;

  const peopleById = Object.fromEntries(peers.map((peer) => [peer.id, peer]));
  const pageWidth = document.documentElement.clientWidth;
  const pageHeight = document.documentElement.scrollHeight;

  const visible =
    fine && showCursors
      ? Object.values(cursors)
          .filter((cursor) => peopleById[cursor.id] && cursor.view === view && !cursor.gone && now - cursor.at < HIDE_AFTER_MS)
          .sort((first, second) => second.at - first.at)
          .slice(0, MAX_CURSORS)
      : [];

  const lifted = raised || overFooter;

  return (
    <>
      {debugPanel}
      {createPortal(
        <div aria-hidden="true" className="absolute left-0 top-0 h-0 w-0 z-30">
          {visible.map((cursor) => {
            const spot = place(cursor);
            const x = Math.min(Math.max(spot.x, 0), pageWidth - 18);
            const y = Math.min(Math.max(spot.y, 0), pageHeight - 30);
            return (
              <LiveCursor
                key={cursor.id}
                person={peopleById[cursor.id]}
                x={x}
                y={y}
                idle={now - cursor.at > IDLE_AFTER_MS}
                flip={x > pageWidth - 200}
                reduceMotion={reduceMotion}
              />
            );
          })}
        </div>,
        document.body
      )}

      <div
        className={`fixed z-40 right-3 sm:right-5 flex flex-col items-end gap-2 max-w-[calc(100vw-1.5rem)] transition-[bottom] duration-300 ${
          lifted ? 'bottom-20 sm:bottom-24' : 'bottom-20 sm:bottom-5'
        }`}
      >
        {/* Arrivals */}
        <div aria-live="polite" className={`flex flex-col items-end gap-2 ${open ? 'hidden' : ''}`}>
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                layout={!reduceMotion}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface pl-2.5 pr-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)] text-[13.5px]"
              >
                <Avatar person={toast.person} size={26} />
                <span>
                  <span className="font-semibold">{toast.person.name}</span> <span className="text-secondary">{toast.text}</span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Who's here */}
        {peers.length > 0 && (
          <div className="relative">
            {open && (
              <div className="absolute bottom-full right-0 mb-2 w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-line bg-surface p-2 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
                <p className="px-2.5 pt-1.5 pb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary">Here right now</p>
                <ul className="max-h-[50vh] overflow-y-auto">
                  {[me, ...peers].map((person) => {
                    const latest = person.id === me.id ? view : cursors[person.id]?.view;
                    return (
                      <li key={person.id} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
                        <Avatar person={person} size={28} />
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-semibold">
                            {person.name}
                            {person.id === me.id && <span className="font-normal text-secondary"> (you)</span>}
                          </span>
                          <span className="block text-[12.5px] text-secondary">{describeView(latest)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {fine && (
                  <button
                    type="button"
                    onClick={toggleCursors}
                    role="switch"
                    aria-checked={showCursors}
                    className="mt-1 flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-[14px] font-medium hover:bg-card"
                  >
                    Show their cursors
                    <span className={`relative h-5 w-9 rounded-full transition-colors ${showCursors ? 'bg-accent' : 'bg-line'}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-[left] ${showCursors ? 'left-[18px]' : 'left-0.5'}`} />
                    </span>
                  </button>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setOpen((previous) => !previous)}
              aria-expanded={open}
              className="h-10 pl-1.5 pr-3.5 rounded-full border border-line bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-2 text-[13px] font-semibold"
            >
              <span className="flex -space-x-2">
                {[me, ...peers].slice(0, 4).map((person) => (
                  <Avatar key={person.id} person={person} size={26} />
                ))}
              </span>
              {peers.length + 1} here now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PresenceLayer;
