/*
  Specter case study.
  Facts: Akhil's notes (first web presence, visual design role within a team,
  goal of holding attention), Specter's product brief, and the shipped screens
  (src/assets/project11-17.png). `confirm: true` marks reconstructions.
*/
import hero from '../assets/project11.webp';
import data from '../assets/project12.webp';
import network from '../assets/project13.webp';
import deals from '../assets/project14.webp';
import extension from '../assets/project15.webp';
import crm from '../assets/project16.webp';
import team from '../assets/project17.webp';

const brand = {
  canvas: '#f4f4f4',
  surface: '#ffffff',
  text: '#000000',
  muted: '#787878',
  accent: '#000000',
  onAccent: '#ffffff',
  line: '#e8e8e8',
  bg: '#ffffff',
};

const specter = {
  slug: 'specter',
  draft: false,
  number: '03',
  year: '2024',
  title: 'Specter',
  summary:
    'The first website for an AI deal-sourcing platform for investors. The content was ready; my job was the visuals that make a data product feel alive and keep investors scrolling.',
  shows: 'Visual design that holds attention without hiding the substance',
  tags: ['Specter', 'AI', 'Private markets'],
  meta: [
    { label: 'Role', value: 'Visual designer, within the team' },
    { label: 'Timeline', value: '2024', confirm: true },
    { label: 'Team', value: 'Specter’s founders, product and content', confirm: true },
    { label: 'Platform', value: 'Web · desktop and mobile · Figma', confirm: true },
  ],
  cover: hero,
  coverLabel: 'specter-home.png',

  // Short labels for the project card on the home page
  card: {
    problem: 'No website, investors skim fast',
    did: ['Visual direction', 'Signal cards', 'Section visuals'],
  },

  trio: {
    problem:
      'Specter had a strong product and the words to describe it, but no website. It was launching against established platforms, to investors who skim fast and have seen every data pitch.',
    call: 'Show the product’s signals as the visuals. Small, real-looking slices of the data (a founder leaving Apple, downloads up 67%) do more than any illustration.',
    outcome: 'The site turned early interest into a growing waitlist before launch.',
    outcomeConfirm: true,
  },

  sections: [
    {
      id: 'context',
      label: 'Context',
      eyebrow: 'Context',
      title: 'Google for startup investors',
      lede:
        'Specter is an AI-powered private market intelligence platform. It brings together company, founder, investor, funding and growth data so VC, PE and M&A teams can find deals before competitors do.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '50M+', label: 'Companies searchable', text: 'From Specter’s brief. Scale is part of the pitch.' },
            { value: '200+', label: 'Data points per company', text: 'Firmographics to web traffic, the depth investors pay for.' },
            { value: '6', label: 'Capabilities to show', text: 'Discovery, founders, investors, signals, AI agents, deal sourcing.' },
          ],
        },
        {
          type: 'findings',
          title: 'What made it hard',
          items: [
            { title: 'Data is invisible', text: 'The product’s value lives in tables and alerts. Screenshots of dense dashboards don’t read at landing-page size.' },
            { title: 'Investors skim', text: 'The audience is short on time and long on pitches. The page had to earn every scroll.' },
            { title: 'First impression only', text: 'No existing site, no brand recognition. The website was the brand.' },
          ],
        },
        { type: 'callout', text: 'Goal: make data feel alive enough that an investor keeps scrolling, and trusts it enough to join the waitlist.' },
      ],
    },

    {
      id: 'role',
      label: 'My role',
      eyebrow: 'My role',
      title: 'Visual design, inside a team',
      lede: 'Specter’s team owned the content and its order. I owned how it looked and how it held attention.',
      blocks: [
        {
          type: 'list',
          items: [
            'Visual direction for Specter’s first digital presence.',
            'The “signal card” language: product data shown as small floating UI fragments.',
            'Section visuals for datasets, network mapping, deal tracking, the browser extension and integrations.',
            'Supporting the team on layout refinement and handoff.',
          ],
        },
      ],
    },

    {
      id: 'audiences',
      label: 'Audiences',
      eyebrow: 'Audiences',
      title: 'Who the page had to hold',
      lede: 'Proto-personas built from Specter’s brief and target market. A working hypothesis, not formal research.',
      blocks: [
        {
          type: 'personas',
          items: [
            {
              name: 'The VC Associate',
              who: 'Venture capital',
              quote: 'I need to find them before the round.',
              asks: 'Will this surface companies my partners haven’t seen?',
              needs: 'Early signals: stealth startups, founder moves, hiring spikes.',
              leaves: 'If it looks like another Crunchbase.',
              color: 'violet',
            },
            {
              name: 'The PE Analyst',
              who: 'Private equity and M&A',
              quote: 'Show me the numbers behind it.',
              asks: 'How deep and how fresh is the data?',
              needs: 'Coverage depth, data sources, CRM sync.',
              leaves: 'If claims come without any visible data.',
              color: 'blue',
            },
            {
              name: 'The BD Lead',
              who: 'Business development',
              quote: 'Who do we already know there?',
              asks: 'Can it map warm paths into a company?',
              needs: 'Relationship mapping, LinkedIn and email sync.',
              leaves: 'If setup sounds like a six-month project.',
              color: 'green',
            },
          ],
        },
      ],
    },

    {
      id: 'before',
      label: 'Before & after',
      eyebrow: 'Before & after',
      title: 'From a content doc to a first impression',
      lede: 'There was no old site to redesign. The “before” was a finished content plan with no visual voice.',
      blocks: [
        {
          type: 'beforeAfter',
          beforeLabel: 'Before · the content plan',
          afterLabel: 'After · the visual story',
          before: [
            { heading: 'Ready', items: ['Section order', 'Headlines and copy', 'Product capabilities', 'Integrations list'] },
            { heading: 'Missing', items: ['A visual identity on the web', 'A way to show data at a glance', 'A reason to keep scrolling'] },
          ],
          beforeNote: 'Strong words, nothing to look at yet.',
          after: [
            { label: 'Four datasets', text: 'Signal cards over a funding-stage timeline', weight: 3 },
            { label: '200+ data points', text: 'Coverage table with depth tags', weight: 2 },
            { label: 'Network mapping', text: 'A live-looking feed of founder moves', weight: 2 },
            { label: 'Every deal tracked', text: 'One company card, zoomed', weight: 2 },
            { label: 'Extension and CRM', text: 'Specter inside tools investors already use', weight: 1.5 },
          ],
          changes: [
            { title: 'Data as the visual', text: 'Instead of dashboards, each section shows one small, readable slice of real-looking data.' },
            { title: 'A consistent signal card', text: 'The same card shape carries a funding round, a founder move or a downloads spike, so visitors learn it once.' },
            { title: 'Motion with a reason', text: 'Cards stack and float to suggest a live feed, the thing Specter actually provides.', confirm: true },
            { title: 'Quiet chrome, loud data', text: 'Black, white and grey for the frame; colour only for signal types and tags.' },
          ],
        },
      ],
    },

    {
      id: 'rules',
      label: 'Goals',
      eyebrow: 'Goals',
      title: 'Five rules for the visuals',
      blocks: [
        {
          type: 'rules',
          items: [
            { title: 'Real-looking data', text: 'Every visual looks like something Specter would actually show.' },
            { title: 'Readable at a glance', text: 'If it needs zooming, it doesn’t belong on the landing page.' },
            { title: 'One card language', text: 'Signals look the same everywhere.' },
            { title: 'Colour means something', text: 'Colour marks signal types, never decoration.' },
            { title: 'Earn the next scroll', text: 'Each section ends with something worth seeing below.' },
          ],
        },
      ],
    },

    {
      id: 'options',
      label: 'Options',
      eyebrow: 'Options & trade-offs',
      title: 'Three ways to show a data product',
      confirm: true,
      blocks: [
        {
          type: 'options',
          brand: { bg: '#ffffff', accent: '#8448f8', text: '#000000' },
          items: [
            {
              key: 'A',
              name: 'Dashboard screenshots',
              headline: 'Full product UI in the hero',
              pros: ['Honest about the product', 'Shows real depth'],
              cons: ['Unreadable at landing size', 'Looks like every data tool'],
            },
            {
              key: 'B',
              name: 'Abstract illustration',
              headline: 'Brand art and gradients',
              pros: ['Distinctive', 'Easy to make beautiful'],
              cons: ['Says nothing about data', 'Investors distrust fluff'],
            },
            {
              key: 'C',
              name: 'Signal fragments',
              headline: 'Loom: mobile downloads up 67%',
              pros: ['Shows the product’s value in one line', 'Readable at any size', 'Feels alive'],
              cons: ['Each card needs believable sample data'],
              chosen: true,
            },
          ],
          criteria: ['Readable at a glance', 'Shows real value', 'Distinctive', 'Holds attention'],
          scores: { A: [0, 2, 0, 1], B: [2, 0, 2, 1], C: [2, 2, 2, 2] },
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
          site: 'tryspecter.com',
          items: [
            { title: 'Four datasets that power smarter decisions', text: 'Signal cards stacked over a timeline from pre-launch to exit: the whole product in one picture.', image: hero },
            { title: '200+ data points', text: 'A coverage table with depth tags, next to signals no one else tracks.', image: data },
            { title: 'Relationship mapping', text: 'A feed of founder moves and warm intros, the same card language in a new role.', image: network },
            { title: 'Every deal tracked', text: 'One company card in focus, with valuation, signal trigger and why it matters.', image: deals },
            { title: 'Specter in your browser', text: 'The extension shown inside the sites investors already use.', image: extension },
            { title: 'Sync with your CRM', text: 'Integrations as installable cards, so setup looks like one click.', image: crm },
            { title: 'The team', text: 'People and career timelines, the same signal style turned on Specter itself.', image: team },
          ],
        },
      ],
    },

    {
      id: 'details',
      label: 'The details',
      eyebrow: 'The details',
      title: 'The waitlist, and the cards behind it',
      lede: 'The one action on the page was joining early access. Its states were designed alongside the visuals.',
      confirm: true,
      blocks: [
        {
          type: 'flowStates',
          title: 'Get Early Access, four states',
          brand,
          items: [
            {
              label: 'Default',
              text: 'One field. Investors decide in seconds, so the form asks for nothing else up front.',
              screen: { eyebrow: 'Early access', title: 'Get early access to Specter', field: { label: 'Work email', placeholder: 'you@fund.com' }, button: { label: 'Get Early Access' } },
            },
            {
              label: 'Invalid email',
              text: 'Plain-language error under the field. The typed text stays.',
              screen: { eyebrow: 'Early access', title: 'Get early access to Specter', field: { label: 'Work email', value: 'alex@fund', error: 'Add the end of your email, like .com' }, button: { label: 'Get Early Access' } },
            },
            {
              label: 'Already joined',
              text: 'No dead end and no duplicate. It confirms they’re in and says what happens next.',
              screen: { banner: { tone: 'info', text: 'You’re already on the list' }, title: 'Good news: you’re in.', body: 'We’ll email alex@fund.com when your access is ready.' },
            },
            {
              label: 'Joined',
              text: 'Confirms, sets expectations, and gives one optional next step.',
              screen: { banner: { tone: 'success', text: 'You’re on the list' }, title: 'Welcome to Specter', body: 'We’re letting firms in batch by batch. Want to tell us what you invest in?', button: { label: 'Share your focus' }, secondary: 'Maybe later' },
            },
          ],
        },
        {
          type: 'findings',
          title: 'Edge cases in the visuals',
          items: [
            { title: 'Believable, not real', text: 'Sample signals use well-known companies with plausible numbers, never private data from real deals.' },
            { title: 'Long company names', text: 'Signal cards were checked with long names and two-line descriptions so the stack doesn’t break.' },
            { title: 'Tag colours with labels', text: 'Coverage tags (Deep, Comprehensive, Moderate) always carry a word, so colour isn’t the only signal.' },
          ],
        },
        {
          type: 'responsive',
          brand: { bg: '#ffffff', accent: '#8448f8', text: '#000000' },
          items: [
            { width: 1440, w: 220, label: 'Desktop', text: 'Card stacks float beside the copy.', layout: 'split' },
            { width: 1024, w: 164, label: 'Laptop', text: 'Stacks tighten. Tables keep all columns.', layout: 'split' },
            { width: 768, w: 118, label: 'Tablet', text: 'Visuals move below the headline.', layout: 'stack' },
            { width: 390, w: 70, label: 'Phone', text: 'One signal card at a time. Tables scroll sideways.', layout: 'phone' },
          ],
        },
      ],
    },

    {
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      title: 'Measured from the screens',
      lede: 'The black-and-white frame is about as accessible as it gets. The risk is in the very light grey used for secondary text.',
      blocks: [
        {
          type: 'contrast',
          note: 'Measured from the exported screens. Small text is smoothed in exports, so grey values are approximate.',
          items: [
            { label: 'Headline black', fg: '#000000', bg: '#ffffff', ratio: 21, kind: 'text' },
            { label: 'White on black button', fg: '#ffffff', bg: '#000000', ratio: 21, kind: 'text' },
            { label: 'Signal violet', fg: '#8448f8', bg: '#ffffff', ratio: 4.93, kind: 'text' },
            { label: 'Body grey', fg: '#787878', bg: '#ffffff', ratio: 4.42, kind: 'text' },
            { label: 'Light secondary grey', fg: '#a8a8a8', bg: '#ffffff', ratio: 2.38, kind: 'text' },
          ],
          finding:
            'The lightest grey, used for secondary lines like “Mobile app downloads up 67% in 14 days”, measures about 2.4:1. Body grey sits just under 4.5:1 too. Moving both to around #6b6b6b passes AA and keeps the soft look.',
        },
      ],
    },

    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      title: 'One card, many jobs',
      lede: 'The signal card did most of the work. Counted from the shipped screens.',
      blocks: [
        {
          type: 'tokens',
          items: [
            { name: 'bg/page', hex: '#ffffff', role: 'Page background' },
            { name: 'bg/subtle', hex: '#f4f4f4', role: 'Section bands' },
            { name: 'line/subtle', hex: '#e8e8e8', role: 'Card borders' },
            { name: 'text/primary', hex: '#000000', role: 'Headlines, buttons' },
            { name: 'text/body', hex: '#787878', role: 'Body copy' },
            { name: 'accent/signal', hex: '#8448f8', role: 'Signal icons and tags' },
          ],
        },
        {
          type: 'components',
          note: 'Counted across the seven screens shown above, including partly visible items.',
          items: [
            { name: 'Signal card', detail: 'Icon, label, one-line signal', count: 9 },
            { name: 'Coverage tag', detail: 'Deep, Comprehensive, Moderate', count: 8 },
            { name: 'Feature row', detail: 'Coloured icon, title, text', count: 4 },
            { name: 'Section header', detail: 'Centred title and lede', count: 4 },
            { name: 'Integration card', detail: 'Logo, text, Install', count: 3 },
            { name: 'Black pill button', detail: 'Primary action', count: 3 },
          ],
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
          weeks: 6,
          note: 'Approximate. Replace with the real phases and weeks.',
          items: [
            { name: 'Content and references', start: 0, end: 1 },
            { name: 'Visual direction', start: 0.5, end: 2.5 },
            { name: 'Signal card language', start: 2, end: 4 },
            { name: 'Section visuals', start: 3, end: 5.5 },
            { name: 'Refinement and handoff', start: 5, end: 6 },
          ],
        },
      ],
    },

    {
      id: 'impact',
      label: 'Impact',
      eyebrow: 'Impact',
      title: 'Interest that turned into a list',
      blocks: [
        {
          type: 'impact',
          items: [
            { value: 'Growing', label: 'Pre-launch waitlist', text: 'The site turned early interest into a waitlist that kept growing up to launch.' },
            { label: 'Waitlist sign-ups', hint: 'e.g. sign-ups in the first month' },
          ],
          note: 'The site converted early interest into a growing waitlist. Add the size of that list, even roughly, or a line from the founders.',
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
            { title: 'Show a slice, not the whole', text: 'One readable signal beats a full dashboard on a landing page.' },
            { title: 'A visual language is a system', text: 'One card shape, used everywhere, taught visitors how to read the page.' },
            { title: 'Visual design is a team sport', text: 'With content already strong, my job was to amplify it, not redesign it.' },
            { title: 'Grey is a budget', text: 'Soft greys look premium until they fail contrast.' },
          ],
        },
      ],
    },

    {
      id: 'reflection',
      label: 'Reflection',
      eyebrow: 'Reflection',
      title: 'What Specter taught me',
      confirm: true,
      blocks: [{ type: 'quote', text: 'The best visual for a data product is its data, cropped well.' }],
    },
  ],
};

export default specter;
