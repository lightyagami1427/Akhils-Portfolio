import React, { useEffect, useState } from 'react';
import { FiArrowUp, FiCheck, FiCopy, FiArrowUpRight, FiHash } from 'react-icons/fi';
import GlassesNote from '../components/GlassesNote';
import { motion, useReducedMotion } from 'framer-motion';
import { getVisitorCompany } from '../utils/visitor';

import linkedinIcon from '../assets/linkedin.webp';
import dribbbleIcon from '../assets/dribbble.webp';
import xIcon from '../assets/x.png';
import instagramIcon from '../assets/instagram.webp';
import gmailIcon from '../assets/gmail.png';
import telegramIcon from '../assets/telegram.png';
import whatsappIcon from '../assets/whatsapp.png';
import callIcon from '../assets/call.png';

const EMAIL = 'akhilnishtala14@gmail.com';
const RESUME_URL = 'https://drive.google.com/file/d/1SccGI_9RuJTLRuAfWZaFL-CjYijlzDCf/view?usp=sharing';

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/akhil-n-8086a5225/', icon: linkedinIcon },
  { name: 'Dribbble', href: 'https://dribbble.com/akhilnishtala', icon: dribbbleIcon },
  { name: 'X (Twitter)', href: 'https://x.com/Akhilnishtala', icon: xIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/___.___akhil___.___/', icon: instagramIcon },
];

const direct = [
  { name: 'Email', href: `mailto:${EMAIL}`, icon: gmailIcon },
  { name: 'Telegram', href: 'https://t.me/akhilnishtala', icon: telegramIcon },
  { name: 'WhatsApp', href: 'https://wa.me/7337590891', icon: whatsappIcon },
  { name: '+91 7337 590 891', href: 'tel:+917337590891', icon: callIcon, invertInDark: true },
];

const pages = [
  { name: 'Selected work', href: '#work' },
  { name: 'Play the design arcade', href: '#arcade' },
  { name: 'Download CV', href: RESUME_URL },
];

const formatHyderabadTime = () =>
  new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date());

// Small square handle on each corner of the selected frame
const Handle = ({ className }) => <span className={`absolute h-2.5 w-2.5 bg-white border-[1.5px] border-accent ${className}`} aria-hidden="true" />;

// How the hero's story ends: the same three reviewers, one comment each. Edit freely.
const THREAD = [
  { role: 'recruiter', color: 'var(--color-violet)', text: 'Read all five case studies. Shortlisted.', time: '2m' },
  { role: 'design lead', color: 'var(--color-green)', text: 'He beat my score on the kerning game. Booking a portfolio review.', time: '1m' },
  { role: 'hiring manager', color: 'var(--color-orange)', text: 'Copying his email now.', time: 'now' },
];

