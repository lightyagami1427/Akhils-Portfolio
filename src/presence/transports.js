/*
  How visitors find each other. Two interchangeable connections with the same shape:

    const connection = await connect({ me, onPeers, onCursor })
    connection.sendCursor(payload)
    connection.close()

  onPeers(list)   - everyone else currently on the site
  onCursor(data)  - a cursor update from someone else

  "supabase": real visitors across the internet (needs the two env vars below).
  "local":    browser tabs on one machine. Used in development and the preview.
*/

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// The publishable key (sb_publishable_...) or the older anon key; both are safe in the browser
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const CHANNEL = 'portfolio-presence';

export const presenceMode =
  SUPABASE_URL && SUPABASE_KEY ? 'supabase' : import.meta.env.DEV || import.meta.env.VITE_PRESENCE === 'local' ? 'local' : 'off';

const toPeer = ({ id, name, color, joinedAt }) => ({ id, name, color, joinedAt });

/* ---------- Supabase Realtime: Presence for who's here, Broadcast for cursors ---------- */

const connectSupabase = async ({ me, onPeers, onCursor }) => {
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

  channel.subscribe(async (status) => {
    // Presence is tracked once per visit; Supabase allows only a few presence calls per 30 seconds
    if (status === 'SUBSCRIBED') await channel.track(toPeer(me));
  });

  return {
    sendCursor: (payload) => channel.send({ type: 'broadcast', event: 'cursor', payload: { id: me.id, ...payload } }),
    close: () => client.removeChannel(channel),
  };
};

/* ---------- Local: BroadcastChannel between tabs, with heartbeats ---------- */

const connectLocal = async ({ me, onPeers, onCursor }) => {
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
