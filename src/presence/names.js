/*
  Every visitor gets a random tech-job alias for the session, like
  "Caffeinated DevOps" or "Null-Pointer Intern". Edit the lists freely;
  keep each word short so the name tag stays small.
*/
const MOODS = [
  'Caffeinated', 'Sleepy', '10x', 'Merge-Conflicted', 'Deadline-Dodging', 'Tab-Hoarding', 'Dark-Mode',
  'Ctrl+Z', 'Friday-Deploying', 'Stand-up-Skipping', 'Legacy-Code', 'Undefined', 'Null-Pointer', 'Hotfix',
  'Rubber-Duck', 'Overbooked', 'Lorem-Ipsum', 'Pixel-Peeping', 'Bug-Squashing', 'Cache-Clearing', 'Sudo',
  'Async', 'Agile-ish', 'Infinite-Loop', 'Unpaid-Overtime', 'Copy-Pasting', 'Kanban-Crazed', 'Off-by-One',
];

const ROLES = [
  'HR', 'Recruiter', 'Developer', 'DevOps', 'QA Tester', 'Product Manager', 'Data Scientist', 'Scrum Master',
  'CTO', 'Intern', 'Designer', 'Founder', 'Sysadmin', 'Frontend Dev', 'Backend Dev', 'Tech Lead', 'SRE',
  'Hiring Manager', 'Copywriter', 'Security Engineer',
];

const COLORS = ['#8a3ffc', '#12a150', '#f26b1d', '#0c8ce9', '#e5342a', '#d1349a', '#0f9d9a', '#c28b00'];

const pick = (list) => list[Math.floor(Math.random() * list.length)];

const makeId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// Two letters for avatar circles: "Caffeinated DevOps" -> "CD"
export const initialsOf = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

// The visitor's identity, kept for the browser session so a refresh doesn't rename them
export const getMe = () => {
  const KEY = 'presence-me';
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY));
    if (saved && saved.id && saved.name) return { ...saved, joinedAt: Date.now() };
  } catch {
    // storage unavailable or empty, fall through to a new identity
  }
  const me = { id: makeId(), name: `${pick(MOODS)} ${pick(ROLES)}`, color: pick(COLORS) };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(me));
  } catch {
    // private mode: the name just won't survive a refresh
  }
  return { ...me, joinedAt: Date.now() };
};
