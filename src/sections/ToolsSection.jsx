import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { tools } from '../data/portfolio';
import avatar from '../assets/avatar.webp';
import GlassesNote from '../components/GlassesNote';

const BASE = 56;   // resting icon size in px
const PEAK = 88;   // size right under the pointer
const REACH = 150; // how far the magnify effect spreads, in px

// One icon in the dock. It grows as the pointer gets close.
const DockIcon = ({ tool, pointerX, enabled }) => {
  const ref = useRef(null);

  const distance = useTransform(pointerX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return REACH;
    return value - (bounds.left + bounds.width / 2);
  });
  const targetSize = useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE]);
  const size = useSpring(targetSize, { stiffness: 320, damping: 22, mass: 0.4 });

  return (
    <motion.li
      ref={ref}
      style={enabled ? { width: size, height: size } : { width: BASE, height: BASE }}
      className="shrink-0"
    >
      <img src={tool.iconImg} alt={tool.name} className="h-full w-full object-contain rounded-[22%]" />
    </motion.li>
  );
};

const ToolsSection = () => {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(Infinity);

  return (
    <section data-annotate="dock: icons grow 56px to 88px within 150px of the pointer" className="bg-background text-primary pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden transition-colors duration-300">
      <div className="shell flex flex-col items-center text-center">
        <h2 data-spec="Heading" className="heading text-[clamp(2.5rem,6.5vw,5rem)] max-w-[14ch]">Tools that will see my face daily</h2>

        {/* The face in question, looking over the dock */}
        <img
          src={avatar}
          alt="Akhil's 3D avatar wearing headphones"
          loading="lazy"
          className="mt-10 w-[250px] sm:w-[330px] h-auto -mb-10 sm:-mb-14 relative z-0"
        />

        {/* Desktop: a dock that magnifies under the pointer */}
        <ul
          onMouseMove={(event) => pointerX.set(event.clientX)}
          onMouseLeave={() => pointerX.set(Infinity)}
          className="hidden lg:flex relative z-10 items-end gap-3 h-[84px] px-3.5 pb-3.5 rounded-[26px] bg-surface border border-line shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
        >
          {tools.map((tool, index) => (
            <DockIcon key={index} tool={tool} pointerX={pointerX} enabled={!reduceMotion} />
          ))}
        </ul>

        {/* Smaller screens: the same dock, wrapped into rows */}
        <ul className="lg:hidden relative z-10 grid grid-cols-5 sm:grid-cols-7 gap-3 p-3.5 rounded-[26px] bg-surface border border-line shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
          {tools.map((tool, index) => (
            <li key={index} className="w-[52px] h-[52px]">
              <img src={tool.iconImg} alt={tool.name} loading="lazy" className="h-full w-full object-contain rounded-[22%]" />
            </li>
          ))}
        </ul>
        <GlassesNote arrow="up" show="lg:glasses:inline-flex" className="mt-4">hover it. it magnifies.</GlassesNote>
      </div>
    </section>
  );
};

export default ToolsSection;
