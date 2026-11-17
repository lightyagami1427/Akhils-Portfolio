import React, { useEffect, useRef, useState } from 'react';
import { Frame, GameLayout, SecondaryButton, Result, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

// Keyed by how far from 100% the circle scored
const VERDICTS = [
  { max: 3, text: 'Suspiciously perfect. Were you holding Shift?' },
  { max: 10, text: 'Giotto would be mildly concerned.' },
  { max: 20, text: 'A good circle. A great icon background.' },
  { max: 35, text: 'Organic. Very “hand-drawn brand refresh”.' },
  { max: Infinity, text: 'That’s a blob. Blobs are trendy, so technically you win.' },
];

const ROASTS = [
  'Akhil draws these with a trackpad. With his eyes closed. Probably.',
  'Even the pen tool would have given up halfway.',
  'That’s not a circle. That’s a mood.',
];

// Respace the stroke so slow parts of the drawing don't count more than fast ones
const resample = (points, spacing = 4) => {
  const output = [points[0]];
  let carry = 0;
  for (let index = 1; index < points.length; index += 1) {
    const [x1, y1] = points[index - 1];
    const [x2, y2] = points[index];
    const length = Math.hypot(x2 - x1, y2 - y1);
    let distance = spacing - carry;
    while (distance <= length) {
      const t = distance / length;
      output.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
      distance += spacing;
    }
    carry = length - (distance - spacing);
  }
  return output;
};

const score = (rawPoints) => {
  if (rawPoints.length < 10) return { error: 'Draw a little more than that.' };
  const points = resample(rawPoints);
  const cx = points.reduce((sum, [x]) => sum + x, 0) / points.length;
  const cy = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
  const radii = points.map(([x, y]) => Math.hypot(x - cx, y - cy));
  const radius = radii.reduce((sum, r) => sum + r, 0) / radii.length;

  if (radius < 28) return { error: 'Bigger, please. Ambition is part of the brief.' };

  // How far around the centre the stroke travels, in degrees
  let swept = 0;
  for (let index = 1; index < points.length; index += 1) {
    const a = Math.atan2(points[index - 1][1] - cy, points[index - 1][0] - cx);
    const b = Math.atan2(points[index][1] - cy, points[index][0] - cx);
    let delta = b - a;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    swept += delta;
  }
  if (Math.abs(swept) < (Math.PI * 2 * 320) / 360) return { error: 'That’s an arc. Close the loop.' };

  const deviation = radii.reduce((sum, r) => sum + Math.abs(r - radius), 0) / radii.length / radius;
  const percent = Math.max(0, 100 - deviation * 300);
  return { percent, cx, cy, radius };
};

// Draw a circle freehand and get scored on how round it is
const PerfectCircle = () => {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const points = useRef([]);
  const drawing = useRef(false);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getContext = () => canvasRef.current?.getContext('2d');

  const clear = () => {
    const canvas = canvasRef.current;
    const context = getContext();
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Match the canvas to its on-screen size so lines stay sharp
  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = frame.clientWidth * ratio;
      canvas.height = frame.clientHeight * ratio;
      getContext().setTransform(ratio, 0, 0, ratio, 0, 0);
      points.current = [];
      setResult(null);
      setHasDrawn(false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const position = (event) => {
    const box = canvasRef.current.getBoundingClientRect();
    return [event.clientX - box.left, event.clientY - box.top];
  };

  const handleDown = (event) => {
    event.preventDefault();
    canvasRef.current.setPointerCapture(event.pointerId);
    drawing.current = true;
    points.current = [position(event)];
    clear();
    setResult(null);
    setHasDrawn(true);
  };

  const handleMove = (event) => {
    if (!drawing.current) return;
    const context = getContext();
    const previous = points.current[points.current.length - 1];
    const next = position(event);
    points.current.push(next);
    context.strokeStyle = getComputedStyle(canvasRef.current).color;
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(previous[0], previous[1]);
    context.lineTo(next[0], next[1]);
    context.stroke();
  };

  const handleUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const outcome = score(points.current);
    setResult(outcome);
    if (outcome.error) return;

    setBest((previous) => (previous === null ? outcome.percent : Math.max(previous, outcome.percent)));

    // Overlay the perfect circle for comparison
    const context = getContext();
    const red = getComputedStyle(canvasRef.current).getPropertyValue('--color-stamp').trim() || '#e5342a';
    context.save();
    context.strokeStyle = red;
    context.lineWidth = 1.5;
    context.setLineDash([6, 6]);
    context.beginPath();
    context.arc(outcome.cx, outcome.cy, outcome.radius, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = red;
    context.beginPath();
    context.arc(outcome.cx, outcome.cy, 3, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const reset = () => {
    points.current = [];
    clear();
    setResult(null);
    setHasDrawn(false);
  };

  return (
    <GameLayout
      label="Perfect circle"
      meta={best !== null ? `Best: ${best.toFixed(1)}%` : 'Pen tool, minus the tool'}
      stage={
        <Frame ref={frameRef}>
          {!hasDrawn && (
            <p className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-secondary pointer-events-none">
              Draw here
            </p>
          )}
          <canvas
            ref={canvasRef}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
            onPointerCancel={handleUp}
            aria-label="Drawing area. Draw a circle with your mouse or finger."
            className="absolute inset-0 h-full w-full text-primary cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
        </Frame>
      }
      intro="Draw a circle in one stroke. You get scored the moment you let go."
      hint="The dashed red line shows the perfect circle you were going for."
      actions={<SecondaryButton onClick={reset}>Clear</SecondaryButton>}
      result={
        result &&
        (result.error ? (
          <>
            <p className="text-[17px] leading-snug font-medium">{result.error}</p>
            <Troll lines={ROASTS} />
          </>
        ) : (
          <Result score={`${result.percent.toFixed(1)}% round`} verdict={pickVerdict(VERDICTS, 100 - result.percent)}>
            {result.percent < 85 && <Troll lines={ROASTS} />}
          </Result>
        ))
      }
    />
  );
};

export default PerfectCircle;
