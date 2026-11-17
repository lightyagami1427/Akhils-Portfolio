import React, { useState } from 'react';
import { Frame, GameLayout, PrimaryButton, SecondaryButton, Result, Troll } from './GameKit';
import { pickVerdict } from './gameUtils';

const VERDICTS = [
  { max: 2.3, text: 'Indistinguishable. Brand guidelines approved.' },
  { max: 6, text: 'Close. Print would forgive you. The brand team won’t.' },
  { max: 15, text: 'Same family. Distant cousin.' },
  { max: 30, text: 'Let’s call it a “creative interpretation”.' },
  { max: Infinity, text: 'That’s a different colour. Possibly a different brand.' },
];

const ROASTS = [
  'Akhil matched this in one slider move. Just saying.',
  'Somewhere, a brand guidelines PDF just closed itself.',
  'That’s not a match. That’s a cry for help.',
];

// Colour maths: HSL -> RGB -> CIELAB, then the distance between the two colours
const hslToRgb = (h, s, l) => {
  const sat = s / 100;
  const light = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
};

const rgbToLab = ([r, g, b]) => {
  const linear = (channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [R, G, B] = [linear(r), linear(g), linear(b)];
  const x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
};

const colourDistance = (a, b) => {
  const labA = rgbToLab(hslToRgb(a.h, a.s, a.l));
  const labB = rgbToLab(hslToRgb(b.h, b.s, b.l));
  return Math.hypot(labA[0] - labB[0], labA[1] - labB[1], labA[2] - labB[2]);
};

const toHex = (colour) =>
  `#${hslToRgb(colour.h, colour.s, colour.l)
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`.toUpperCase();

const css = (colour) => `hsl(${colour.h} ${colour.s}% ${colour.l}%)`;

const randomTarget = () => ({
  h: Math.floor(Math.random() * 360),
  s: Math.round(35 + Math.random() * 55),
  l: Math.round(30 + Math.random() * 45),
});

const randomStart = () => ({ h: Math.floor(Math.random() * 360), s: 50, l: 50 });

const SLIDERS = [
  { key: 'h', label: 'Hue', max: 359, track: 'linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' },
  { key: 's', label: 'Saturation', max: 100 },
  { key: 'l', label: 'Lightness', max: 100 },
];

const Swatch = ({ colour, label, hex }) => (
  <div className="relative flex-1" style={{ backgroundColor: css(colour) }}>
    <span className="absolute left-3 top-3 rounded-md bg-surface px-2 py-1 text-[12px] font-semibold text-primary">
      {label}
      {hex && <span className="ml-1.5 font-medium text-secondary">{hex}</span>}
    </span>
  </div>
);

// Recreate the target colour by eye with three sliders
const ColourMatch = () => {
  const [target, setTarget] = useState(randomTarget);
  const [mine, setMine] = useState(randomStart);
  const [result, setResult] = useState(null);

  const trackFor = (slider) => {
    if (slider.track) return slider.track;
    if (slider.key === 's') return `linear-gradient(90deg, hsl(${mine.h} 0% ${mine.l}%), hsl(${mine.h} 100% ${mine.l}%))`;
    return `linear-gradient(90deg, #000, hsl(${mine.h} ${mine.s}% 50%), #fff)`;
  };

  const update = (key, value) => {
    setMine((previous) => ({ ...previous, [key]: Number(value) }));
    setResult(null);
  };

  const check = () => {
    const distance = colourDistance(target, mine);
    setResult({ distance, verdict: pickVerdict(VERDICTS, distance) });
  };

  const next = () => {
    setTarget(randomTarget());
    setMine(randomStart());
    setResult(null);
  };

  return (
    <GameLayout
      label="Colour match"
      meta="Eyes only"
      stage={
        <Frame className="flex">
          <Swatch colour={target} label="Target" hex={result ? toHex(target) : null} />
          <Swatch colour={mine} label="Yours" hex={result ? toHex(mine) : null} />
        </Frame>
      }
      below={
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          {SLIDERS.map((slider) => (
            <label key={slider.key} className="block">
              <span className="text-[13px] font-medium text-secondary">{slider.label}</span>
              <input
                type="range"
                min={0}
                max={slider.max}
                value={mine[slider.key]}
                onChange={(event) => update(slider.key, event.target.value)}
                className="mt-2 block w-full h-3 rounded-full appearance-none cursor-pointer border border-line [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black"
                style={{ background: trackFor(slider) }}
              />
            </label>
          ))}
        </div>
      }
      intro="Match the target colour using the three sliders. No hex codes, no eyedropper."
      hint="A difference under 2.3 is invisible to most people. Designers will still see it."
      actions={
        <>
          <PrimaryButton onClick={check}>Check my match</PrimaryButton>
          <SecondaryButton onClick={next}>New colour</SecondaryButton>
        </>
      }
      result={
        result && (
          <Result
            score={`${Math.max(0, Math.round(100 - result.distance))}% match`}
            detail={`Difference: ${result.distance.toFixed(1)}.`}
            verdict={result.verdict}
          >
            {result.distance > 6 && <Troll lines={ROASTS} />}
          </Result>
        )
      }
    />
  );
};

export default ColourMatch;
