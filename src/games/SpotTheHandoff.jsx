import React, { useState } from 'react';
import { FiHeadphones } from 'react-icons/fi';
import { Frame, GameLayout, PrimaryButton, SecondaryButton, Result, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

// Everything that can go wrong between design and production. Five are picked each round.
const POSSIBLE = ['badge', 'image', 'title', 'stars', 'reviews', 'price', 'button'];
const PER_ROUND = 5;

const VERDICTS = [
  { max: 0, text: 'Zero misclicks. QA would like a word with you.' },
  { max: 3, text: 'Sharp eyes. You’d survive a design review.' },
  { max: Infinity, text: 'Found them all, eventually. That’s what staging is for.' },
];

const ROASTS = [
  'Congrats, you’d make a great developer. They also said it matched.',
  'Akhil found all five before the page finished loading.',
  'And this, kids, is how bugs reach production.',
];

const pickDifferences = () => new Set([...POSSIBLE].sort(() => Math.random() - 0.5).slice(0, PER_ROUND));

const ProductCard = ({ shipped, differences, found, revealed }) => {
  const changed = (id) => shipped && differences.has(id);

  // Red ring on spots that were found, dashed ring on spots revealed by giving up
  const mark = (id) => {
    if (!differences.has(id)) return '';
    if (found.has(id)) return 'outline outline-2 outline-offset-2 outline-stamp';
    if (revealed) return 'outline outline-2 outline-dashed outline-offset-2 outline-stamp';
    return '';
  };

  return (
    <div className="rounded-xl border border-line bg-background p-2.5 sm:p-4 text-left text-primary">
      <div
        data-spot="image"
        className={`relative flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br ${
          changed('image') ? 'from-violet-500 to-pink-300' : 'from-violet-500 to-sky-300'
        } ${mark('image')}`}
      >
        <FiHeadphones className="h-1/2 w-1/2 text-white" aria-hidden="true" />
        <span
          data-spot="badge"
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold ${
            changed('badge') ? 'opacity-0' : 'bg-white text-black'
          } ${mark('badge')}`}
        >
          NEW
        </span>
      </div>

      <p data-spot="title" className={`mt-2.5 text-[13px] sm:text-[16px] font-semibold leading-tight ${mark('title')}`}>
        {changed('title') ? 'Wireless Headphnoes' : 'Wireless Headphones'}
      </p>

      <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] sm:text-[13px]">
        <span data-spot="stars" className={`text-amber-500 tracking-tight ${mark('stars')}`}>
          {changed('stars') ? '★★★★☆' : '★★★★★'}
        </span>
        <span data-spot="reviews" className={`text-secondary ${mark('reviews')}`}>
          ({changed('reviews') ? '241' : '214'})
        </span>
      </p>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span data-spot="price" className={`text-[14px] sm:text-[18px] ${changed('price') ? 'font-normal' : 'font-bold'} ${mark('price')}`}>
          $129
        </span>
        <span
          data-spot="button"
          className={`bg-primary text-background px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-semibold ${
            changed('button') ? 'rounded-none' : 'rounded-lg'
          } ${mark('button')}`}
        >
          Add to cart
        </span>
      </div>
    </div>
  );
};

// Spot what changed between the design and what shipped
const SpotTheHandoff = () => {
  const [differences, setDifferences] = useState(pickDifferences);
  const [found, setFound] = useState(() => new Set());
  const [misses, setMisses] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const done = found.size === PER_ROUND || revealed;

  const handleClick = (event) => {
    if (done) return;
    const spot = event.target.closest('[data-spot]')?.dataset.spot;
    if (spot && differences.has(spot)) {
      setFound((previous) => new Set(previous).add(spot));
    } else {
      setMisses((previous) => previous + 1);
    }
  };

  const restart = () => {
    setDifferences(pickDifferences());
    setFound(new Set());
    setMisses(0);
    setRevealed(false);
  };

  return (
    <GameLayout
      label="Spot the handoff"
      meta={`${found.size} of ${PER_ROUND} found${misses ? ` · ${misses} misclicks` : ''}`}
      stage={
        <Frame aspect={false} className="p-3 sm:p-8">
          <div className="mx-auto grid max-w-[620px] grid-cols-2 gap-3 sm:gap-8">
            {[false, true].map((shipped) => (
              <div key={String(shipped)}>
                <p className="mb-2 text-[12px] sm:text-[13px] font-semibold text-secondary">{shipped ? 'What shipped' : 'The design'}</p>
                <div onClick={handleClick} className={done ? '' : 'cursor-pointer'}>
                  <ProductCard shipped={shipped} differences={differences} found={found} revealed={revealed} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      }
      intro={`The developer swears it matches the design. Find the ${PER_ROUND} differences.`}
      hint="Tap a difference on either card."
      actions={
        done ? (
          <PrimaryButton onClick={restart}>Play again</PrimaryButton>
        ) : (
          <SecondaryButton onClick={() => setRevealed(true)}>Show me</SecondaryButton>
        )
      }
      result={
        done &&
        (revealed && found.size < PER_ROUND ? (
          <Result
            score={`${found.size} of ${PER_ROUND}`}
            detail="The ones you missed have a dashed outline."
            verdict="The developer thanks you for your leniency."
          >
            <Troll lines={ROASTS} />
          </Result>
        ) : (
          <Result
            score={`${PER_ROUND} of ${PER_ROUND}`}
            detail={`${misses} ${misses === 1 ? 'misclick' : 'misclicks'}.`}
            verdict={pickVerdict(VERDICTS, misses)}
          >
            {misses > 3 && <Troll lines={ROASTS} />}
          </Result>
        ))
      }
    />
  );
};

export default SpotTheHandoff;
