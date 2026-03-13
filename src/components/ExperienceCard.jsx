import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-5 rounded-[2rem] flex flex-row items-center gap-6 border-b border-black/5 hover:bg-zinc-50 transition-all duration-500"
    >
      <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden flex items-center justify-center shrink-0">
        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-bold text-black leading-tight">{exp.role}</h3>
        <p className="text-zinc-500 text-sm font-medium">{exp.company}</p>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-serif italic font-bold text-black opacity-90">{exp.location}</span>
        </div>
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight">{exp.duration}</span>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
