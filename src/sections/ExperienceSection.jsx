import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import ExperienceCard from '../components/ExperienceCard';
import avatarheadphonesImg from '../assets/avatar_headphones.png';

const ExperienceSection = () => {
  return (
    <section className="py-24 bg-background transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

          {/* Left Side: Large Portrait Avatar */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ translateZ: 0 }}
              className="relative w-full h-full min-h-[400px] overflow-hidden rounded-3xl -mt-[5px]"
            >
              <img
                src={avatarheadphonesImg}
                alt="Akhil Nishtala Portrait"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </motion.div>
          </div>

          {/* Right Side: Experience List */}
          <div className="flex-1 flex flex-col justify-center gap-5 py-2">
            <div className="flex items-center gap-2 mb-2 ml-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <h3 className="text-[12px] font-black tracking-tight text-primary uppercase">
                COMPANIES THAT DIDN'T SAY "WE WILL GET BACK TO YOU"
              </h3>
            </div>
            {experience.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
