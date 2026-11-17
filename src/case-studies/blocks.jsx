import React, { useContext, useState } from 'react';
import { DraftContext } from './draftContext';
import { FiArrowUpRight, FiCheck, FiMinus, FiPause } from 'react-icons/fi';

/*
  Building blocks for case study pages. Each block type in a case study's data
  file (stats, personas, options, ...) maps to one component here, so the next
  case study is a new data file, not new code.
*/

// Amber "Confirm" marker on anything reconstructed rather than known. Hidden once draft is off.
export const Pin = ({ className = '' }) => {
  const draft = useContext(DraftContext);
  if (!draft) return null;
  return (
    <span
      title="Reconstructed. Akhil to confirm, edit or cut."
      className={`inline-flex items-center align-middle rounded px-1.5 py-[3px] text-[10.5px] font-bold uppercase tracking-wide leading-none bg-spec text-black whitespace-nowrap ${className}`}
    >
      Confirm
    </span>
  );
};

const TINTS = {
  green: 'var(--color-green)',
  orange: 'var(--color-orange)',
  violet: 'var(--color-violet)',
  red: 'var(--color-stamp)',
  blue: 'var(--color-accent)',
  amber: 'var(--color-spec)',
};

const tint = (color, amount = 12) => `color-mix(in srgb, ${TINTS[color] || color} ${amount}%, var(--color-surface))`;

const Card = ({ children, className = '', style }) => (
  <div className={`rounded-xl border border-line bg-surface ${className}`} style={style}>
    {children}
  </div>
);

const Note = ({ children }) => <p className="mt-3 text-[13px] leading-relaxed text-secondary">{children}</p>;

// A note to the author (what to add or swap). Only shown while the case study is a draft.
const EditorNote = ({ children }) => {
  const draft = useContext(DraftContext);
  return draft && children ? <Note>{children}</Note> : null;
};

