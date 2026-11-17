/*
  Tailored links: send a company a link like  yoursite.com/?for=Razorpay
  and the hero greets that team by name. Only letters, numbers and simple
  punctuation are kept, and the name is capped so nothing can break the layout.
*/
export const getVisitorCompany = () => {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('for');
  if (!raw) return null;
  const clean = raw.replace(/[^\p{L}\p{N} &.'-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 24);
  return clean || null;
};
