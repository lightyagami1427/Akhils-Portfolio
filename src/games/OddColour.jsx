import React, { useState } from 'react';
import { Frame, GameLayout, PrimaryButton, SecondaryButton, Result, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

const VERDICTS = [
  { max: 4, text: 'Respectfully, check your monitor brightness.' },
  { max: 9, text: 'Good eye. You’d survive a brand review.' },
  { max: 14, text: 'You can tell #F5F5F5 from #F6F6F6, can’t you.' },
  { max: Infinity, text: 'Get this person on the design team. Immediately.' },
];

const ROASTS = [
  'Akhil cleared 20 levels. On a phone. In direct sunlight.',
  'Your monitor is fine. It’s you.',
  'This is exactly how “slightly off-brand” gets approved.',
];

// The grid grows and the difference shrinks as the levels go up
const gridSize = (level) => Math.min(2 + Math.floor((level - 1) / 2), 7);
const difference = (level) => Math.max(1.5, 18 - (level - 1) * 1.4);

const makeRound = (level) => {
  const size = gridSize(level);
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.round(55 + Math.random() * 25);
  const lightness = Math.round(42 + Math.random() * 18);
  const shift = difference(level) * (Math.random() < 0.5 ? 1 : -1);
  return {
    size,
    odd: Math.floor(Math.random() * size * size),
    shift,
    base: `hsl(${hue} ${saturation}% ${lightness}%)`,
    oddColor: `hsl(${hue} ${saturation}% ${lightness + shift}%)`,
  };
};

// Find the one square that is a slightly different shade
const OddColour = () => {
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(() => makeRound(1));
  const [over, setOver] = useState(false);
  const [best, setBest] = useState(0);

  const pick = (index) => {
    if (over) return;
    if (index === round.odd) {
      const next = level + 1;
      setLevel(next);
      setRound(makeRound(next));
    } else {
      setOver(true);
      setBest((previous) => Math.max(previous, level - 1));
    }
  };

  const restart = () => {
    setLevel(1);
    setRound(makeRound(1));
    setOver(false);
  };

  const cleared = level - 1;

  return (
    <GameLayout
      label="Odd colour out"
      meta={`Level ${level}${best ? ` · Best: ${best}` : ''}`}
      stage={
        <Frame className="flex items-center justify-center p-3 sm:p-5">
          <div
            className="h-full aspect-square grid gap-1.5 sm:gap-2"
            style={{ gridTemplateColumns: `repeat(${round.size}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: round.size * round.size }, (_, index) => {
              const isOdd = index === round.odd;
              return (
                <button
                  key={`${level}-${index}`}
                  type="button"
                  onClick={() => pick(index)}
                  aria-label={`Square ${index + 1}`}
                  className="rounded-md sm:rounded-lg transition-transform hover:scale-[0.97] active:scale-95"
                  style={{
                    backgroundColor: isOdd ? round.oddColor : round.base,
                    outline: over && isOdd ? '3px solid var(--color-stamp)' : 'none',
                    outlineOffset: 3,
                  }}
                />
              );
            })}
          </div>
        </Frame>
      }
      intro="One square is a slightly different shade. Tap it. It gets harder every level, and one wrong tap ends the run."
      hint="Designers argue about shades like this for hours. You get a few seconds."
      actions={over ? <PrimaryButton onClick={restart}>Play again</PrimaryButton> : <SecondaryButton onClick={restart}>Restart</SecondaryButton>}
      result={
        over ? (
          <Result
            score={`${cleared} ${cleared === 1 ? 'level' : 'levels'}`}
            detail={`The odd one (circled) was ${Math.abs(round.shift).toFixed(1)}% ${round.shift > 0 ? 'lighter' : 'darker'}.`}
            verdict={pickVerdict(VERDICTS, cleared)}
          >
            {cleared <= 6 && <Troll lines={ROASTS} />}
          </Result>
        ) : (
          level > 1 && <p className="text-[15.5px] text-secondary">{cleared} cleared. The shades are getting closer.</p>
        )
      }
    />
  );
};

export default OddColour;
