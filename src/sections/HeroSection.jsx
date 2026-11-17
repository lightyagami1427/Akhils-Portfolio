import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiSun, FiMoon, FiArrowDown, FiClock } from 'react-icons/fi';
import { getVisitorCompany } from '../utils/visitor';
import ReviewCursor from '../components/ReviewCursor';
import GlassesNote from '../components/GlassesNote';
import GlassesIcon from '../components/GlassesIcon';
import portrait from '../assets/avatar_headphones.webp';

const RESUME_URL = 'https://drive.google.com/file/d/1SccGI_9RuJTLRuAfWZaFL-CjYijlzDCf/view?usp=sharing';
const LINKEDIN_URL = 'https://www.linkedin.com/in/akhil-n-8086a5225/';
const EMAIL = 'mailto:akhilnishtala14@gmail.com';

const ROLES = ['Product Designer', 'Creative Designer', 'UI UX Designer'];

// The hiring conversation that plays out over the hero. Edit freely.
const REVIEWERS = [
  {
    name: 'Recruiter',
    comment: 'Okay, the work is actually good.',
    color: 'var(--color-violet)',
    from: { x: -220, y: 60 },
    delay: 0.5,
    position: 'left-[47%] top-[20%]',
  },
  {
    name: 'Design lead',
    comment: 'Love the confidence.',
    color: 'var(--color-green)',
    from: { x: 200, y: -90 },
    delay: 1.7,
    position: 'right-[3%] top-[13%]',
  },
  {
    name: 'Founder',
    comment: 'I think we should give him a chance.',
    color: 'var(--color-orange)',
    from: { x: -120, y: 160 },
    delay: 2.9,
    position: 'left-[43%] top-[64%]',
  },
];

// Small square handle on each corner of the selection box
const Handle = ({ className }) => (
  <span className={`absolute h-2.5 w-2.5 bg-white border-[1.5px] border-accent ${className}`} />
);

