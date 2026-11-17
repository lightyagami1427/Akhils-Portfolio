import React, { useRef, useState } from 'react';
import CenterIt from '../games/CenterIt';
import OddColour from '../games/OddColour';
import ColourMatch from '../games/ColourMatch';
import Kerning from '../games/Kerning';
import PerfectCircle from '../games/PerfectCircle';
import SpotTheHandoff from '../games/SpotTheHandoff';
import ClientSpeak from '../games/ClientSpeak';
import GlassesNote from '../components/GlassesNote';

// The arcade. Reorder, rename, or remove games here.
const GAMES = [
  { id: 'center', name: 'Center it', Game: CenterIt },
  { id: 'odd', name: 'Odd colour out', Game: OddColour },
  { id: 'match', name: 'Colour match', Game: ColourMatch },
  { id: 'kerning', name: 'Kerning', Game: Kerning },
  { id: 'circle', name: 'Perfect circle', Game: PerfectCircle },
  { id: 'handoff', name: 'Spot the handoff', Game: SpotTheHandoff },
  { id: 'client', name: 'Client speak', Game: ClientSpeak },
];

const DesignTestSection = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const { Game, id } = GAMES[active];

  // Left and right arrows move between tabs
  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + GAMES.length) % GAMES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="arcade" data-annotate="arcade: 7 games, 6 in plain DOM, 1 on canvas" className="bg-background text-primary py-20 sm:py-28 transition-colors duration-300">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 data-spec="Heading" className="heading text-[clamp(2.5rem,6.5vw,5rem)] max-w-[16ch]">
            You&rsquo;ve tested enough designers. Your turn.
          </h2>
          <p className="text-[15.5px] text-secondary pb-2 max-w-[24rem]">
            {GAMES.length} tiny design tests. Designers will get competitive. So will everyone else.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Design games"
          onKeyDown={handleKeyDown}
          className="mt-10 sm:mt-12 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto no-scrollbar"
        >
          {GAMES.map((game, index) => (
            <button
              key={game.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${game.id}`}
              aria-selected={index === active}
              aria-controls="arcade-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={`shrink-0 h-11 px-4 rounded-xl inline-flex items-center gap-2.5 text-[14.5px] font-semibold whitespace-nowrap transition-colors ${
                index === active ? 'bg-primary text-background' : 'border border-line text-primary hover:bg-card'
              }`}
            >
              <span className={`tabular-nums text-[12px] ${index === active ? 'opacity-60' : 'text-secondary'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {game.name}
            </button>
          ))}
        </div>

        <GlassesNote arrow="up" className="mt-4">kerning is the hard one. on purpose.</GlassesNote>

        <div id="arcade-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="mt-8 sm:mt-10">
          <Game key={id} />
        </div>
      </div>
    </section>
  );
};

export default DesignTestSection;
