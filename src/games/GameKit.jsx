import React, { useState } from 'react';
import { EMAIL } from './gameUtils';

/*
  Shared building blocks for the arcade games, so every game has the same
  layout: the play area on the left, instructions and the score on the right.
*/

// The bordered play area. Pass aspect={false} when the content sets its own height.
export const Frame = ({ ref, children, className = '', aspect = true, ...rest }) => (
  <div
    ref={ref}
    className={`relative overflow-hidden rounded-lg bg-surface border border-line ${aspect ? 'aspect-[4/3] sm:aspect-[16/9]' : ''} ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`h-12 px-6 rounded-xl bg-primary text-background text-[15px] font-semibold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`h-12 px-6 rounded-xl border border-line text-primary text-[15px] font-semibold hover:bg-card transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const GameLayout = ({ label, meta, stage, below, intro, hint, actions, result }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-7">
    <div className="lg:col-span-8 min-w-0">
      <div className="flex items-center justify-between gap-4 mb-2 text-[13px] font-medium text-secondary">
        <span>{label}</span>
        <span aria-live="polite">{meta}</span>
      </div>
      {stage}
      {below}
    </div>

    <div className="lg:col-span-4 lg:pt-7">
      <p className="text-[19px] leading-snug font-medium">{intro}</p>
      {hint && <p className="mt-3 text-[15.5px] leading-relaxed text-secondary">{hint}</p>}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      <div aria-live="polite" className="mt-7 min-h-[9.5rem]">
        {result}
      </div>
    </div>
  </div>
);

export const Result = ({ score, detail, verdict, children }) => (
  <>
    <p className="heading text-[2.5rem]">{score}</p>
    {detail && <p className="mt-1 text-[14.5px] text-secondary">{detail}</p>}
    {verdict && <p className="mt-3 text-[17px] leading-snug font-medium">{verdict}</p>}
    {children}
  </>
);

// Shown when someone does badly: one roast, picked at random, plus the obvious solution
export const Troll = ({ lines }) => {
  const [line] = useState(() => lines[Math.floor(Math.random() * lines.length)]);
  return (
    <div className="mt-5 -rotate-1 origin-left">
      <p className="font-script text-[25px] leading-[1.05] text-stamp">{line}</p>
      <a href={EMAIL} className="mt-2 inline-block text-[14.5px] font-semibold text-primary underline underline-offset-4">
        Hire someone who can &rarr;
      </a>
    </div>
  );
};

export const ProLink = () => (
  <a href={EMAIL} className="text-primary font-medium underline underline-offset-4">
    Or leave it to a professional
  </a>
);
