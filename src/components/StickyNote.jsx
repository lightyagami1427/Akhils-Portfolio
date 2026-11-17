import React, { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  yellow: '#ffdd55',
  pink: '#ffb8d9',
  blue: '#b5dcff',
  green: '#bdf0c2',
  violet: '#d9c8ff',
};

const ALIGN = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/*
  A sticky note with one joke on it, dropped between sections.
  With a mouse it can be picked up and dragged around. On touch screens it
  stays put so it never gets in the way of scrolling.
*/
// spacing: Tailwind margin classes. The default tucks the note into the gap between two sections.
const StickyNote = ({ children, color = 'yellow', tilt = -3, align = 'left', spacing = '-my-6 sm:-my-10' }) => {
  const [canDrag] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  return (
    <div className={`shell relative z-20 flex ${ALIGN[align]} ${spacing} pointer-events-none`}>
      <motion.blockquote
        drag={canDrag}
        dragMomentum={false}
        whileDrag={{ scale: 1.06, boxShadow: '0 28px 50px rgba(0,0,0,0.28)' }}
        style={{ rotate: tilt, backgroundColor: COLORS[color] || COLORS.yellow }}
        className={`pointer-events-auto w-[250px] sm:w-[290px] px-5 pt-5 pb-6 text-black font-script text-[27px] sm:text-[29px] leading-[1.08] shadow-[0_10px_24px_rgba(0,0,0,0.16)] select-none ${
          canDrag ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        {children}
      </motion.blockquote>
    </div>
  );
};

export default StickyNote;
