import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, motionValue } from 'framer-motion';
import { Frame, GameLayout, PrimaryButton, SecondaryButton, Result, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

const WORDS = ['DESIGN', 'KERNING', 'LAYOUT', 'PIXEL', 'HIRED', 'SPACING'];

const VERDICTS = [
  { max: 1, text: 'Better than most fonts’ default kerning.' },
  { max: 3, text: 'Tidy. A type designer would nod, slowly.' },
  { max: 6, text: 'Readable. Slightly haunted.' },
  { max: Infinity, text: 'Congratulations, you’ve invented keming.' },
];

const ROASTS = [
  'Akhil kerns like this in his sleep. You kern like this awake.',
  'Every type designer alive just felt a disturbance.',
  'This is why designers don’t let anyone else touch the type.',
];

const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;

// Drag the middle letters until the gaps between them look even
const Kerning = () => {
  const frameRef = useRef(null);
  const letterRefs = useRef([]);
  const lastWidth = useRef(0);
  const [wordIndex, setWordIndex] = useState(() => Math.floor(Math.random() * WORDS.length));
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);

  const word = WORDS[wordIndex];
  const letters = useMemo(() => [...word], [word]);
  const xs = useMemo(() => letters.map(() => motionValue(0)), [letters]);

  // Space the letters evenly, then knock the middle ones out of place
  const layout = useCallback(() => {
    const frame = frameRef.current;
    const elements = letterRefs.current.slice(0, letters.length);
    if (!frame || elements.some((element) => !element)) return;

    const widths = elements.map((element) => element.offsetWidth);
    const fontSize = parseFloat(getComputedStyle(elements[0]).fontSize);
    const gap = fontSize * 0.08;
    const total = widths.reduce((sum, width) => sum + width, 0) + gap * (widths.length - 1);
    const jitter = fontSize * 0.22;

    let left = (frame.clientWidth - total) / 2;
    widths.forEach((width, index) => {
      const isLocked = index === 0 || index === widths.length - 1;
      const sign = Math.random() < 0.5 ? -1 : 1;
      const offset = isLocked ? 0 : sign * (0.35 + Math.random() * 0.65) * jitter;
      xs[index].set(Math.round(left + offset));
      left += width + gap;
    });

    lastWidth.current = frame.clientWidth;
    setResult(null);
    setReady(true);
  }, [letters, xs]);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) layout();
    });

    // Only re-deal when the width changes, not when a phone's address bar hides
    const handleResize = () => {
      if (frameRef.current && frameRef.current.clientWidth !== lastWidth.current) layout();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [layout]);

  const check = () => {
    const frameBox = frameRef.current.getBoundingClientRect();
    const boxes = letterRefs.current.slice(0, letters.length).map((element) => element.getBoundingClientRect());
    const gaps = boxes.slice(1).map((box, index) => box.left - boxes[index].right);
    const mean = average(gaps);
    const unevenness = average(gaps.map((gap) => Math.abs(gap - mean)));
    const overlapping = gaps.some((gap) => gap < -2);

    setResult({
      unevenness,
      overlapping,
      markers: gaps.map((gap, index) => ({
        left: boxes[index].right - frameBox.left,
        width: gap,
        top: boxes[index].bottom - frameBox.top + 10,
      })),
      gaps: gaps.map((gap) => Math.round(gap)),
    });
  };

  const nudge = (index, event) => {
    const step = event.shiftKey ? 10 : 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      xs[index].set(xs[index].get() + (event.key === 'ArrowLeft' ? -step : step));
      setResult(null);
    }
  };

  const nextWord = () => {
    setReady(false);
    setWordIndex((previous) => (previous + 1) % WORDS.length);
  };

  return (
    <GameLayout
      label="Kerning"
      meta={`Word ${wordIndex + 1} of ${WORDS.length}`}
      stage={
        <Frame ref={frameRef}>
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.15em] display text-primary text-[clamp(2.75rem,11vw,7rem)]"
            style={{ opacity: ready ? 1 : 0 }}
          >
            {letters.map((letter, index) => {
              const isLocked = index === 0 || index === letters.length - 1;
              return (
                <motion.span
                  key={`${word}-${index}`}
                  ref={(element) => {
                    letterRefs.current[index] = element;
                  }}
                  drag={isLocked ? false : 'x'}
                  dragConstraints={frameRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setResult(null)}
                  onKeyDown={isLocked ? undefined : (event) => nudge(index, event)}
                  tabIndex={isLocked ? -1 : 0}
                  role={isLocked ? undefined : 'button'}
                  aria-label={isLocked ? undefined : `Letter ${letter}, position ${index + 1}. Use left and right arrows to move it.`}
                  style={{ x: xs[index] }}
                  className={`absolute left-0 top-0 leading-[1.15] select-none ${
                    isLocked
                      ? 'opacity-45'
                      : 'cursor-grab active:cursor-grabbing outline-accent hover:outline-[1.5px] hover:outline focus-visible:outline'
                  }`}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {result &&
            result.markers.map((marker, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="absolute flex flex-col items-center"
                style={{ left: Math.min(marker.left, marker.left + marker.width), top: marker.top, width: Math.max(1, Math.abs(marker.width)) }}
              >
                <span className="h-px w-full bg-stamp" />
                <span className="mt-1 rounded bg-stamp px-1 text-[11px] font-semibold text-white tabular-nums">{Math.round(marker.width)}</span>
              </span>
            ))}
        </Frame>
      }
      intro="Drag the middle letters left or right until every gap looks equal. The first and last letters are locked."
      hint="Trust your eye. Type designers spend years on exactly this."
      actions={
        <>
          <PrimaryButton onClick={check}>Check my spacing</PrimaryButton>
          <SecondaryButton onClick={nextWord}>Next word</SecondaryButton>
        </>
      }
      result={
        result && (
          <Result
            score={`${result.unevenness.toFixed(1)}px uneven`}
            detail={`Gaps: ${result.gaps.join(', ')}px.`}
            verdict={result.overlapping ? 'Some letters are overlapping. That’s a ligature now.' : pickVerdict(VERDICTS, result.unevenness)}
          >
            {(result.overlapping || result.unevenness > 3) && <Troll lines={ROASTS} />}
          </Result>
        )
      }
    />
  );
};

export default Kerning;
