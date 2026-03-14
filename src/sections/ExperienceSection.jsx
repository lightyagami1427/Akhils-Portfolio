import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import ExperienceCard from '../components/ExperienceCard';
import avatarheadphonesImg from '../assets/avatar_headphones.png';

const ExperienceSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Left Side: Large Portrait Avatar */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[550px] aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <img
                src={avatarheadphonesImg}
                alt="Akhil Nishtala Portrait"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Right Side: Experience List */}
          <div className="flex-1 flex flex-col justify-center gap-4">
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
