import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import MiniAkhil from './MiniAkhil';

// What the counter says as the visitor gets further down the page, and the face
// little Akhil pulls for each line (see MiniAkhil for the options). Edit freely.
const QUIPS = [
  { from: 0.08, face: 'impressed', text: 'Most people stop at the hero. Not you.' },
  { from: 0.25, face: 'smug', text: 'Still scrolling. Good sign.' },
  { from: 0.45, face: 'teary', text: 'That’s more attention than my CV ever got.' },
  { from: 0.65, face: 'wink', text: 'At this point we’re basically colleagues.' },
  { from: 0.85, face: 'eager', text: 'Nearly there. The email button is close.' },
  { from: 0.985, face: 'starstruck', text: 'You scrolled all of it. Now you have to hire me. Rules are rules.' },
];

/*
  A small measurement tag pinned to the corner, like the red distance labels
  in a design tool. It counts the pixels scrolled and comments on it.
*/
const ScrollMeter = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [pixels, setPixels] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const [overArcade, setOverArcade] = useState(false);
  const [overFooter, setOverFooter] = useState(false);

  // Step aside while the games are on screen, so it never covers a play area
  useEffect(() => {
    const arcade = document.getElementById('arcade');
    if (!arcade) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOverArcade(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(arcade);
    return () => observer.disconnect();
  }, []);

  // At the footer it moves to the right, so it never covers the email
  useEffect(() => {
    const footer = document.getElementById('contact');
    if (!footer) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, 'change', (value) => setPixels(Math.round(value)));
  useMotionValueEvent(scrollYProgress, 'change', (value) => setProgress(value));

  const quip = [...QUIPS].reverse().find((item) => progress >= item.from);
  if (hidden || overArcade || !quip) return null;

  return (
    <div className={`fixed z-40 bottom-3 sm:bottom-5 max-w-[calc(100vw-1.5rem)] ${overFooter ? 'right-3 sm:right-5' : 'left-3 sm:left-5'}`}>
      {/* Little Akhil, peeking over the label. A new line makes him pop up with a new face. */}
      <div className="absolute left-1.5 bottom-[calc(100%-17px)] w-[84px] h-[84px] pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={quip.face}
            initial={reduceMotion ? { opacity: 0 } : { y: 44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 44, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <MiniAkhil expression={quip.face} className="block w-full h-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-stretch rounded-lg overflow-hidden bg-surface text-primary border border-line shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        <span className="flex items-center bg-stamp px-2.5 text-[12.5px] font-semibold text-white tabular-nums whitespace-nowrap">
          {pixels.toLocaleString('en-US')}px
        </span>
        <span className="px-3 py-2 text-[13px] sm:text-[13.5px] font-medium leading-snug">{quip.text}</span>
        <button
          onClick={() => setHidden(true)}
          aria-label="Hide the scroll counter"
          className="px-2.5 flex items-center text-secondary hover:text-primary border-l border-line"
        >
          <FiX size={15} />
        </button>
      </div>
    </div>
  );
};

export default ScrollMeter;
