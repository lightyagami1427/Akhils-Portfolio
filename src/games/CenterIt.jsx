import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Frame, GameLayout, PrimaryButton, SecondaryButton, Result, ProLink, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

const VERDICTS = [
  { max: 0, text: 'Pixel perfect. Are you sure you’re hiring and not applying?' },
  { max: 2, text: 'Honestly, nobody would notice. I would, though.' },
  { max: 6, text: 'A developer would ship this.' },
  { max: 20, text: 'This is exactly why companies hire designers.' },
  { max: Infinity, text: 'Let’s call it an “asymmetric layout” and move on.' },
];

const ROASTS = [
  'Akhil gets this to 0px. Every time. It’s honestly a bit annoying.',
  'The developer who “eyeballed it” just felt seen.',
  'Bold of you to review portfolios with alignment like this.',
  'Even auto layout is embarrassed for you right now.',
];

const describe = (dx, dy) => {
  const parts = [];
  if (dx !== 0) parts.push(`${Math.abs(dx)}px too far ${dx > 0 ? 'right' : 'left'}`);
  if (dy !== 0) parts.push(`${Math.abs(dy)}px too ${dy > 0 ? 'low' : 'high'}`);
  return parts.length ? parts.join(', ') : 'Dead center';
};

// Drag the button to the middle of the frame by eye, then check the result
const CenterIt = () => {
  const frameRef = useRef(null);
  const buttonRef = useRef(null);
  const x = useMotionValue(16);
  const y = useMotionValue(16);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);

  const getLimits = () => {
    const frame = frameRef.current;
    const button = buttonRef.current;
    if (!frame || !button) return { maxX: 0, maxY: 0 };
    return { maxX: frame.clientWidth - button.offsetWidth, maxY: frame.clientHeight - button.offsetHeight };
  };

  // Drop the button somewhere that is clearly not the middle
  const scatter = () => {
    const { maxX, maxY } = getLimits();
    let nextX = 0;
    let nextY = 0;
    for (let attempt = 0; attempt < 20; attempt += 1) {
      nextX = Math.round(Math.random() * maxX);
      nextY = Math.round(Math.random() * maxY);
      if (Math.hypot(nextX - maxX / 2, nextY - maxY / 2) > Math.min(maxX, maxY) * 0.3) break;
    }
    x.set(nextX);
    y.set(nextY);
  };

  useEffect(() => {
    scatter();
    const handleResize = () => {
      const { maxX, maxY } = getLimits();
      x.set(Math.min(x.get(), maxX));
      y.set(Math.min(y.get(), maxY));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapToPixels = () => {
    const { maxX, maxY } = getLimits();
    x.set(Math.max(0, Math.min(maxX, Math.round(x.get()))));
    y.set(Math.max(0, Math.min(maxY, Math.round(y.get()))));
  };

  const check = () => {
    const { maxX, maxY } = getLimits();
    const dx = Math.round(x.get() - maxX / 2);
    const dy = Math.round(y.get() - maxY / 2);
    const off = Math.round(Math.hypot(dx, dy));
    setResult({ dx, dy, off, verdict: pickVerdict(VERDICTS, off) });
    setBest((previous) => (previous === null ? off : Math.min(previous, off)));
  };

  const reset = () => {
    scatter();
    setResult(null);
  };

  // Arrow keys nudge by 1px, Shift + arrow by 10px, like a design tool
  const handleKeyDown = (event) => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    x.set(x.get() + move[0] * step);
    y.set(y.get() + move[1] * step);
    snapToPixels();
    setResult(null);
  };

  return (
    <GameLayout
      label="Center it"
      meta={best !== null ? `Best: ${best}px` : 'No guides allowed'}
      stage={
        <Frame ref={frameRef}>
          {result && (
            <>
              <span className="absolute left-1/2 top-0 bottom-0 w-px bg-stamp" aria-hidden="true" />
              <span className="absolute top-1/2 left-0 right-0 h-px bg-stamp" aria-hidden="true" />
              <span className="absolute left-1/2 top-2 ml-2 rounded bg-stamp px-1.5 py-0.5 text-[11.5px] font-semibold text-white" aria-hidden="true">
                {result.off}px off
              </span>
            </>
          )}

          <motion.div
            ref={buttonRef}
            drag
            dragConstraints={frameRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setResult(null)}
            onDragEnd={snapToPixels}
            onKeyDown={handleKeyDown}
            whileDrag={{ scale: 1.04 }}
            style={{ x, y, touchAction: 'none' }}
            tabIndex={0}
            role="button"
            aria-label="Draggable button labelled Hire Akhil. Drag it, or use the arrow keys, to move it to the center of the frame."
            className="absolute left-0 top-0 h-12 px-6 rounded-xl bg-primary text-background text-[15px] font-semibold inline-flex items-center whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
          >
            Hire Akhil
          </motion.div>
        </Frame>
      }
      intro="Drag the button to the exact center of the frame. No guides, no snapping, just your eye."
      hint="On a keyboard, arrow keys nudge it by 1px. Hold Shift for 10px."
      actions={
        <>
          <PrimaryButton onClick={check}>Check my alignment</PrimaryButton>
          <SecondaryButton onClick={reset}>Shuffle</SecondaryButton>
        </>
      }
      result={
        result && (
          <Result score={`${result.off}px off`} detail={`${describe(result.dx, result.dy)}.`} verdict={result.verdict}>
            {result.off > 6 ? (
              <Troll lines={ROASTS} />
            ) : (
              <p className="mt-4 text-[14.5px] text-secondary">
                <ProLink />.
              </p>
            )}
          </Result>
        )
      }
    />
  );
};

export default CenterIt;