const Mono = ({ children, className = '' }) => (
  <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${className}`} style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }}>
    {children}
  </span>
);

/* ---------- Opening ---------- */

export const Trio = ({ trio }) => {
  const draft = useContext(DraftContext);
  const cells = [
    { label: 'The problem', text: trio.problem, color: 'red' },
    { label: 'The call', text: trio.call, color: 'amber' },
    { label: 'The outcome', text: trio.outcome, color: 'green', confirm: trio.outcomeConfirm },
  ].filter((cell) => draft || !(cell.label === 'The outcome' && trio.outcomePlaceholder));
  return (
    <div className={`grid grid-cols-1 ${cells.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} rounded-xl border border-line overflow-hidden`}>
      {cells.map((cell, index) => (
        <div
          key={cell.label}
          className={`p-5 sm:p-6 ${index > 0 ? 'border-t md:border-t-0 md:border-l border-line' : ''}`}
          style={{ backgroundColor: tint(cell.color, 14) }}
        >
          <Mono className="text-secondary">{cell.label}</Mono>
          {cell.confirm && <Pin className="ml-2" />}
          <p className={`mt-3 text-[15.5px] leading-relaxed ${draft && cell.confirm ? 'italic text-secondary' : ''}`}>{cell.text}</p>
        </div>
      ))}
    </div>
  );
};

/* ---------- Generic ---------- */

const Stats = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {items.map((item) => (
      <Card key={item.label} className="p-5">
        <p className="heading text-[2.75rem]">{item.value}</p>
        <p className="mt-2 text-[15.5px] font-semibold">{item.label}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-secondary">{item.text}</p>
      </Card>
    ))}
  </div>
);

const Findings = ({ title, items, confirm }) => (
  <Card className="p-5 sm:p-6">
    <Mono className="text-secondary">{title}</Mono>
    {confirm && <Pin className="ml-2" />}
    <ol className="mt-3">
      {items.map((item, index) => (
        <li key={item.title} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_13rem_1fr] gap-x-3 gap-y-1 py-3.5 border-t border-line first:border-t-0">
          <span className="text-[13px] font-semibold text-secondary tabular-nums pt-0.5">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-[15.5px] font-semibold">
            {item.title} {item.confirm && <Pin className="ml-1" />}
          </span>
          <span className="col-start-2 sm:col-start-3 text-[15px] leading-relaxed text-secondary">{item.text}</span>
        </li>
      ))}
    </ol>
  </Card>
);

const Callout = ({ text }) => (
  <div className="rounded-xl p-6 sm:p-7 border border-line" style={{ backgroundColor: tint('amber', 22) }}>
    <p className="heading text-[1.75rem] sm:text-[2.1rem]">{text}</p>
  </div>
);

const List = ({ items, confirm }) => (
  <div>
    {confirm && <Pin className="mb-3" />}
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[16.5px] leading-relaxed">
          <FiCheck className="mt-1.5 shrink-0 text-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Cards = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {items.map((item) => (
      <Card key={item.title} className="p-5">
        <p className="text-[16px] font-semibold">{item.title}</p>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-secondary">{item.text}</p>
      </Card>
    ))}
  </div>
);

const Next = ({ title, items }) => (
  <div>
    <h3 className="heading text-[1.75rem] mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <Card key={item.title} className="p-5">
          <Mono className="rounded bg-card px-1.5 py-0.5 text-secondary">Next</Mono>
          <p className="mt-3 text-[16px] font-semibold">{item.title}</p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-secondary">{item.text}</p>
        </Card>
      ))}
    </div>
  </div>
);

const Quote = ({ text }) => (
  <blockquote className="rounded-xl p-7 sm:p-9 border border-line" style={{ backgroundColor: tint('amber', 22) }}>
    <p className="heading text-[1.9rem] sm:text-[2.5rem] leading-[1.08]">&ldquo;{text}&rdquo;</p>
  </blockquote>
);

/* ---------- Audiences ---------- */

const Personas = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {items.map((persona) => (
      <Card key={persona.name} className="overflow-hidden">
        <div className="px-5 pt-5 pb-4" style={{ backgroundColor: tint(persona.color, 16) }}>
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: TINTS[persona.color] }} aria-hidden="true" />
            <p className="text-[17px] font-semibold">{persona.name}</p>
          </div>
          <p className="mt-0.5 text-[13.5px] text-secondary">{persona.who}</p>
          <p className="mt-3 font-script text-[25px] leading-none">&ldquo;{persona.quote}&rdquo;</p>
        </div>
        <dl className="px-5 py-4 text-[14.5px] leading-relaxed">
          {[
            ['Asks', persona.asks],
            ['Needs', persona.needs],
            ['Leaves', persona.leaves],
          ].map(([label, value]) => (
            <div key={label} className="py-2 border-t border-line first:border-t-0">
              <dt><Mono className="text-secondary">{label}</Mono></dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    ))}
  </div>
);

const Attention = ({ stops, rows, caption, note }) => {
  const x = (index) => `${((index + 0.5) / stops.length) * 100}%`;
  return (
    <Card className="p-5 sm:p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[620px]">
          {/* Page sections along the scroll */}
          <div className="grid grid-cols-[8.5rem_1fr] items-end">
            <span />
            <div className="relative h-10">
              {stops.map((stop, index) => (
                <span key={stop} className="absolute bottom-0 -translate-x-1/2 text-center text-[12px] font-medium text-secondary w-24 leading-tight" style={{ left: x(index) }}>
                  {stop}
                </span>
              ))}
            </div>
          </div>

          {rows.map((row) => (
            <div key={row.name} className="grid grid-cols-[8.5rem_1fr] items-center py-3 border-t border-line">
              <span className="text-[14.5px] font-semibold">{row.name}</span>
              <div className="relative h-14">
                {/* guide lines */}
                {stops.map((stop, index) => (
                  <span key={stop} className="absolute top-0 bottom-0 w-px bg-line" style={{ left: x(index) }} aria-hidden="true" />
                ))}
                {/* the path they take */}
                <span
                  className="absolute top-[70%] h-1.5 -translate-y-1/2 rounded-full"
                  style={{ left: x(0), width: `calc(${x(row.decides)} - ${x(0)})`, backgroundColor: TINTS[row.color] }}
                  aria-hidden="true"
                />
                {row.needs.map((index) => (
                  <span
                    key={index}
                    className="absolute top-[70%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-surface"
                    style={{ left: x(index), borderColor: TINTS[row.color] }}
                    aria-hidden="true"
                  />
                ))}
                <span
                  className={`absolute top-0 rounded-md px-2 py-1 text-[12px] font-semibold text-white whitespace-nowrap ${
                    row.decides === stops.length - 1 ? '-translate-x-[85%]' : '-translate-x-1/2'
                  }`}
                  style={{ left: x(row.decides), backgroundColor: TINTS[row.color] }}
                >
                  {row.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[15px] font-semibold">{caption}</p>
      <Note>{note}</Note>
    </Card>
  );
};

/* ---------- Before & after ---------- */

const BeforeAfter = ({ before, after, changes, note, beforeLabel = 'Before · the brief', afterLabel = 'After · the page', beforeNote }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-stretch">
      <Card className="p-5">
        <Mono className="text-stamp">{beforeLabel}</Mono>
        <div className="mt-3 flex flex-col gap-3">
          {before.map((group) => (
            <div key={group.heading}>
              <p className="text-[14px] font-semibold">{group.heading}</p>
              <ul className="mt-1 text-[13.5px] leading-relaxed text-secondary list-disc pl-4">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {beforeNote && <p className="mt-4 text-[13.5px] text-secondary">{beforeNote}</p>}
      </Card>

      <div className="hidden md:flex items-center text-secondary" aria-hidden="true">
        <FiArrowUpRight className="rotate-45" size={22} />
      </div>

      <Card className="p-5">
        <Mono className="text-green">{afterLabel}</Mono>
        <div className="mt-3 flex flex-col gap-2">
          {after.map((block, index) => (
            <div
              key={block.label}
              className="rounded-lg border border-line px-3.5 flex flex-col justify-center"
              style={{ minHeight: `${block.weight * 30 + 20}px`, backgroundColor: index === 0 ? tint('blue', 14) : 'var(--color-card)' }}
            >
              <p className="text-[14px] font-semibold">{block.label}</p>
              <p className="text-[13px] text-secondary">{block.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Findings title="What changed, and why" items={changes.map((change) => ({ ...change, title: change.title }))} />
    {changes.some((change) => change.confirm) && (
      <p className="text-[13px] text-secondary">
        <Pin className="mr-2" />
        {changes
          .map((change, index) => (change.confirm ? `Change ${index + 1}` : null))
          .filter(Boolean)
          .join(' and ')}{' '}
        inferred from the screens.
      </p>
    )}
    <EditorNote>{note}</EditorNote>
  </div>
);

/* ---------- Goals ---------- */

const Rules = ({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
    {items.map((rule, index) => (
      <Card key={rule.title} className="p-4">
        <p className="heading text-[2rem] text-accent">{index + 1}</p>
        <p className="mt-2 text-[15px] font-semibold leading-snug">{rule.title}</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-secondary">{rule.text}</p>
      </Card>
    ))}
  </div>
);

/* ---------- Options ---------- */

const PLANCK_BG = '#000814';
const PLANCK_TEAL = '#00e0d4';

const Score = ({ value }) => {
  const labels = ['No', 'Partly', 'Yes'];
  return (
    <span className="inline-flex items-center gap-1.5" title={labels[value]}>
      <span
        className="h-3.5 w-3.5 rounded-full border-2 border-primary"
        style={{ background: value === 2 ? 'var(--color-primary)' : value === 1 ? 'linear-gradient(90deg, var(--color-primary) 50%, transparent 50%)' : 'transparent' }}
        aria-hidden="true"
      />
      <span className="sr-only">{labels[value]}</span>
    </span>
  );
};

const Options = ({ items, criteria, scores, note, brand = { bg: PLANCK_BG, accent: PLANCK_TEAL, text: '#ffffff' } }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((option) => (
        <Card key={option.key} className={`overflow-hidden ${option.chosen ? 'ring-2 ring-accent border-accent' : ''}`}>
          <div className="aspect-[16/9] p-4 flex flex-col justify-end relative overflow-hidden border-b border-line" style={{ backgroundColor: brand.bg }}>
            <span className="absolute right-[-12%] top-[-20%] h-[90%] aspect-square rounded-full opacity-50" style={{ background: `radial-gradient(circle at 40% 40%, ${brand.accent}, transparent 65%)` }} aria-hidden="true" />
            <p className="relative text-[15px] font-semibold leading-tight max-w-[85%]" style={{ color: brand.text }}>{option.headline}</p>
            <div className="relative mt-2 flex gap-1.5">
              <span className="h-4 w-14 rounded-full" style={{ backgroundColor: brand.accent }} />
              {option.twoButtons && <span className="h-4 w-12 rounded-full border opacity-60" style={{ borderColor: brand.text }} />}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[16px] font-semibold">
                {option.key}. {option.name}
              </p>
              {option.chosen && <Mono className="rounded bg-accent px-1.5 py-0.5 text-white">Chosen</Mono>}
            </div>
            <ul className="mt-3 flex flex-col gap-1.5 text-[14px] leading-snug">
              {option.pros.map((pro) => (
                <li key={pro} className="flex gap-2"><FiCheck className="mt-0.5 shrink-0 text-green" aria-hidden="true" />{pro}</li>
              ))}
              {option.cons.map((con) => (
                <li key={con} className="flex gap-2 text-secondary"><FiMinus className="mt-0.5 shrink-0 text-stamp" aria-hidden="true" />{con}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>

    <Card className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-[14px]">
        <thead>
          <tr className="text-left">
            <th className="p-4 font-medium text-secondary">How each option did</th>
            {items.map((option) => (
              <th key={option.key} className={`p-4 font-semibold text-center ${option.chosen ? 'bg-card' : ''}`}>{option.key}. {option.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, row) => (
            <tr key={criterion} className="border-t border-line">
              <td className="p-4">{criterion}</td>
              {items.map((option) => (
                <td key={option.key} className={`p-4 text-center ${option.chosen ? 'bg-card' : ''}`}><Score value={scores[option.key][row]} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 pb-4 text-[12.5px] text-secondary">● Yes &nbsp; ◐ Partly &nbsp; ○ No</p>
    </Card>
    {note && <Note>{note}</Note>}
  </div>
);

/* ---------- Final output ---------- */

const Walkthrough = ({ items, site }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-7">
        <div className="mb-2 flex justify-between text-[13px] font-medium text-secondary">
          <span>{site}</span>
          <span>{active + 1} of {items.length}</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-line bg-black aspect-[16/10]">
          <img src={items[active].image} alt={items[active].title} className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <ol className="lg:col-span-5 flex flex-col gap-1.5">
        {items.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${index === active ? 'border-primary bg-surface' : 'border-transparent hover:bg-card'}`}
            >
              <span className="flex items-baseline gap-3">
                <span className="text-[12.5px] font-semibold text-secondary tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[15.5px] font-semibold">{item.title}</span>
              </span>
              {index === active && <span className="mt-1.5 block pl-8 text-[14px] leading-relaxed text-secondary">{item.text}</span>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

/* ---------- Details: states ---------- */

const STATES = [
  { id: 'default', label: 'Default', text: 'The sphere rotates slowly behind the claim. Both doors are visible above the fold.' },
  { id: 'focus', label: 'Keyboard focus', text: 'A solid 2px teal ring with a gap. Glow alone isn’t enough to show focus.' },
  { id: 'loading', label: 'Opening console', text: 'The button keeps its width and shows progress, so a slow redirect never looks like a dead click.' },
  { id: 'down', label: 'Console down', text: 'A banner explains the maintenance and links to status. The button says what’s true instead of failing silently.' },
  { id: 'slow', label: 'Slow connection', text: 'A still poster frame loads first. The 3D render only replaces it once it’s ready.' },
  { id: 'reduced', label: 'Reduced motion', text: 'The sphere is shown as a still frame. Nothing moves that the visitor didn’t ask to move.' },
];

const MiniHero = ({ state }) => (
  <div className="relative aspect-[16/9] overflow-hidden rounded-lg text-white" style={{ backgroundColor: PLANCK_BG }}>
    {state === 'down' && (
      <div className="absolute inset-x-0 top-0 z-10 px-4 py-2 text-[11.5px] sm:text-[12.5px] font-medium text-black flex items-center gap-2" style={{ backgroundColor: '#ffd166' }}>
        GPU Console is under scheduled maintenance until 14:00 UTC. <span className="underline">Status ↗</span>
      </div>
    )}

    {/* Sphere, poster, or still */}
    <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 h-[95%] aspect-square">
      {state === 'slow' ? (
        <div className="h-full w-full rounded-full border border-dashed border-white/30 flex items-center justify-center" style={{ background: 'radial-gradient(circle at 45% 45%, #0e3b3c, #04141a 70%)' }}>
          <span className="rounded bg-white/10 px-2 py-1 text-[11px] font-medium" style={{ fontFamily: 'ui-monospace, monospace' }}>poster.webp · 38 KB</span>
        </div>
      ) : (
        <div
          className={`h-full w-full rounded-full ${state === 'reduced' ? '' : 'motion-safe:animate-[spin_14s_linear_infinite]'}`}
          style={{ background: `radial-gradient(circle at 40% 38%, #e8fffd 0, ${PLANCK_TEAL} 14%, #0b4b4c 36%, #021015 62%), conic-gradient(from 0deg, transparent, rgba(0,224,212,0.25), transparent)` }}
        >
          {state === 'reduced' && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center"><FiPause size={14} /></span>
          )}
        </div>
      )}
    </div>

    <div className="relative z-[1] h-full flex flex-col justify-center pl-[6%] pr-[40%]">
      <p className="text-[clamp(0.95rem,2.6vw,1.6rem)] font-semibold leading-[1.1]">The World’s First Layer-0 for AI and DePIN</p>
      <p className="mt-2 text-[clamp(0.6rem,1.3vw,0.8rem)] text-[#d0d0d0]">Launch sovereign AI chains. Rent GPUs. Train models.</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[clamp(0.6rem,1.2vw,0.75rem)] font-semibold">
        <span className="rounded-full border border-[#5c6470] px-3 py-1.5">Get $PLANCK ↗</span>
        <span
          className="rounded-full px-3 py-1.5 text-[#000814] inline-flex items-center gap-1.5"
          style={{
            backgroundColor: state === 'down' ? '#3a4a4c' : PLANCK_TEAL,
            color: state === 'down' ? '#c8d0d0' : '#000814',
            boxShadow: state === 'focus' ? `0 0 0 2px ${PLANCK_BG}, 0 0 0 4px ${PLANCK_TEAL}` : 'none',
          }}
        >
          {state === 'loading' && <span className="h-3 w-3 rounded-full border-2 border-[#000814] border-t-transparent motion-safe:animate-spin" aria-hidden="true" />}
          {state === 'loading' ? 'Opening console…' : state === 'down' ? 'Console offline' : 'Launch GPU Console'}
        </span>
      </div>
    </div>
  </div>
);