const Thread = ({ company }) => {
  const reduceMotion = useReducedMotion();
  const label = (role) => (company ? `${company} ${role}` : role.charAt(0).toUpperCase() + role.slice(1));

  return (
    <div className="rounded-2xl border border-line bg-background shadow-[0_18px_50px_rgba(0,0,0,0.08)] overflow-hidden" aria-label="Comments on this frame">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-[14px] font-semibold">Comments · {THREAD.length}</p>
        <span className="text-[12.5px] text-secondary">on contact</span>
      </div>
      <ol className="px-4 py-2">
        {THREAD.map((comment, index) => (
          <motion.li
            key={comment.role}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.25 + index * 0.45 }}
            className="flex gap-3 py-3 border-b border-line last:border-b-0"
          >
            <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ backgroundColor: comment.color }} aria-hidden="true">
              {comment.role.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px]">
                <span className="font-semibold">{label(comment.role)}</span>
                <span className="text-secondary"> · {comment.time}</span>
              </p>
              <p className="mt-0.5 text-[15px] leading-snug">{comment.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <a
        href={`mailto:${EMAIL}`}
        className="m-3 mt-1 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 h-12 text-[14.5px] text-secondary hover:border-primary hover:text-primary transition-colors"
      >
        Reply to Akhil…
        <FiArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
};

// A group of links styled like a layers panel
const Layers = ({ title, items }) => (
  <div>
    <p className="px-3 pb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary">{title}</p>
    <ul>
      {items.map((item) => {
        const external = item.href.startsWith('https');
        return (
          <li key={item.name}>
            <a
              href={item.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15.5px] font-medium hover:bg-accent hover:text-white transition-colors"
            >
              {item.icon ? (
                <img src={item.icon} alt="" className={`h-[18px] w-[18px] shrink-0 object-contain ${item.invertInDark ? 'dark:invert group-hover:invert' : ''}`} />
              ) : (
                <FiHash size={17} className="shrink-0 text-secondary group-hover:text-white" aria-hidden="true" />
              )}
              <span className="flex-1 truncate">{item.name}</span>
              {external && <FiArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

/*
  The footer, drawn as the last frame on the canvas: "Ready for handoff".
  Copying the email is one click, and a reviewer reacts when you get here.
*/
const ContactSection = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState(formatHyderabadTime);
  const [copied, setCopied] = useState(false);
  const [company] = useState(getVisitorCompany);

  useEffect(() => {
    const timer = setInterval(() => setTime(formatHyderabadTime()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Older browsers: copy through a hidden field
      const field = document.createElement('textarea');
      field.value = EMAIL;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
  };

  return (
    <footer
      id="contact"
      data-annotate="footer: the last frame, ready for handoff"
      className="bg-background text-primary border-t border-dashed border-line transition-colors duration-300"
    >
      <div className="shell pt-20 sm:pt-28 pb-24">
        {/* Frame label */}
        <div className="flex items-center justify-between gap-4 mb-2 text-[13px] font-medium text-secondary">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            contact · Ready for handoff
          </span>
          <span className="hidden sm:inline">Last frame</span>
        </div>

        {/* The frame */}
        <div className="relative border-[1.5px] border-accent bg-surface">
          <Handle className="-top-1.5 -left-1.5" />
          <Handle className="-top-1.5 -right-1.5" />
          <Handle className="-bottom-1.5 -left-1.5" />
          <Handle className="-bottom-1.5 -right-1.5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="lg:col-span-7 min-w-0">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-[14px] font-medium">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Available for new projects
            </p>

            <h2 data-spec="Display" className="display mt-6 text-[clamp(3rem,8.5vw,8.25rem)] max-w-[11ch]">
              Say anything except &ldquo;we&rsquo;ll get back to you.&rdquo;
            </h2>

            {/* Email, copyable in one click */}
            <div className="mt-10 sm:mt-12 flex flex-col xl:flex-row xl:items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group h-14 sm:h-16 pl-4 sm:pl-5 pr-2 rounded-xl border border-line bg-background flex flex-1 items-center justify-between gap-4 text-left hover:border-primary transition-colors min-w-0"
                aria-label={`Copy email address ${EMAIL}`}
              >
                <span className="truncate text-[14.5px] sm:text-[19px] font-medium">{EMAIL}</span>
                <span
                  className={`shrink-0 h-10 sm:h-12 px-3 sm:px-4 rounded-lg inline-flex items-center gap-2 text-[14px] font-semibold transition-colors ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-primary text-background'
                  }`}
                >
                  {copied ? <FiCheck size={16} aria-hidden="true" /> : <FiCopy size={15} aria-hidden="true" />}
                  <span className={copied ? '' : 'hidden sm:inline'}>{copied ? 'Copied' : 'Copy'}</span>
                </span>
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="h-14 sm:h-16 px-7 rounded-xl bg-accent text-white text-[16px] font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Write an email <FiArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <GlassesNote className="mt-3">no form. just email me.</GlassesNote>
            <p aria-live="polite" className="mt-3 h-5 text-[14px] text-secondary">
              {copied ? 'Copied. Now you have no excuse.' : `It’s ${time} for Akhil in Hyderabad, India.`}
            </p>

            </div>

            {/* The reviewers from the hero, wrapping up */}
            <div className="lg:col-span-5 lg:pt-14">
              <Thread company={company} />
            </div>
          </div>

          {/* Links, as a layers panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-line px-2 py-6 sm:px-7 sm:py-8">
            <Layers title="Socials" items={socials} />
            <Layers title="Direct" items={direct} />
            <Layers title="This site" items={pages} />
          </div>
        </div>

        {/* Status bar, like the bottom of a design tool */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[13px] text-secondary">
          <p>&copy; {currentYear} Akhil Nishtala</p>
          <p className="hidden md:block">Designed in Figma, built with React · 100% zoom</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 py-2 font-medium text-primary hover:opacity-70 transition-opacity"
          >
            Back to top <FiArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
