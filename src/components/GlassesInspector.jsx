import { useEffect } from 'react';

const trim = (value, digits = 2) => String(Number(value.toFixed(digits)));

// "Display · Aa 7.5rem · ↕ 0.9 · ↔ -0.035em · W 584 · H 410", read live from the page
const describe = (element) => {
  const style = getComputedStyle(element);
  const fontSize = parseFloat(style.fontSize);
  const lineHeight = style.lineHeight === 'normal' ? 1.2 : parseFloat(style.lineHeight) / fontSize;
  const tracking = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing) / fontSize;
  const { width, height } = element.getBoundingClientRect();
  return [
    element.dataset.spec,
    `Aa ${trim(fontSize / 16)}rem`,
    `↕ ${trim(lineHeight)}`,
    `↔ ${trim(tracking, 3)}em`,
    `W ${Math.round(width)}`,
    `H ${Math.round(height)}`,
  ].join('  ·  ');
};

/*
  While glasses are on, writes live measurements onto every [data-spec]
  element so the CSS can show them. Re-measures on resize.
*/
const GlassesInspector = () => {
  useEffect(() => {
    const measure = () => {
      document.querySelectorAll('[data-spec]').forEach((element) => {
        element.dataset.specInfo = describe(element);
      });
    };

    measure();
    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return null;
};

export default GlassesInspector;
