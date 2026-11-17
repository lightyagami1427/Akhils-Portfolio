import React from 'react';
import { highlights } from '../case-studies/highlights';
import ResultCard from '../components/ResultCard';

// The proof, right under the hero: real outcomes, each backed by a case study
const ResultsSection = () => (
  <section
    id="results"
    data-annotate="results: numbers pulled live from the case study files"
    className="bg-background text-primary pt-16 sm:pt-24 pb-4 transition-colors duration-300"
  >
    <div className="shell">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 mb-8 sm:mb-10">
        <h2 data-spec="Heading" className="heading text-[clamp(2.5rem,6vw,4.75rem)] max-w-[14ch]">
          Screens are nice. Results are nicer.
        </h2>
        <p className="text-[15.5px] text-secondary pb-2 max-w-[22rem]">From real launches. Each number has a full case study behind it.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {highlights.map((item) => (
          <ResultCard key={`${item.slug}-${item.label}`} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
