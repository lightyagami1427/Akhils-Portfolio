import { caseStudies } from './index';

// Every impact item with a real number, for one case study
export const resultsOf = (slug) =>
  (caseStudies[slug]?.sections ?? [])
    .flatMap((section) => section.blocks)
    .filter((block) => block.type === 'impact')
    .flatMap((block) => block.items)
    .filter((item) => item.value);

// The numbers shown on the home page, taken straight from the case studies so they never disagree
const PICKS = [
  { slug: 'brightcode', index: 1 },
  { slug: 'joynt', index: 0 },
  { slug: 'podtoposts', index: 0 },
  { slug: 'brightcode', index: 0 },
];

export const highlights = PICKS.map(({ slug, index }) => ({ slug, study: caseStudies[slug], ...resultsOf(slug)[index] })).filter(
  (item) => item.value
);
