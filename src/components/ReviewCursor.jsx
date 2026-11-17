import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
  A "multiplayer" cursor with a name tag and a comment bubble, like someone
  else reviewing the file. Used in the hero to play out the hiring conversation.

  color   - any CSS colour (use the --color-violet / green / orange tokens)
  from    - where the cursor flies in from, e.g. { x: -160, y: 80 }
  delay   - seconds before it arrives
  onView  - wait until the cursor scrolls into view before arriving
*/
const ReviewCursor = ({ name, comment, color, from = { x: 0, y: 0 }, delay = 0, className = '', onView = false }) => {
  const reduceMotion = useReducedMotion();
  // Either play on load, or once when scrolled into view
  const play = (target) => (onView ? { whileInView: target, viewport: { once: true, amount: 0.8 } } : { animate: target });

  return (
    <motion.div
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, x: from.x, y: from.y }}
      {...play({ opacity: 1, x: 0, y: 0 })}
      transition={{ type: 'spring', stiffness: 70, damping: 16, delay }}
      className={`pointer-events-none select-none ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" className="block drop-shadow-sm">
        <path d="M3 2.5 18.5 9l-6.6 2.3L9.5 18 3 2.5Z" fill={color} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>

      <div className="ml-4 -mt-0.5 flex flex-col items-start gap-1.5">
        <span
          className="rounded-full rounded-tl-none px-2.5 py-1 text-[12px] font-semibold leading-none text-white whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {name}
        </span>

        {comment && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            {...play({ opacity: 1, scale: 1 })}
            transition={{ type: 'spring', stiffness: 420, damping: 24, delay: delay + 0.55 }}
            style={{ transformOrigin: 'top left' }}
            className="max-w-[230px] rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-[14px] font-medium leading-snug text-primary shadow-[0_6px_24px_rgba(0,0,0,0.14)] border border-line"
          >
            {comment}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCursor;
