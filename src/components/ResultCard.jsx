import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { openCaseStudy } from '../utils/openCaseStudy';

// One headline number from a case study, linking to it
const ResultCard = ({ item, compact = false }) => (
  <a
    href={`#case-${item.slug}`}
    onClick={(event) => openCaseStudy(event, item.slug)}
    className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 sm:p-6 hover:border-primary transition-colors"
  >
    <span>
      <span className={`display block ${compact ? 'text-[3rem]' : 'text-[clamp(3.25rem,6vw,4.75rem)]'}`}>{item.value}</span>
      <span className="mt-3 block text-[16px] font-semibold leading-snug">{item.label}</span>
      {!compact && item.text && <span className="mt-1 block text-[14px] leading-relaxed text-secondary">{item.text}</span>}
    </span>
    <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-3 text-[13.5px] font-semibold">
      {item.study.title}
      <FiArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </span>
  </a>
);

export default ResultCard;
