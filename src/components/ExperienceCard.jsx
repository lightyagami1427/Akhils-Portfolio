import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Slight, different tilt per card so the stamps look hand-pressed
const STAMP_TILT = [-7, 5, -4, 6, -6, 4];

const parseMonth = (value) => {
  const [month, year] = value.trim().split(/\s+/);
  const monthIndex = MONTHS.indexOf((month || '').slice(0, 3).toLowerCase());
  if (monthIndex === -1 || !Number(year)) return null;
  return new Date(Number(year), monthIndex, 1);
};

// "Feb 2025 - Present" -> "1 yr 9 mos" (kept up to date automatically)
const getTenure = (duration) => {
  const [startRaw, endRaw = ''] = duration.split(' - ');
  const start = parseMonth(startRaw);
  if (!start) return null;
  const end = /present/i.test(endRaw) ? new Date() : parseMonth(endRaw);
  if (!end) return null;

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 1) return null;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
};

const ExperienceCard = ({ exp, index }) => {
  const reduceMotion = useReducedMotion();
  const isCurrent = /present/i.test(exp.duration);
  const tenure = isCurrent ? getTenure(exp.duration) : null;
  const tilt = STAMP_TILT[index % STAMP_TILT.length];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
            className={`relative p-5 sm:p-6 rounded-2xl flex flex-row flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-3 sm:gap-6 border w-full transition-colors duration-500 ${
        isCurrent
          ? 'bg-primary text-background border-transparent shadow-[0_30px_70px_rgba(0,0,0,0.25)]'
          : 'bg-surface border-line'
      }`}
    >
      {/* Rubber stamp: slams down when the card scrolls into view */}
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 2.6, rotate: tilt - 14 }}
        whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 520, damping: 20, delay: 0.35 + index * 0.12 }}
        style={{ rotate: tilt }}
        className="absolute -top-3 right-7 px-2 py-[3px] rounded-[5px] border-2 border-stamp bg-background text-stamp text-[10px] leading-none font-black uppercase tracking-[0.2em] select-none pointer-events-none"
      >
        Hired
      </motion.span>

      <div className="w-14 h-14 rounded-[8px] overflow-hidden flex items-center justify-center shrink-0 bg-white shadow-sm border border-primary/5">
        <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-[19px] font-semibold leading-tight ${isCurrent ? 'text-background' : 'text-primary'}`}>{exp.role}</h3>
        <p className={`text-sm font-medium ${isCurrent ? 'text-background/60' : 'text-secondary'}`}>{exp.company}</p>
        {tenure && (
          <p className="font-script text-[21px] leading-none mt-1.5 text-background/80">
            {tenure} &amp; counting
          </p>
        )}
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1 basis-full sm:basis-auto shrink-0">
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="var(--color-stamp)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="var(--color-stamp)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[14px] font-medium ${isCurrent ? 'text-background' : 'text-primary'}`}>{exp.location}</span>
        </div>
        <span className={`flex items-center gap-1.5 text-[13px] font-medium ${isCurrent ? 'text-background/60' : 'text-secondary'}`}>
          {isCurrent && (
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          )}
          {exp.duration}
        </span>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
