import React from 'react';
import shot1 from '../assets/hero1.webp';
import shot2 from '../assets/hero2.webp';
import shot3 from '../assets/hero3.webp';
import shot4 from '../assets/hero4.webp';
import shot5 from '../assets/hero5.webp';
import shot6 from '../assets/hero6.webp';
import shot7 from '../assets/hero7.webp';

// The tall collages that used to circle the old hero. Add or remove freely.
const shots = [shot1, shot2, shot3, shot4, shot5, shot6, shot7];

const MoreWorkSection = () => {
  return (
    <section data-annotate="strip: scroll-snap to center, shots rotated -90deg" className="bg-background text-primary pb-20 sm:pb-28 transition-colors duration-300">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-2 mb-7">
        <h2 className="heading text-[clamp(2rem,4.5vw,3.5rem)]">More from the canvas</h2>
        <p className="text-[15.5px] text-secondary pb-1">Scroll sideways for more.</p>
      </div>

      <ul
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 sm:px-10 pb-2 2xl:justify-center"
        tabIndex={0}
        aria-label="More design work"
      >
        {shots.map((shot, index) => (
          <li
            key={index}
            className="relative snap-center shrink-0 w-[78vw] sm:w-[440px] aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface"
          >
            {/* The source files are stored sideways, so turn them upright */}
            <img
              src={shot}
              alt={`Design exploration ${index + 1}`}
              loading="lazy"
              className="absolute left-1/2 top-1/2 w-[75%] h-[133.34%] max-w-none object-cover -translate-x-1/2 -translate-y-1/2 -rotate-90"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MoreWorkSection;
