import React from 'react';

/*
  A small 2D version of Akhil's 3D avatar: short curly hair, thick grey brows,
  sleepy eyes, big grin, white hoodie. Draws one of several expressions.

  expression: 'impressed' | 'smug' | 'teary' | 'wink' | 'eager' | 'starstruck'
*/

const SKIN = '#b0643f';
const SKIN_SHADE = '#94502f';
const INK = '#2b1810';
const HAIR = '#1c1c1c';
const BROW = '#707070';

const LEFT = 46;
const RIGHT = 74;
const EYE_Y = 55;

// Curls along the top of the head
const CURLS = Array.from({ length: 13 }, (_, index) => {
  const angle = Math.PI + (index / 12) * Math.PI;
  return { x: 60 + 34 * Math.cos(angle), y: 42 + 28 * Math.sin(angle) };
});

const Brow = ({ x, lift = 0, tilt = 0 }) => (
  <rect
    x={x - 10}
    y={42.5 - lift}
    width="20"
    height="6.5"
    rx="3.2"
    fill={BROW}
    transform={`rotate(${tilt} ${x} ${45.75 - lift})`}
  />
);

const OpenEye = ({ x, look = [0, 0], sleepy = false }) => (
  <g>
    <ellipse cx={x} cy={EYE_Y} rx="8.5" ry="6.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
    <circle cx={x + look[0]} cy={EYE_Y + look[1]} r="3.4" fill={HAIR} />
    {sleepy && (
      <>
        <path d={`M${x - 9.8} 54 Q${x} 50 ${x + 9.8} 54 L${x + 9.8} 47 L${x - 9.8} 47 Z`} fill={SKIN} />
        <path d={`M${x - 9} 54 Q${x} 50 ${x + 9} 54`} stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </>
    )}
  </g>
);

const ClosedEye = ({ x }) => (
  <path d={`M${x - 8} 57 Q${x} 49 ${x + 8} 57`} stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
);

const starPoints = (cx, cy, outer, inner) =>
  Array.from({ length: 10 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (index * Math.PI) / 5;
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

const StarEye = ({ x }) => <polygon points={starPoints(x, EYE_Y, 9, 4)} fill="#ffcc33" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />;

const Grin = () => (
  <g>
    <path d="M35 71 Q60 99 85 71 Q60 77 35 71 Z" fill="#fff" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M39 75 Q60 84 81 75" stroke="#d6d6d6" strokeWidth="1.2" fill="none" />
  </g>
);

const Smile = () => <path d="M45 75 Q60 87 75 75" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />;

const WobblySmile = () => (
  <path d="M45 78 Q50 74 55 78 Q60 82 65 78 Q70 74 75 78" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
);

const OpenGrin = () => (
  <g>
    <path d="M36 71 Q60 101 84 71 Z" fill="#5a1f14" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    <ellipse cx="60" cy="89" rx="9" ry="4.5" fill="#e66a7a" />
    <path d="M38.5 71.5 L81.5 71.5 L79 76.5 L41 76.5 Z" fill="#fff" />
  </g>
);

const Sparkle = ({ x, y, size = 5 }) => (
  <path
    d={`M${x} ${y - size} Q${x} ${y} ${x + size} ${y} Q${x} ${y} ${x} ${y + size} Q${x} ${y} ${x - size} ${y} Q${x} ${y} ${x} ${y - size} Z`}
    fill="#ffcc33"
  />
);

const FACES = {
  // Raised brow, eyes wide open: "oh, you're still here?"
  impressed: () => (
    <>
      <Brow x={LEFT} lift={5} tilt={-6} />
      <Brow x={RIGHT} />
      <OpenEye x={LEFT} />
      <OpenEye x={RIGHT} />
      <Smile />
    </>
  ),
  // His default look from the 3D avatar
  smug: () => (
    <>
      <Brow x={LEFT} />
      <Brow x={RIGHT} />
      <OpenEye x={LEFT} sleepy />
      <OpenEye x={RIGHT} sleepy />
      <Grin />
    </>
  ),
  // Happy tears
  teary: () => (
    <>
      <Brow x={LEFT} lift={2} tilt={-14} />
      <Brow x={RIGHT} lift={2} tilt={14} />
      <ClosedEye x={LEFT} />
      <ClosedEye x={RIGHT} />
      <path d="M33 61 q-3.5 6 0 9 q3.5 -3 0 -9 Z" fill="#6ec1ff" />
      <path d="M87 61 q-3.5 6 0 9 q3.5 -3 0 -9 Z" fill="#6ec1ff" />
      <WobblySmile />
    </>
  ),
  wink: () => (
    <>
      <Brow x={LEFT} lift={-1} tilt={6} />
      <Brow x={RIGHT} lift={4} />
      <ClosedEye x={LEFT} />
      <OpenEye x={RIGHT} sleepy />
      <Grin />
    </>
  ),
  // Looking down at the label, nudging toward the email button
  eager: () => (
    <>
      <Brow x={LEFT} lift={4} />
      <Brow x={RIGHT} lift={4} />
      <OpenEye x={LEFT} look={[3, 2.5]} />
      <OpenEye x={RIGHT} look={[3, 2.5]} />
      <Grin />
    </>
  ),
  starstruck: () => (
    <>
      <Brow x={LEFT} lift={6} />
      <Brow x={RIGHT} lift={6} />
      <StarEye x={LEFT} />
      <StarEye x={RIGHT} />
      <OpenGrin />
      <Sparkle x={14} y={30} size={6} />
      <Sparkle x={106} y={24} size={5} />
      <Sparkle x={104} y={56} size={4} />
    </>
  ),
};

const MiniAkhil = ({ expression = 'smug', className = '' }) => {
  const Face = FACES[expression] || FACES.smug;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* Hoodie and neck */}
      <rect x="51" y="82" width="18" height="12" fill={SKIN_SHADE} />
      <path d="M12 120 C14 99 33 89 60 89 C87 89 106 99 108 120 Z" fill="#f4f4f2" stroke="#cfcfcb" strokeWidth="1.5" />
      <path d="M38 92 C44 103 76 103 82 92" stroke="#cfcfcb" strokeWidth="1.5" fill="none" />

      {/* Ears and head */}
      <circle cx="27" cy="60" r="7.5" fill={SKIN_SHADE} />
      <circle cx="93" cy="60" r="7.5" fill={SKIN_SHADE} />
      <ellipse cx="60" cy="58" rx="33" ry="36" fill={SKIN} />
      <ellipse cx="48" cy="40" rx="10" ry="5" fill="#fff" opacity="0.12" />

      {/* Hair */}
      <path d="M27 50 C24 27 40 14 60 14 C80 14 96 27 93 50 C88 37 76 30 60 30 C44 30 32 37 27 50 Z" fill={HAIR} />
      {CURLS.map((curl, index) => (
        <circle key={index} cx={curl.x} cy={curl.y} r="5" fill={HAIR} />
      ))}

      {/* Nose */}
      <ellipse cx="60" cy="64.5" rx="7" ry="5" fill={SKIN_SHADE} />

      <Face />
    </svg>
  );
};

export default MiniAkhil;