const States = () => {
  const [active, setActive] = useState(0);
  const state = STATES[active];
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="heading text-[1.6rem]">One hero, six states</h3>
      <div role="tablist" aria-label="Hero states" className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar">
        {STATES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`shrink-0 h-9 px-3 rounded-lg text-[13.5px] font-semibold whitespace-nowrap transition-colors ${index === active ? 'bg-primary text-background' : 'border border-line hover:bg-card'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <MiniHero state={state.id} />
      </div>
      <p className="mt-3 text-[15px] leading-relaxed" aria-live="polite">{state.text}</p>
    </Card>
  );
};

/* ---------- Details: responsive ---------- */

const BREAKPOINTS = [
  { width: 1440, w: 220, label: 'Desktop', text: 'Sphere right, claim left. Cards three across.', layout: 'split' },
  { width: 1024, w: 164, label: 'Laptop', text: 'Sphere shrinks and tucks behind the edge. Cards stay three across.', layout: 'split' },
  { width: 768, w: 118, label: 'Tablet', text: 'Sphere moves behind the text with a scrim. Cards go two plus one.', layout: 'stack' },
  { width: 390, w: 70, label: 'Phone', text: 'Menu collapses, Launch GPU Console stays. Cards stack.', layout: 'phone' },
];

const Wire = ({ layout, w, brand = { bg: PLANCK_BG, accent: PLANCK_TEAL, text: '#ffffff' } }) => {
  const h = layout === 'phone' ? w * 2 : w * 0.62;
  return (
    <div className="relative overflow-hidden rounded-md border border-line" style={{ width: w, height: h, backgroundColor: brand.bg }}>
      <div className="absolute inset-x-0 top-0 h-2.5 border-b border-black/10 flex items-center justify-end gap-0.5 px-1">
        <span className="h-1 w-3 rounded-full" style={{ backgroundColor: brand.accent }} />
      </div>
      <span
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${brand.accent}, transparent 65%)`,
          opacity: layout === 'split' ? 0.85 : 0.35,
          width: layout === 'split' ? '48%' : '90%',
          aspectRatio: '1',
          right: layout === 'split' ? '-6%' : '-20%',
          top: layout === 'phone' ? '6%' : '14%',
        }}
      />
      <div className="absolute left-[8%] right-[30%] flex flex-col gap-1" style={{ top: layout === 'phone' ? '22%' : '30%' }}>
        <span className="h-1.5 rounded-full" style={{ backgroundColor: brand.text }} />
        <span className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: brand.text }} />
        <span className="mt-1 h-1 w-2/3 rounded-full opacity-40" style={{ backgroundColor: brand.text }} />
        <span className="mt-1 h-1.5 w-1/3 rounded-full" style={{ backgroundColor: brand.accent }} />
      </div>
    </div>
  );
};

