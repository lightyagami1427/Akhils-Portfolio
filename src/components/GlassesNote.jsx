import React from 'react';

/*
  A handwritten margin note that only appears while wearing glasses.
  arrow: which way the little arrow points ('left', 'up', or none)
  show: the class that reveals it, e.g. 'lg:glasses:inline-flex' for desktop only
*/
const Arrow = ({ direction }) => (
  <svg
    width="34"
    height="22"
    viewBox="0 0 34 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${direction === 'up' ? '-rotate-90' : ''}`}
    aria-hidden="true"
  >
    <path d="M32 15C24 5 13 4 4 11" />
    <path d="M4 11l6.5-.6M4 11l2.4 6" />
  </svg>
);

const GlassesNote = ({ children, arrow = 'left', show = 'glasses:inline-flex', className = '' }) => (
  <span
    aria-hidden="true"
    className={`hidden ${show} items-center gap-1.5 font-script text-[23px] leading-none text-spec whitespace-nowrap select-none pointer-events-none ${className}`}
  >
    {arrow && <Arrow direction={arrow} />}
    {children}
  </span>
);

export default GlassesNote;
