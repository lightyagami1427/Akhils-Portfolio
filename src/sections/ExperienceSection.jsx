import React from 'react';
import { experience } from '../data/portfolio';
import ExperienceCard from '../components/ExperienceCard';

const ExperienceSection = () => {
  return (
    <section id="experience" data-annotate="experience: stamps spring in, stiffness 520" className="bg-background text-primary py-20 sm:py-28 transition-colors duration-300">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <h2 data-spec="Heading" className="heading text-[clamp(2.5rem,5.4vw,4.75rem)] max-w-[12ch]">
              Companies that didn&rsquo;t say &ldquo;we will get back to you&rdquo;
            </h2>
            <p className="mt-6 font-script text-[26px] leading-none text-secondary -rotate-2 origin-left">
              {experience.length} for {experience.length}, so far
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5 pt-3">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