const Responsive = ({ items = BREAKPOINTS, title = 'Four widths, one hierarchy', brand }) => (
  <Card className="p-4 sm:p-6">
    <h3 className="heading text-[1.6rem]">{title}</h3>
    <div className="mt-5 flex items-end gap-5 overflow-x-auto no-scrollbar pb-1">
      {items.map((bp) => (
        <div key={bp.width} className="shrink-0">
          <Wire layout={bp.layout} w={bp.w} brand={brand} />
          <p className="mt-2 text-[13px] font-semibold">{bp.width}px</p>
          <p className="text-[12.5px] text-secondary">{bp.label}</p>
        </div>
      ))}
    </div>
    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] leading-relaxed">
      {items.map((bp) => (
        <li key={bp.width}><span className="font-semibold">{bp.width}px.</span> <span className="text-secondary">{bp.text}</span></li>
      ))}
    </ul>
  </Card>
);

/* ---------- Accessibility ---------- */

const Contrast = ({ items, note, finding }) => {
  const max = 21;
  const at = (ratio) => `${(ratio / max) * 100}%`;
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="heading text-[1.6rem]">Contrast against the page</h3>
        <span className="text-[12.5px] text-secondary">Ratio out of 21</span>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {items.map((item) => {
          const threshold = item.kind === 'boundary' ? 3 : 4.5;
          const passes = item.ratio >= threshold;
          return (
            <div key={item.label} className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.25rem_11rem_1fr] items-center gap-x-3 gap-y-1">
              <span className="h-9 w-9 rounded-md flex items-center justify-center text-[13px] font-bold border border-line" style={{ backgroundColor: item.bg, color: item.fg }} aria-hidden="true">
                {item.kind === 'boundary' ? '▢' : 'Aa'}
              </span>
              <span className="text-[14px] font-medium leading-tight">
                {item.label}
                <span className="block text-[12px] font-normal text-secondary">{item.fg} on {item.bg}</span>
              </span>
              <div className="col-span-2 sm:col-span-1 relative h-7 rounded bg-card">
                <span className="absolute inset-y-0 left-0 rounded" style={{ width: at(item.ratio), backgroundColor: passes ? 'var(--color-green)' : 'var(--color-stamp)' }} />
                <span className="absolute inset-y-0 w-px bg-primary/40" style={{ left: at(threshold) }} aria-hidden="true" />
                <span className="absolute inset-y-0 flex items-center px-2 text-[12.5px] font-semibold tabular-nums" style={{ left: `min(${at(Math.max(item.ratio, 1.5))}, calc(100% - 6.5rem))` }}>
                  {item.ratio.toFixed(2)}:1 {passes ? '' : '· fails'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[12.5px] text-secondary">Thin line = the WCAG AA minimum: 4.5:1 for text, 3:1 for the edges of controls.</p>
      {finding && (
        <div className="mt-5 rounded-lg p-4 text-[14.5px] leading-relaxed" style={{ backgroundColor: tint('red', 12) }}>
          <span className="font-semibold">Finding. </span>{finding}
        </div>
      )}
      <Note>{note}</Note>
    </Card>
  );
};

/* ---------- System ---------- */

const Tokens = ({ items }) => (
  <Card className="p-5 sm:p-6">
    <h3 className="heading text-[1.6rem]">Colour tokens</h3>
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((token) => (
        <div key={token.name}>
          <div className="h-14 rounded-lg border border-line" style={{ backgroundColor: token.hex }} />
          <p className="mt-2 text-[13.5px] font-semibold">{token.name}</p>
          <p className="text-[12.5px] text-secondary">{token.hex} · {token.role}</p>
        </div>
      ))}
    </div>
    <Note>Sampled from the shipped screens.</Note>
  </Card>
);

const Components = ({ items, note, finding }) => {
  const max = Math.max(...items.map((item) => item.count));
  return (
    <Card className="p-5 sm:p-6">
      <h3 className="heading text-[1.6rem]">Components and how often they repeat</h3>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.name} className="grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr] items-center gap-x-4 gap-y-1">
            <span className="text-[14px] font-semibold leading-tight">
              {item.name}
              <span className="block text-[12.5px] font-normal text-secondary">{item.detail}</span>
            </span>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <span className="h-5 rounded" style={{ width: `${(item.count / max) * 100}%`, backgroundColor: 'var(--color-accent)' }} />
              <span className="text-[13px] font-semibold tabular-nums">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
      {finding && (
        <div className="mt-5 rounded-lg p-4 text-[14.5px] leading-relaxed" style={{ backgroundColor: tint('amber', 18) }}>
          <span className="font-semibold">Noticed. </span>{finding}
        </div>
      )}
      <Note>{note}</Note>
    </Card>
  );
};

/* ---------- Timeline & impact ---------- */

const Timeline = ({ weeks, items, note }) => {
  const draft = useContext(DraftContext);
  return (
  <Card className="p-5 sm:p-6 overflow-x-auto">
    <div className="min-w-[560px]">
      <div className="grid grid-cols-[11rem_1fr] text-[12px] text-secondary">
        <span />
        <div className="relative h-5">
          {Array.from({ length: weeks + 1 }, (_, week) => (
            <span key={week} className="absolute -translate-x-1/2" style={{ left: `${(week / weeks) * 100}%` }}>
              {week % 2 === 0 ? `W${week}` : ''}
            </span>
          ))}
        </div>
      </div>
      {items.map((item, index) => (
        <div key={item.name} className="grid grid-cols-[11rem_1fr] items-center py-2.5 border-t border-line">
          <span className="text-[14px] font-medium">{item.name}</span>
          <div className="relative h-6">
            <span
              className="absolute inset-y-0 rounded-md"
              style={{
                left: `${(item.start / weeks) * 100}%`,
                width: `${((item.end - item.start) / weeks) * 100}%`,
                backgroundColor: ['var(--color-violet)', 'var(--color-accent)', 'var(--color-green)', 'var(--color-orange)', 'var(--color-stamp)'][index % 5],
              }}
            />
          </div>
        </div>
      ))}
    </div>
    <Note>{draft ? note : 'Approximate weeks.'}</Note>
  </Card>
  );
};

const Impact = ({ items: allItems, note, noteConfirm = true }) => {
  const draft = useContext(DraftContext);
  const items = draft ? allItems : allItems.filter((item) => item.value);
  return (
  <div>
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${items.length >= 3 ? 'lg:grid-cols-3' : ''} gap-3`}>
      {items.map((item, index) =>
        item.value ? (
          <div key={item.label} className="rounded-xl border border-line p-5" style={{ backgroundColor: tint(['green', 'blue', 'amber', 'violet'][index % 4], 16) }}>
            <p className="heading text-[2.75rem]">{item.value}</p>
            <p className="mt-2 text-[15.5px] font-semibold">
              {item.label} {item.confirm && <Pin className="ml-1" />}
            </p>
            {item.text && <p className="mt-1 text-[13.5px] leading-relaxed text-secondary">{item.text}</p>}
          </div>
        ) : (
          <div key={item.label} className="rounded-xl border-2 border-dashed border-line p-5">
            <p className="heading text-[2.75rem] text-secondary">—</p>
            <p className="mt-2 text-[15.5px] font-semibold">{item.label}</p>
            <p className="mt-1 text-[13.5px] text-secondary">{item.hint}</p>
          </div>
        )
      )}
    </div>
    {draft && note && (
      <p className="mt-3 text-[14px] leading-relaxed">
        {noteConfirm && <Pin className="mr-2" />}
        {note}
      </p>
    )}
  </div>
  );
};

/* ---------- Details: states of a flow, drawn from data ---------- */

const TONES = { info: '#2f6bff', error: '#d93a2b', success: '#1d9a52', warning: '#d98a00' };

const MockScreen = ({ screen, brand }) => (
  <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-line overflow-hidden shadow-sm" style={{ backgroundColor: brand.surface, color: brand.text }}>
    {screen.banner && (
      <div className="px-4 py-2.5 text-[13px] font-medium text-white" style={{ backgroundColor: TONES[screen.banner.tone] }}>
        {screen.banner.text}
      </div>
    )}
    <div className="p-5">
      {screen.eyebrow && <p className="text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: brand.accent }}>{screen.eyebrow}</p>}
      <p className="mt-1 text-[18px] font-semibold leading-snug">{screen.title}</p>
      {screen.body && <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: brand.muted }}>{screen.body}</p>}

      {screen.field && (
        <div className="mt-4">
          <p className="text-[12.5px] font-medium mb-1.5">{screen.field.label}</p>
          <div
            className="h-11 rounded-lg border px-3 flex items-center text-[14px]"
            style={{
              borderColor: screen.field.error ? TONES.error : brand.line,
              borderWidth: screen.field.error ? 2 : 1,
              color: screen.field.value ? brand.text : brand.muted,
            }}
          >
            {screen.field.value || screen.field.placeholder}
          </div>
          {screen.field.error && <p className="mt-1.5 text-[12.5px] font-medium" style={{ color: TONES.error }}>{screen.field.error}</p>}
        </div>
      )}

      {typeof screen.progress === 'number' && (
        <div className="mt-4">
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: brand.line }}>
            <div className="h-full rounded-full" style={{ width: `${screen.progress}%`, backgroundColor: brand.accent }} />
          </div>
          {screen.progressLabel && <p className="mt-1.5 text-[12.5px]" style={{ color: brand.muted }}>{screen.progressLabel}</p>}
        </div>
      )}

      {screen.list && (
        <ul className="mt-4 flex flex-col gap-2">
          {screen.list.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-[13.5px]" style={{ borderColor: brand.line }}>
              <span className={item.muted ? 'line-through opacity-50' : ''}>{item.label}</span>
              {item.tag && (
                <span className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-white" style={{ backgroundColor: TONES[item.tone] || brand.accent }}>
                  {item.tag}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {screen.button && (
        <div
          className="mt-5 h-11 rounded-lg flex items-center justify-center gap-2 text-[14px] font-semibold"
          style={{
            backgroundColor: screen.button.disabled ? brand.line : brand.accent,
            color: screen.button.disabled ? brand.muted : brand.onAccent,
          }}
        >
          {screen.button.loading && (
            <span className="h-3.5 w-3.5 rounded-full border-2 border-t-transparent motion-safe:animate-spin" style={{ borderColor: brand.onAccent, borderTopColor: 'transparent' }} aria-hidden="true" />
          )}
          {screen.button.label}
        </div>
      )}
      {screen.secondary && <p className="mt-3 text-center text-[13px] font-medium underline underline-offset-4" style={{ color: brand.muted }}>{screen.secondary}</p>}
    </div>
  </div>
);

const FlowStates = ({ title, items, brand }) => {
  const [active, setActive] = useState(0);
  const state = items[active];
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="heading text-[1.6rem]">{title}</h3>
      <div role="tablist" aria-label={title} className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar">
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`shrink-0 h-9 px-3 rounded-lg text-[13.5px] font-semibold whitespace-nowrap transition-colors ${index === active ? 'bg-primary text-background' : 'border border-line hover:bg-card'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl p-5 sm:p-8" style={{ backgroundColor: brand.canvas }}>
        <MockScreen screen={state.screen} brand={brand} />
      </div>
      <p className="mt-3 text-[15px] leading-relaxed" aria-live="polite">{state.text}</p>
    </Card>
  );
};

const BLOCKS = {
  stats: Stats,
  findings: Findings,
  callout: Callout,
  list: List,
  cards: Cards,
  next: Next,
  quote: Quote,
  personas: Personas,
  attention: Attention,
  beforeAfter: BeforeAfter,
  rules: Rules,
  options: Options,
  walkthrough: Walkthrough,
  states: States,
  responsive: Responsive,
  contrast: Contrast,
  tokens: Tokens,
  components: Components,
  timeline: Timeline,
  impact: Impact,
  flowStates: FlowStates,
};

export const Block = ({ block }) => {
  const Component = BLOCKS[block.type];
  return Component ? <Component {...block} /> : null;
};