const HeroSection = ({ theme, toggleTheme, glasses, toggleGlasses, toggleHurry }) => {
  const reduceMotion = useReducedMotion();
  const [company] = useState(getVisitorCompany);

  // With a tailored link, the reviewers become that company's team
  const reviewers = company
    ? REVIEWERS.map((reviewer, index) => ({ ...reviewer, name: `${company} ${['recruiter', 'design lead', 'hiring manager'][index]}` }))
    : REVIEWERS;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(roleInterval);
  }, []);

  const lastReviewer = reviewers[reviewers.length - 1];

  return (
    <section
      data-annotate="hero: 3 reviewer cursors, springs at 0.5s / 1.7s / 2.9s"
      className="relative flex min-h-svh flex-col overflow-hidden bg-background transition-colors duration-300"
    >
      {/* Top bar */}
      <header className="shell flex items-center justify-between gap-4 pt-5 sm:pt-7 relative z-30">
        <a href="#top" className="font-display text-[19px] font-bold tracking-tight text-primary whitespace-nowrap" style={{ fontStretch: '85%' }}>
          Akhil Nishtala
        </a>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:flex items-center gap-1 mr-2 text-[14px] font-medium text-secondary">
            <a href="#work" className="px-3 py-2 rounded-lg hover:text-primary hover:bg-card transition-colors">Work</a>
            <a href="#arcade" className="px-3 py-2 rounded-lg hover:text-primary hover:bg-card transition-colors">Play</a>
            <a href="#experience" className="px-3 py-2 rounded-lg hover:text-primary hover:bg-card transition-colors">Experience</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg hover:text-primary hover:bg-card transition-colors">LinkedIn</a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg hover:text-primary hover:bg-card transition-colors">CV</a>
          </div>
          <button
            onClick={toggleHurry}
            className="h-10 px-2.5 md:px-3 rounded-lg inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:bg-card transition-colors"
            aria-label="In a hurry? Show the 60-second version"
          >
            <FiClock size={16} aria-hidden="true" />
            <span className="hidden lg:inline">In a hurry?</span>
          </button>
          <button
            onClick={toggleGlasses}
            aria-pressed={glasses}
            className={`h-10 px-2.5 md:px-3 rounded-lg inline-flex items-center gap-2 text-[14px] font-medium transition-colors ${
              glasses ? 'bg-spec text-black' : 'text-primary hover:bg-card'
            }`}
            aria-label={glasses ? 'Take off glasses: hide design specs' : 'Wear glasses: show design specs'}
          >
            <GlassesIcon />
            <span className="hidden md:inline">{glasses ? 'Take off glasses' : 'Wear glasses'}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-lg flex items-center justify-center text-primary hover:bg-card transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <a
            href={EMAIL}
            className="hidden sm:flex h-10 px-5 rounded-lg bg-primary text-background text-[14px] font-semibold items-center whitespace-nowrap hover:opacity-85 transition-opacity"
          >
            Get in touch
          </a>
        </nav>
      </header>

      {/* Main */}
      <div id="top" className="shell relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-end lg:items-center gap-x-8 gap-y-8 pt-10 pb-10 lg:pt-6 lg:pb-14">
        <div className="lg:col-span-7 xl:col-span-7">
          {company && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[13.5px] font-semibold text-white">
              Hi {company} team, this one’s for you.
            </p>
          )}
          <p className="mb-4 text-[14px] sm:text-[15px] font-semibold text-secondary">
            Product designer for AI, Web3 and 0→1 products
          </p>
          <h1 data-spec="Display" className="display text-primary text-[clamp(4rem,21vw,8.5rem)] lg:text-[clamp(7rem,12.2vw,12.5rem)]">
            Seriously
            <br />
            a good
            <br />
            designer.
          </h1>

          <p className="mt-7 lg:mt-9 max-w-[30rem] text-[17px] sm:text-[19px] leading-[1.45] text-secondary">
            <span className="text-primary font-medium">Akhil Nishtala</span> takes products from research to handoff, and has the numbers to show for it.
            Based in India, working globally. Designing at{' '}
            <span className="inline-flex items-baseline gap-1.5 text-primary font-medium whitespace-nowrap">
              <span className="relative flex h-2 w-2 self-center" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Flyingduck
            </span>{' '}
            and open to freelance.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="h-12 px-6 rounded-xl bg-primary text-background text-[15px] font-semibold inline-flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              See the work <FiArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-xl border border-line text-primary text-[15px] font-semibold inline-flex items-center hover:bg-card transition-colors"
            >
              Download CV
            </a>
            <GlassesNote className="ml-1">the CV is one page. promise.</GlassesNote>
          </div>
        </div>

        {/* Portrait, shown as the selected layer */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[540px]">
            <div className="relative border-[1.5px] border-accent">
              <Handle className="-top-1.5 -left-1.5" />
              <Handle className="-top-1.5 -right-1.5" />
              <Handle className="-bottom-1.5 -left-1.5" />
              <Handle className="-bottom-1.5 -right-1.5" />
              <img
                src={portrait}
                alt="3D portrait of Akhil, grinning, in a white hoodie"
                className="block w-full aspect-square object-cover object-top"
              />
            </div>

            {/* Role tag, where a design tool would show the layer size */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-9 h-7 overflow-hidden rounded-md bg-accent px-3 min-w-[150px] flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={roleIndex}
                  initial={reduceMotion ? false : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-[12.5px] font-semibold text-white whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Small screens: just the closing comment, pinned to the portrait */}
            <ReviewCursor
              name={lastReviewer.name}
              comment={lastReviewer.comment}
              color={lastReviewer.color}
              from={{ x: -60, y: 60 }}
              delay={0.6}
              className="lg:hidden absolute -left-1 top-[54%]"
            />
          </div>
        </div>

        {/* Large screens: reviewers arrive one by one */}
        {reviewers.map((reviewer) => (
          <ReviewCursor
            key={reviewer.name}
            name={reviewer.name}
            comment={reviewer.comment}
            color={reviewer.color}
            from={reviewer.from}
            delay={reviewer.delay}
            className={`hidden lg:block absolute ${reviewer.position}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
