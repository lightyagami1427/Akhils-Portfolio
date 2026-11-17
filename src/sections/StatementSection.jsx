import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const STATEMENT =
  'Passionate about crafting intuitive and engaging digital experiences. I design user-centered products that balance creativity, usability, and meaningful impact.';

// Each word goes from faint to full ink as the section scrolls past
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
};

const StatementSection = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = STATEMENT.split(' ');

  return (
    <section data-annotate="statement: each word fades 0.18 to 1 as you scroll" className="bg-background text-primary py-24 sm:py-36 transition-colors duration-300">
      <div className="shell">
        <p ref={ref} data-spec="Statement" className="heading text-[clamp(2rem,5.6vw,5.25rem)] leading-[1.04] max-w-[19ch] sm:max-w-[22ch]" style={{ lineHeight: 1.04 }}>
          {reduceMotion
            ? STATEMENT
            : words.map((word, index) => (
                <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
                  {word}
                </Word>
              ))}

          {/* His own cursor, parked where the sentence ends */}
          <span className="inline-flex items-start align-baseline ml-1 translate-y-3 font-sans" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" className="block shrink-0">
              <path d="M3 2.5 18.5 9l-6.6 2.3L9.5 18 3 2.5Z" fill="var(--color-accent)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="mt-4 -ml-1 rounded-full rounded-tl-none bg-accent px-3 py-1.5 text-[13px] font-semibold leading-none tracking-normal text-white whitespace-nowrap">
              Akhil Nishtala
            </span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default StatementSection;
