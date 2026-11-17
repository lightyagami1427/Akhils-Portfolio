/*
  Planck Network case study.

  Facts here come from Planck's own brief, the shipped screens, and Akhil's CV.
  Anything marked `confirm: true` is a reconstruction for Akhil to check, edit
  or delete. When it is all confirmed, set `draft: false` to hide the markers.

  Charts that are measured (contrast, component counts, colour tokens) come from
  the exported screens in src/assets/project21-25.png.
*/
import hero from '../assets/project21.webp';
import layers from '../assets/project22.webp';
import modes from '../assets/project23.webp';
import audiences from '../assets/project24.webp';
import about from '../assets/project25.webp';

const planck = {
  slug: 'planck',
  draft: false,
  number: '01',
  year: '2024',
  title: 'Planck Network',
  summary:
    'A website that sells decentralised GPU compute to three audiences at once: builders who need a GPU today, operators who want to earn from theirs, and backers who need to believe in the stack.',
  shows: 'Turning a dense, four-product Web3 pitch into one page each audience can act on',
  tags: ['Planck Network', 'AI infrastructure', 'Web3'],
  meta: [
    { label: 'Role', value: 'UI UX Designer, website lead', confirm: true },
    { label: 'Timeline', value: 'Jan 2024 – Feb 2025', note: 'Full role at Planck' },
    { label: 'Team', value: 'Founders and engineering', confirm: true },
    { label: 'Platform', value: 'Web · desktop and mobile · Figma', confirm: true },
  ],
  cover: hero,
  coverLabel: 'planck-home.png',

  // Short labels for the project card on the home page
  card: {
    problem: '4 products, 3 audiences, 1 page',
    did: ['Page structure', 'Two-door hero', '3D art direction'],
  },

  trio: {
    problem:
      'Four products, a token and a mission, but a first-time visitor couldn’t tell from one screen what they could actually do here: rent a GPU, stake one, or invest.',
    call:
      'Lead with the category claim, then give every audience its own door: two calls to action in the hero, one section per product layer, one per audience.',
    outcome: 'Add what happened after launch: console sign-ups, staking interest, investor feedback, or the founders’ reaction.',
    outcomeConfirm: true,
    outcomePlaceholder: true,
  },

  sections: [
    {
      id: 'context',
      label: 'Context',
      eyebrow: 'Context',
      title: 'Four products, one scroll',
      lede:
        'Planck is building the layers of a decentralised AI cloud: a Layer-0 for sovereign AI chains, a GPU-native Layer-1, bare-metal GPU access, and low-code tools to train and deploy models. The website had to sell all of it, to people who arrive knowing very different amounts.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '4', label: 'Products to explain', text: 'Planck₀, Planck₁, AI Cloud and AI Studio, each with its own buyer.' },
            { value: '90%', label: 'Lower-cost compute', text: 'Planck’s headline claim against centralised cloud. The one idea everyone understands.' },
            { value: '5+', label: 'Named backers', text: 'Brock Pierce, Scott Walker, Victor Rollman, GDA Capital, DePIN X Capital.' },
          ],
        },
        {
          type: 'findings',
          title: 'What the brief told me',
          items: [
            { title: 'Too many nouns', text: 'Layer-0, Layer-1, DePIN, AI Cloud, AI Studio, $PLANCK. Each one needed a plain-English sentence before it could earn a section.' },
            { title: 'Two different “buy” actions', text: 'Renting compute and getting the token are different decisions made by different people. One button couldn’t serve both.' },
            { title: 'Trust is part of the product', text: 'For infrastructure, who backs it and which data centres run it matter as much as features.' },
          ],
        },
        { type: 'callout', text: 'Goal: one site where a developer, a GPU owner and an investor each find their answer before they scroll past it.' },
      ],
    },

    {
      id: 'role',
      label: 'My role',
      eyebrow: 'My role',
      title: 'What I owned',
      blocks: [
        {
          type: 'list',
          confirm: true,
          items: [
            'Information architecture: turning the brief into a page order, section by section.',
            'Visual direction: the dark, teal-lit look and the art direction for the 3D renders.',
            'Responsive layouts for desktop, tablet and mobile.',
            'States, edge cases and specs for engineering handoff.',
          ],
        },
      ],
    },

    {
      id: 'audiences',
      label: 'Audiences',
      eyebrow: 'Audiences',
      title: 'Three visitors, three questions',
      lede: 'The research from this project isn’t available any more, so these are proto-personas: built from Planck’s brief and the audiences the site itself names. They were the working hypothesis for the page order, not measured data.',
      blocks: [
        {
          type: 'personas',
          items: [
            {
              name: 'The Builder',
              who: 'Startups, researchers, solo devs',
              quote: 'I need a GPU this week.',
              asks: 'What GPUs, what price, and how fast can I start?',
              needs: 'Plain pricing, 3090 and 4090 availability, no DevOps.',
              leaves: 'If they have to read about Layer-0 before finding the console.',
              color: 'green',
            },
            {
              name: 'The Operator',
              who: 'GPU owners and data centres',
              quote: 'My GPUs sit idle at night.',
              asks: 'How do I earn from them, and is it safe?',
              needs: 'Staking explained simply, retail and enterprise tiers.',
              leaves: 'If staking reads like a token pitch instead of a service.',
              color: 'orange',
            },
            {
              name: 'The Backer',
              who: 'Investors, partners, token holders',
              quote: 'Show me this is real.',
              asks: 'Who’s behind it, and what’s the moat?',
              needs: 'A clear architecture story, names, partners.',
              leaves: 'If it’s buzzwords with no names attached.',
              color: 'violet',
            },
          ],
        },
        {
          type: 'attention',
          caption: 'Each visitor needs a different part of the page. The hero has to point all three somewhere useful in the first screen.',
          note: 'Hypothesis used to order the page. Not measured.',
          stops: ['Hero', 'Product layers', 'Deployment modes', 'Use cases', 'About & backers'],
          rows: [
            { name: 'The Builder', color: 'green', needs: [0, 3], decides: 3, cta: 'Launch GPU Console' },
            { name: 'The Operator', color: 'orange', needs: [0, 2], decides: 2, cta: 'Stake GPUs' },
            { name: 'The Backer', color: 'violet', needs: [0, 1, 4], decides: 4, cta: 'Get $PLANCK' },
          ],
        },
      ],
    },

    {
      id: 'before',
      label: 'Before & after',
      eyebrow: 'Before & after',
      title: 'From a brief to a page',
      lede: 'Planck’s story arrived as four lists of four: products, mission, backers and principles. Every point was true, and in that order none of it answered what a visitor could do.',
      blocks: [
        {
          type: 'beforeAfter',
          before: [
            { heading: 'The AI Cloud, reimagined', items: ['Planck₀, modular Layer-0', 'Planck₁, GPU-native Layer-1', 'AI Cloud, bare-metal GPUs', 'AI Studio, low-code tools'] },
            { heading: 'Our mission', items: ['Decentralise AI infrastructure', 'Make compute programmable', 'Empower builders at every level', 'Unify AI and DePIN networks'] },
            { heading: 'Built by experts, backed by legends', items: ['Founded by top engineers', 'Backed by Brock Pierce and others', 'Partners with CUTEC and data centres'] },
            { heading: 'Principles', items: ['Transparency', 'Performance', 'Accessibility', 'Security'] },
          ],
          after: [
            { label: 'Hero', text: 'Category claim, plain verbs, two doors', weight: 3 },
            { label: 'What makes Planck different', text: 'Planck₀, Planck₁, AI Studio as cards', weight: 2 },
            { label: 'Compute deployment modes', text: 'Enterprise, retail staking, token staking', weight: 2 },
            { label: 'Prototype to production', text: 'Enterprise, startups, researchers', weight: 2 },
            { label: 'About', text: 'Mission, backers, principles', weight: 1 },
          ],
          changes: [
            { title: 'Verbs before nouns', text: 'The hero subline says what you can do (launch chains, rent GPUs, train models) before any layer is named.' },
            { title: 'AI Cloud became a button', text: 'Instead of a fourth product card, the GPU cloud is the primary action: Launch GPU Console.' },
            { title: 'Products became cards, audiences became columns', text: 'One card per layer, one column per audience, so each visitor can find their row.' },
            { title: 'Mission moved to About', text: 'The why still matters, but on its own page, for the people who go looking for it.', confirm: true },
          ],
          note: 'If an earlier version of the Planck site or a rejected first draft exists, swap it in here for a screen-to-screen before and after.',
        },
      ],
    },

    {
      id: 'rules',
      label: 'Goals',
      eyebrow: 'Goals',
      title: 'Five rules for the page',
      blocks: [
        {
          type: 'rules',
          items: [
            { title: 'Plain English once', text: 'Every product gets one sentence a non-crypto developer understands.' },
            { title: 'Two doors', text: 'Compute and token are separate buttons in the first screen.' },
            { title: 'One question per section', text: 'Each section answers one visitor’s question, and only that.' },
            { title: 'Proof beside claims', text: 'Numbers and names sit next to the promise they back up.' },
            { title: 'Dark, but readable', text: 'The mood is dark. Contrast never is.' },
          ],
        },
      ],
    },

    {
      id: 'options',
      label: 'Options',
      eyebrow: 'Options & trade-offs',
      title: 'Three ways to open the page',
      lede: 'The hero decides who stays. I explored three directions for it.',
      confirm: true,
      blocks: [
        {
          type: 'options',
          items: [
            {
              key: 'A',
              name: 'Price first',
              headline: 'Rent a 4090 from $0.35/hr',
              pros: ['Instantly clear to builders', 'Easy to measure'],
              cons: ['Makes Planck look like a GPU reseller', 'Prices change weekly', 'Says nothing to backers'],
            },
            {
              key: 'B',
              name: 'Stack first',
              headline: 'Planck₀ → Planck₁ → AI Cloud',
              pros: ['Credible to Web3 natives', 'Shows the moat'],
              cons: ['Builders leave before finding a GPU', 'Needs a glossary to read'],
            },
            {
              key: 'C',
              name: 'Claim and two doors',
              headline: 'The World’s First Layer-0 for AI and DePIN',
              pros: ['A claim for backers, verbs for builders', 'Every audience gets a button'],
              twoButtons: true,
              cons: ['The headline still uses jargon, so the subline has to translate it'],
              chosen: true,
            },
          ],
          criteria: ['Clear to builders', 'Credible to backers', 'Room for four products', 'Survives price changes'],
          scores: {
            A: [2, 0, 0, 0],
            B: [0, 2, 2, 2],
            C: [1, 2, 2, 2],
          },
          note: 'The price in A is an example for illustration, not a real Planck price.',
          brand: { bg: '#000814', accent: '#00e0d4', text: '#ffffff' },
        },
      ],
    },

    {
      id: 'final',
      label: 'Final output',
      eyebrow: 'Final output',
      title: 'The site, section by section',
      lede: 'Pick a section to see the shipped design.',
      blocks: [
        {
          type: 'walkthrough',
          site: 'planck.network',
          items: [
            { title: 'Hero: a claim and two doors', text: 'The category claim for backers, three plain verbs for builders, and two buttons: Get $PLANCK and Launch GPU Console.', image: hero },
            { title: 'What makes Planck different', text: 'Planck₀, Planck₁ and AI Studio, each a card with one job and one sentence.', image: layers },
            { title: 'Compute deployment modes', text: 'Enterprise compute, retail GPU staking and token staking: three ways to take part, side by side for operators.', image: modes },
            { title: 'From prototype to production', text: 'Enterprise, startups and researchers each get a column with three concrete reasons, so every builder can find their row.', image: audiences },
            { title: 'About: the mission, on its own page', text: 'The why, for the people who go looking for it, with the same two doors at the top.', image: about },
          ],
        },
      ],
    },

    {
      id: 'details',
      label: 'The details',
      eyebrow: 'The details',
      title: 'Beyond the hero screen',
      lede: 'A hero with a live 3D render and a button that opens a console has to behave well when things aren’t perfect.',
      confirm: true,
      blocks: [
        { type: 'states' },
        {
          type: 'findings',
          title: 'Edge cases',
          items: [
            { title: 'Subscripts in product names', text: 'Planck₀ and Planck₁ use subscript characters. The type had to include those glyphs, or the names fall back to another font mid-word.' },
            { title: 'Leaving the site', text: 'Get $PLANCK opens an exchange. It’s marked with an external-link icon and opens in a new tab, so nobody loses their place.' },
            { title: 'Two buttons on a small nav', text: 'On mobile, the nav collapses to a menu, but Launch GPU Console stays visible: it’s the one action most visitors came for.' },
            { title: 'Text over 3D art', text: 'On narrow screens the sphere sits behind the headline. A gradient scrim keeps the text readable whatever frame the render is on.' },
          ],
        },
        { type: 'responsive' },
      ],
    },

    {
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      title: 'Measured, not assumed',
      lede: 'I measured contrast from the shipped screens. All text passes WCAG AA easily, and most passes AAA. The one failure was a boundary, not text.',
      blocks: [
        {
          type: 'contrast',
          note: 'Measured from the exported screens. Colours rounded to the nearest 8 in each channel.',
          items: [
            { label: 'Headline white', fg: '#fcfcfc', bg: '#000814', ratio: 19.59, kind: 'text' },
            { label: 'Body grey', fg: '#d0d0d0', bg: '#000814', ratio: 13.03, kind: 'text' },
            { label: 'Teal accent', fg: '#00e0d4', bg: '#000814', ratio: 12.07, kind: 'text' },
            { label: 'Button label on teal', fg: '#000814', bg: '#00e0d4', ratio: 12.07, kind: 'text' },
            { label: 'Secondary grey', fg: '#a8a8b0', bg: '#000814', ratio: 8.51, kind: 'text' },
            { label: 'Small teal eyebrow', fg: '#00a8a0', bg: '#000814', ratio: 6.8, kind: 'text' },
            { label: 'Ghost button outline', fg: '#30343c', bg: '#000814', ratio: 1.61, kind: 'boundary' },
          ],
          finding:
            'The outline of the Get $PLANCK ghost button measures 1.61:1. WCAG asks for 3:1 for the edges of controls, so on some screens it reads as floating text. The fix: lift the outline to at least #5c6470, or give the button a faint filled background.',
        },
        {
          type: 'findings',
          title: 'Also specified',
          confirm: true,
          items: [
            { title: 'Visible focus', text: 'A solid 2px teal ring on every control. The glow effect alone isn’t a focus state.' },
            { title: 'Reduced motion', text: 'With reduced motion on, the sphere stops rotating and shows a still frame.' },
            { title: 'Real headings', text: 'One h1 per page, section titles as h2, so screen readers can jump between sections.' },
          ],
        },
      ],
    },

    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      title: 'Built from a small kit',
      lede: 'Five screens, built from a handful of parts. Counted from the shipped designs.',
      blocks: [
        {
          type: 'tokens',
          items: [
            { name: 'bg/base', hex: '#000814', role: 'Page background' },
            { name: 'bg/card', hex: '#080c14', role: 'Card surface' },
            { name: 'line/subtle', hex: '#30343c', role: 'Outlines, dividers' },
            { name: 'text/primary', hex: '#fcfcfc', role: 'Headlines' },
            { name: 'text/body', hex: '#d0d0d0', role: 'Body copy' },
            { name: 'text/secondary', hex: '#a8a8b0', role: 'Supporting text' },
            { name: 'accent/teal', hex: '#00e0d4', role: 'Primary action, highlights' },
            { name: 'accent/teal-dim', hex: '#00a8a0', role: 'Eyebrows, small labels' },
          ],
        },
        {
          type: 'components',
          note: 'Counted across the five screens shown above.',
          items: [
            { name: 'Feature card', detail: 'Render, title, one sentence', count: 6 },
            { name: 'Pill button', detail: 'Filled teal and ghost', count: 8 },
            { name: 'Checklist item', detail: 'Teal tick and one line', count: 9 },
            { name: 'Section header', detail: 'Eyebrow, title, lede', count: 3 },
            { name: 'Audience card', detail: 'Eyebrow, title, checklist', count: 3 },
            { name: 'Nav bar', detail: 'Logo, menus, socials, two buttons', count: 2 },
          ],
          finding: 'Spotted while counting: two different sections share the same eyebrow, “Why it matters?”. Each section should have its own.',
        },
      ],
    },

    {
      id: 'timeline',
      label: 'Timeline',
      eyebrow: 'Timeline',
      title: 'How the work ran',
      confirm: true,
      blocks: [
        {
          type: 'timeline',
          weeks: 11,
          note: 'Approximate. Replace with the real phases and weeks.',
          items: [
            { name: 'Brief and audiences', start: 0, end: 2 },
            { name: 'Page structure', start: 1, end: 4 },
            { name: 'Visual direction and 3D', start: 3, end: 7 },
            { name: 'Responsive and states', start: 6, end: 9 },
            { name: 'Handoff and launch', start: 8, end: 11 },
          ],
        },
      ],
    },

    {
      id: 'impact',
      label: 'Impact',
      eyebrow: 'Impact',
      title: 'What changed',
      blocks: [
        {
          type: 'impact',
          items: [
            { label: 'Console sign-ups', hint: 'e.g. first-month sign-ups from the site' },
            { label: 'Staking interest', hint: 'e.g. operator enquiries after launch' },
            { label: 'Time on page', hint: 'e.g. from analytics, before vs after' },
          ],
          note: 'Add real numbers here, even rough ones marked “approx.”, or a line from the founders. Leave out any metric you can’t stand behind in an interview.',
        },
      ],
    },

    {
      id: 'learnings',
      label: 'Learnings',
      eyebrow: 'Learnings',
      title: 'What I’d tell the next team',
      confirm: true,
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Jargon needs a translator', text: 'Keep the category claim, but put a plain sentence right under it.' },
            { title: 'Different buyers, different buttons', text: 'One call to action was never going to serve a developer and an investor.' },
            { title: 'Dark UI needs a contrast budget', text: 'Text was fine. Outlines were the thing that quietly failed.' },
            { title: '3D needs a poster frame', text: 'Design the still image first. The render is a bonus on fast connections.' },
          ],
        },
        {
          type: 'next',
          title: 'Where the site goes next',
          items: [
            { title: 'GPU price calculator', text: 'Compare a job’s cost against centralised cloud.' },
            { title: 'Operator onboarding', text: 'A guided path from “I have a GPU” to earning.' },
            { title: 'Live network stats', text: 'GPUs online and jobs run, as proof on the homepage.' },
          ],
        },
      ],
    },

    {
      id: 'reflection',
      label: 'Reflection',
      eyebrow: 'Reflection',
      title: 'What Planck taught me',
      confirm: true,
      blocks: [
        { type: 'quote', text: 'In infrastructure, the design job is translation. The product was already powerful. My job was making it legible.' },
      ],
    },
  ],
};

export default planck;
