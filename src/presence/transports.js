/*
  How visitors find each other. Two interchangeable connections with the same shape:

    const connection = await connect({ me, onPeers, onCursor, onStatus })
    connection.sendCursor(payload)
    connection.close()

  onPeers(list)   - everyone else currently on the site
  onCursor(data)  - a cursor update from someone else
  onStatus(status, detail) - 'SUBSCRIBED' once live; 'CHANNEL_ERROR', 'TIMED_OUT' or 'CLOSED' if not

  "supabase": real visitors across the internet (needs the two env vars below).
  "local":    browser tabs on one machine. Used in development and the preview.
*/

// Forgiving about how the values were pasted: spaces, quotes, a missing https://, a trailing slash,
// or a dashboard link (supabase.com/dashboard/project/<id>) all become https://<id>.supabase.co
const cleanUrl = (raw) => {
  let value = String(raw || '').trim().replace(/^['"]|['"]$/g, '');
  if (!value) return '';
  const fromDashboard = value.match(/supabase\.com\/dashboard\/project\/([a-z0-9]+)/i);
  if (fromDashboard) return `https://${fromDashboard[1]}.supabase.co`;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
};
const cleanKey = (raw) => String(raw || '').trim().replace(/^['"]|['"]$/g, '').replace(/\s+/g, '');

const SUPABASE_URL = cleanUrl(import.meta.env.VITE_SUPABASE_URL);
// The publishable key (sb_publishable_...) or the older anon key; both are safe in the browser
const SUPABASE_KEY = cleanKey(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY);

// Shown in the debug box (?presence=debug). Neither value is secret; the key is cut short anyway.
export const presenceTarget = {
  url: SUPABASE_URL || '(none)',
  key: SUPABASE_KEY ? `${SUPABASE_KEY.slice(0, 18)}…` : '(none)',
};
const CHANNEL = 'portfolio-presence';

export const presenceMode =
  SUPABASE_URL && SUPABASE_KEY ? 'supabase' : import.meta.env.DEV || import.meta.env.VITE_PRESENCE === 'local' ? 'local' : 'off';

// Debug only: an ordinary request that shows whether the URL and the key work, separately from the live connection
export const checkSupabase = async () => {
  if (!SUPABASE_URL || !SUPABASE_KEY) return 'no URL or key in this build';
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/heartbeat?select=id&limit=1`, { headers: { apikey: SUPABASE_KEY } });
    if (response.ok) return `${response.status} OK: URL and key both work`;
    if (response.status === 401 || response.status === 403) return `${response.status}: URL works, but the key is refused`;
    if (response.status === 404) return '404: URL works and key accepted, but the heartbeat table is missing';
    return `${response.status}: unexpected answer`;
  } catch (error) {
    return `no answer: the URL is wrong or unreachable (${error?.message || error})`;
  }
};

const toPeer = ({ id, name, color, joinedAt }) => ({ id, name, color, joinedAt });

/* ---------- Supabase Realtime: Presence for who's here, Broadcast for cursors ---------- */

const connectSupabase = async ({ me, onPeers, onCursor, onStatus }) => {
  // Loaded only when presence is switched on, so it never weighs down the page otherwise
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const channel = client.channel(CHANNEL, {
    config: { presence: { key: me.id }, broadcast: { self: false } },
  });

  channel.on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    const peers = Object.entries(state)
      .filter(([key]) => key !== me.id)
      .map(([key, entries]) => toPeer({ ...entries[0], id: key }));
    onPeers(peers);
  });

  channel.on('broadcast', { event: 'cursor' }, ({ payload }) => onCursor(payload));

  // Supabase pauses free projects after a quiet week of database activity. Live cursors never
  // touch the database, so each visit reads one tiny row (see README) to keep the project awake.
  client
    .from('heartbeat')
    .select('id')
    .limit(1)
    .then(
      () => {},
      () => {}
    );

  let tracked = false;
  channel.subscribe(async (status, error) => {
    onStatus(status, error?.message);
    // Presence is tracked once per visit; Supabase allows only a few presence calls per 30 seconds
    if (status === 'SUBSCRIBED' && !tracked) {
      tracked = true;
      const result = await channel.track(toPeer(me));
      if (result !== 'ok') onStatus('TRACK_FAILED', String(result));
    }
  });

  return {
    sendCursor: (payload) => channel.send({ type: 'broadcast', event: 'cursor', payload: { id: me.id, ...payload } }),
    close: () => client.removeChannel(channel),
  };
};

/* ---------- Local: BroadcastChannel between tabs, with heartbeats ---------- */

const connectLocal = async ({ me, onPeers, onCursor, onStatus }) => {
  if (typeof BroadcastChannel === 'undefined') return null;
  const channel = new BroadcastChannel(CHANNEL);
  const peers = new Map(); // id -> { peer, seen }
  const emit = () => onPeers([...peers.values()].map((entry) => entry.peer));
  const post = (message) => channel.postMessage(message);

  channel.onmessage = ({ data }) => {
    if (!data || data.id === me.id) return;
    if (data.type === 'hello' || data.type === 'here' || data.type === 'beat') {
      const known = peers.has(data.id);
      peers.set(data.id, { peer: toPeer(data.peer), seen: Date.now() });
      if (!known) emit();
      if (data.type === 'hello') post({ type: 'here', id: me.id, peer: toPeer(me) });
    } else if (data.type === 'bye') {
      if (peers.delete(data.id)) emit();
    } else if (data.type === 'cursor') {
      onCursor({ id: data.id, ...data.payload });
    }
  };

  post({ type: 'hello', id: me.id, peer: toPeer(me) });
  setTimeout(() => onStatus('SUBSCRIBED'), 0);

  // Heartbeats keep the list honest if a tab closes without saying goodbye
  const heartbeat = setInterval(() => {
    post({ type: 'beat', id: me.id, peer: toPeer(me) });
    const cutoff = Date.now() - 12000;
    let changed = false;
    peers.forEach((entry, id) => {
      if (entry.seen < cutoff) {
        peers.delete(id);
        changed = true;
      }
    });
    if (changed) emit();
  }, 4000);

  const sayBye = () => post({ type: 'bye', id: me.id });
  window.addEventListener('pagehide', sayBye);

  return {
    sendCursor: (payload) => post({ type: 'cursor', id: me.id, payload }),
    close: () => {
      sayBye();
      clearInterval(heartbeat);
      window.removeEventListener('pagehide', sayBye);
      channel.close();
    },
  };
};

export const connect = (options) => {
  if (presenceMode === 'supabase') return connectSupabase(options);
  if (presenceMode === 'local') return connectLocal(options);
  return Promise.resolve(null);
};
