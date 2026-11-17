/*
  Podtoposts case study.
  Facts: Akhil's notes (first product design, solo, free-flow onboarding,
  conversion), the PodToPosts brief, and the shipped screens
  (src/assets/project31-37.png). `confirm: true` marks reconstructions.
*/
import signup from '../assets/project31.webp';
import onboarding from '../assets/project32.webp';
import uploads from '../assets/project33.webp';
import episode from '../assets/project34.webp';
import settings from '../assets/project35.webp';
import dashboard from '../assets/project36.webp';
import transcript from '../assets/project37.webp';

const brand = {
  canvas: '#ece8ff',
  surface: '#ffffff',
  text: '#1a1033',
  muted: '#686868',
  accent: '#8848ff',
  onAccent: '#ffffff',
  line: '#e6e2f5',
  bg: '#f4f2ff',
};

const podtoposts = {
  slug: 'podtoposts',
  draft: false,
  number: '04',
  year: '2025',
  title: 'Podtoposts',
  summary:
    'The first version of an AI tool that turns one podcast episode into carousels, quote cards, audiograms and posts. Designed so people get value before they’re asked to pay.',
  shows: 'Designing a product’s very first version, around a free-flow onboarding',
  tags: ['Podtoposts', 'AI SaaS', '0 to 1'],
  meta: [
    { label: 'Role', value: 'Solo product designer' },
    { label: 'Timeline', value: '2025', confirm: true },
    { label: 'Team', value: 'Founders and developers', confirm: true },
    { label: 'Platform', value: 'Web app · Figma', confirm: true },
  ],
  cover: episode,
  coverLabel: 'podtoposts-episode.png',

  // Short labels for the project card on the home page
  card: {
    problem: 'New brand, no trust yet',
    did: ['Free-flow onboarding', 'Content factory', 'Plan limits'],
  },

  trio: {
    problem:
      'A new company with no product yet. Podcasters were the audience: busy, not designers, and used to tools that ask for a card before showing anything.',
    call: 'A free flow: sign up, drop in one episode (or skip), and see real content made from it. Payment comes after the “oh, that’s good” moment.',
    outcome: 'Around 5,000 members became active users in the first week, and free users started converting to paid.',
    outcomeConfirm: true,
  },

  sections: [
    {
      id: 'context',
      label: 'Context',
      eyebrow: 'Context',
      title: 'Episodes disappear after one listen',
      lede:
        'PodToPosts is an AI marketing assistant for podcasters. It pulls quotes, insights and key moments out of an episode and turns them into social content for LinkedIn, Instagram and X.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '1', label: 'Episode in', text: 'From an RSS feed, a video upload or pasted text.' },
            { value: '7', label: 'Formats out', text: 'Carousels, quote cards, audiograms, threads, posts, blog posts, notes.' },
            { value: '3', label: 'Platforms', text: 'LinkedIn, Instagram and X, each with its own sizes.' },
          ],
        },
        {
          type: 'findings',
          title: 'What a first product needs',
          items: [
            { title: 'Value before effort', text: 'With no brand and no reviews yet, the product itself had to be the proof, fast.' },
            { title: 'Nothing to redesign', text: 'No existing screens, patterns or habits. Every decision was a first decision.' },
            { title: 'Room to grow', text: 'Founders would add formats and plans quickly, so the structure had to take new parts without a redesign.' },
          ],
        },
        { type: 'callout', text: 'Goal: get a podcaster from sign-up to their first ready-to-post carousel in one sitting, without asking for a card.' },
      ],
    },

    {
      id: 'role',
      label: 'My role',
      eyebrow: 'My role',
      title: 'Solo, first product design',
      blocks: [
        {
          type: 'list',
          items: [
            'Product structure: sign-up, onboarding, uploads, the content factory, dashboard and settings.',
            'The free-flow onboarding and where the paywall sits.',
            'The component kit and visual design.',
            'States, limits and edge cases for handoff.',
          ],
        },
      ],
    },

    {
      id: 'audiences',
      label: 'Audiences',
      eyebrow: 'Audiences',
      title: 'Three kinds of podcaster',
      lede: 'Proto-personas built from the brief and the founders’ target market. A working hypothesis, not formal research.',
      blocks: [
        {
          type: 'personas',
          items: [
            {
              name: 'The Solo Host',
              who: 'Indie podcasters',
              quote: 'I record, edit and post. Alone.',
              asks: 'Can this save me an evening every week?',
              needs: 'Good defaults, no design skills needed, a free try.',
              leaves: 'If it asks for a card before showing anything.',
              color: 'violet',
            },
            {
              name: 'The Producer',
              who: 'Agencies running several shows',
              quote: 'Five shows, five brands, one me.',
              asks: 'Can I keep each show’s look separate?',
              needs: 'Brand settings, many uploads, scheduling.',
              leaves: 'If limits stop them at the second show.',
              color: 'blue',
            },
            {
              name: 'The Brand Marketer',
              who: 'Companies with a podcast',
              quote: 'The podcast needs to pay for itself.',
              asks: 'Will this get us reach on LinkedIn?',
              needs: 'On-brand carousels, performance stats.',
              leaves: 'If output looks templated and cheap.',
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
      title: 'From a feature list to a first flow',
      lede: 'With no previous product, the “before” was the founders’ feature list. The work was ordering it around one moment: seeing your first carousel.',
      blocks: [
        {
          type: 'beforeAfter',
          beforeLabel: 'Before · the feature list',
          afterLabel: 'After · the first-run flow',
          before: [
            { heading: 'Capabilities', items: ['AI content extraction', 'Carousel generation', 'Quote cards', 'AI captions', 'Content calendar', 'Multi-platform export'] },
          ],
          beforeNote: 'Six features, equally loud, with no order to try them in.',
          after: [
            { label: 'Sign up', text: 'Email or Google, nothing else', weight: 1.5 },
            { label: 'Add your RSS feed', text: 'One field, or “Skip for now”', weight: 2 },
            { label: 'First episode, first carousel', text: 'Generated content appears straight away', weight: 3 },
            { label: 'Explore the content factory', text: 'Other formats, one tab away', weight: 1.5 },
            { label: 'Upgrade when it matters', text: 'Limits shown in context, not as a wall', weight: 1 },
          ],
          changes: [
            { title: 'One path first', text: 'Carousels lead because they show the most value in one look. The other six formats are tabs, not steps.' },
            { title: 'Skippable onboarding', text: 'Adding an RSS feed is one field with a visible “Skip for now”, so nobody is stuck before seeing the product.' },
            { title: 'Paywall moved to the end', text: 'Payment is asked for once someone has content they want to keep, not at sign-up.' },
            { title: 'Limits in context', text: 'Plan limits show where they apply (next to uploads) instead of blocking the whole app.' },
          ],
        },
      ],
    },

    {
      id: 'rules',
      label: 'Goals',
      eyebrow: 'Goals',
      title: 'Five rules for a first product',
      blocks: [
        {
          type: 'rules',
          items: [
            { title: 'Value in one sitting', text: 'First carousel before the first coffee goes cold.' },
            { title: 'Everything skippable', text: 'No step stands between a user and the product.' },
            { title: 'Pay after the wow', text: 'Ask for money once there’s something worth keeping.' },
            { title: 'Room for new formats', text: 'Adding a format is adding a tab.' },
            { title: 'Their brand, not ours', text: 'Output uses the podcaster’s colours and fonts.' },
          ],
        },
      ],
    },

    {
      id: 'options',
      label: 'Options',
      eyebrow: 'Options & trade-offs',
      title: 'Three ways to start',
      lede: 'Where to ask for money, and how much setup to ask for first, shaped everything else.',
      confirm: true,
      blocks: [
        {
          type: 'options',
          brand: { bg: brand.bg, accent: brand.accent, text: brand.text },
          items: [
            {
              key: 'A',
              name: 'Plan first',
              headline: 'Choose a plan to get started',
              pros: ['Revenue from day one', 'Filters for serious users'],
              cons: ['Asks for trust a new brand doesn’t have', 'Most people never see the product'],
            },
            {
              key: 'B',
              name: 'Full setup wizard',
              headline: 'Connect RSS, brand kit and socials',
              pros: ['Better first output', 'Fully set up accounts'],
              cons: ['Five steps before any value', 'Drop-off at every step'],
            },
            {
              key: 'C',
              name: 'Free flow',
              headline: 'Add one episode, or skip',
              pros: ['Value in one sitting', 'The product sells itself', 'Setup happens later, in context'],
              cons: ['Free users cost compute', 'First output uses default branding'],
              chosen: true,
              twoButtons: true,
            },
          ],
          criteria: ['Time to first value', 'Trust needed up front', 'Path to paying', 'Output quality at first run'],
          scores: { A: [0, 0, 2, 1], B: [0, 1, 1, 2], C: [2, 2, 2, 1] },
        },
      ],
    },

    {
      id: 'final',
      label: 'Final output',
      eyebrow: 'Final output',
      title: 'The product, screen by screen',
      lede: 'Pick a screen to see the shipped design.',
      blocks: [
        {
          type: 'walkthrough',
          site: 'app.podtoposts.com',
          items: [
            { title: 'Sign up', text: 'Email or Google, with a preview of what the product makes on the right.', image: signup },
            { title: 'Add your RSS feed', text: 'One field, a preview of the outputs, and “Skip for now” always visible.', image: onboarding },
            { title: 'My uploads', text: 'RSS, video and text inputs in one place, with plan limits shown right where they apply.', image: uploads },
            { title: 'The content factory', text: 'One episode, seven formats as tabs. Edit, download, copy text or change language from the same bar.', image: episode },
            { title: 'Transcript', text: 'The full transcript, so creators can check and pull quotes themselves.', image: transcript },
            { title: 'Dashboard', text: 'Followers, scheduled posts, top performers and weekly engagement.', image: dashboard },
            { title: 'Settings and brand', text: 'Profile, referrals, and brand colours that flow into every output.', image: settings },
          ],
        },
      ],
    },

    {
      id: 'details',
      label: 'The details',
      eyebrow: 'The details',
      title: 'From feed to first carousel',
      lede: 'The first run is where a free user decides to stay. Every state of it was designed.',
      confirm: true,
      blocks: [
        {
          type: 'flowStates',
          title: 'First run, five states',
          brand,
          items: [
            {
              label: 'Empty',
              text: 'One field, a clear promise of what comes out, and a visible way to skip.',
              screen: { eyebrow: 'Step 1 of 1', title: 'Add your RSS feed', body: 'We’ll turn your latest episode into carousels, quote cards and posts.', field: { label: 'RSS feed link', placeholder: 'https://feeds.yourshow.com/rss' }, button: { label: 'Continue' }, secondary: 'Skip for now' },
            },
            {
              label: 'Invalid feed',
              text: 'Explains what went wrong and where to find the right link, without clearing the field.',
              screen: { eyebrow: 'Step 1 of 1', title: 'Add your RSS feed', field: { label: 'RSS feed link', value: 'spotify.com/show/barbershop', error: 'That’s a show page, not a feed. Find your RSS link in your host’s settings.' }, button: { label: 'Continue' }, secondary: 'Skip for now' },
            },
            {
              label: 'Processing',
              text: 'Long AI jobs show real progress and what’s happening, so a two-minute wait feels like work, not a freeze.',
              screen: { eyebrow: 'The Barbershop Podcast · Episode 4', title: 'Reading your episode', progress: 62, progressLabel: 'Transcript ready · finding the best quotes…', button: { label: 'Working…', loading: true, disabled: true } },
            },
            {
              label: 'Ready',
              text: 'Outputs arrive as a list of finished formats, with the one that sells the product best on top.',
              screen: {
                banner: { tone: 'success', text: 'Your content is ready' },
                title: 'Episode 4 is now 6 pieces of content',
                list: [
                  { label: 'Educational carousel · 8 slides', tag: 'Popular' },
                  { label: 'Quote cards · 4' },
                  { label: 'Audiogram · 60 sec', tag: 'Popular' },
                  { label: 'LinkedIn post' },
                ],
                button: { label: 'Open the carousel' },
              },
            },
            {
              label: 'Limit reached',
              text: 'The limit appears when it applies, says what’s still possible, and offers the upgrade as an option, not a wall.',
              screen: { banner: { tone: 'warning', text: 'You’ve used 2 of 2 uploads on your plan' }, title: 'Want to add another episode?', body: 'Your existing content is still yours to edit and download.', button: { label: 'See plans' }, secondary: 'Keep working on Episode 4' },
            },
          ],
        },
        {
          type: 'findings',
          title: 'Edge cases',
          items: [
            { title: 'Feeds with hundreds of episodes', text: 'Only the latest episode is processed first. Older ones are listed, ready on demand.' },
            { title: 'Long transcripts', text: 'The transcript view has copy, expand and edit, and stays readable at 10,000+ words.' },
            { title: 'No brand set yet', text: 'Outputs use clean defaults until brand colours are added, then update everywhere.' },
          ],
        },
        {
          type: 'responsive',
          title: 'Three widths, one workspace',
          brand: { bg: brand.bg, accent: brand.accent, text: brand.text },
          items: [
            { width: 1440, w: 220, label: 'Desktop', text: 'Sidebar, workspace and preview side by side.', layout: 'split' },
            { width: 768, w: 118, label: 'Tablet', text: 'Sidebar collapses to icons. Format tabs scroll sideways.', layout: 'stack' },
            { width: 390, w: 70, label: 'Phone', text: 'Bottom navigation. One format at a time, swipe between slides.', layout: 'phone' },
          ],
        },
      ],
    },

    {
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      title: 'Measured from the screens',
      lede: 'The deep purple brand colour passes easily. The mid-greys and purple-on-lavender combinations need a nudge.',
      blocks: [
        {
          type: 'contrast',
          note: 'Measured from the exported screens. Small text is smoothed in exports, so grey values are approximate.',
          items: [
            { label: 'Deep purple text', fg: '#300c68', bg: '#ffffff', ratio: 15.24, kind: 'text' },
            { label: 'White on purple button', fg: '#ffffff', bg: '#8848ff', ratio: 4.75, kind: 'text' },
            { label: 'Purple on lavender', fg: '#8848ff', bg: '#ece8ff', ratio: 3.97, kind: 'text' },
            { label: 'Body grey', fg: '#808080', bg: '#ffffff', ratio: 3.95, kind: 'text' },
          ],
          finding:
            'Body grey measures about 3.95:1 and purple text on the lavender chips about 3.97:1, both under 4.5:1 for small text. Darkening grey to #666 and using the deep purple (#300c68) for text on lavender fixes both.',
        },
        {
          type: 'findings',
          title: 'Also specified',
          confirm: true,
          items: [
            { title: 'Progress for screen readers', text: 'Processing status is announced as it changes, not only drawn as a bar.' },
            { title: 'Alt text for generated images', text: 'Each generated slide carries its own text as alt text, so exports are accessible too.' },
            { title: 'Keyboard through the tabs', text: 'Format tabs work with arrow keys.' },
          ],
        },
      ],
    },

    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      title: 'A kit built to grow',
      lede: 'A first product needs a system that takes new formats and plans without a redesign. Counted from the shipped screens.',
      blocks: [
        {
          type: 'tokens',
          items: [
            { name: 'bg/app', hex: '#f4f2ff', role: 'Sidebar and app shell' },
            { name: 'bg/card', hex: '#ffffff', role: 'Cards, panels' },
            { name: 'bg/tint', hex: '#ece8ff', role: 'Chips, selected states' },
            { name: 'line/subtle', hex: '#e6e2f5', role: 'Borders' },
            { name: 'text/brand', hex: '#300c68', role: 'Headlines' },
            { name: 'text/body', hex: '#686868', role: 'Body copy' },
            { name: 'accent/purple', hex: '#8848ff', role: 'Buttons, active nav' },
          ],
        },
        {
          type: 'components',
          note: 'Counted across the seven screens shown above, including partly visible items.',
          items: [
            { name: 'Format tab', detail: 'Icon, label, optional Popular tag', count: 14 },
            { name: 'Form field', detail: 'Label and input', count: 10 },
            { name: 'Podcast card', detail: 'Title, description, last synced, Sync', count: 6 },
            { name: 'Sidebar', detail: 'Nav, docs, support, account', count: 5 },
            { name: 'Purple button', detail: 'Primary action', count: 6 },
            { name: 'Stat tile', detail: 'Number and label', count: 6 },
          ],
          finding: 'The uploads screen says “Pro Plan has maximum of 2 uploads”. A paid plan with a lower limit than expected reads like a bug. Worth checking which plan that copy should name.',
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
          weeks: 10,
          note: 'Approximate. Replace with the real phases and weeks.',
          items: [
            { name: 'Brief and flows', start: 0, end: 2 },
            { name: 'First-run and onboarding', start: 1.5, end: 4 },
            { name: 'Content factory', start: 3, end: 7 },
            { name: 'Dashboard and settings', start: 6, end: 8.5 },
            { name: 'States and handoff', start: 7.5, end: 10 },
          ],
        },
      ],
    },

    {
      id: 'impact',
      label: 'Impact',
      eyebrow: 'Impact',
      title: 'Free users who stayed',
      blocks: [
        {
          type: 'impact',
          items: [
            { value: '~5,000', label: 'Members became active users', text: 'In the first week after launch.', confirm: true },
            { label: 'Free to paid', hint: 'e.g. share of active users who upgraded' },
          ],
          note: 'The ~5,000 is from memory, so check it against the founders’ numbers. The sign-up screen also says “Join with 20k+ users”; make sure the two figures tell the same story before an interview.',
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
            { title: 'The product is the pitch', text: 'For a new brand, a free first result convinces faster than any landing page.' },
            { title: 'Make every step skippable', text: 'Setup can always happen later. Value can’t.' },
            { title: 'Show limits where they bite', text: 'A limit next to the upload button is a nudge. A full-screen wall is a churn.' },
            { title: 'Design the wait', text: 'AI takes time. Progress with words beats a spinner.' },
          ],
        },
        {
          type: 'next',
          title: 'Where the product goes next',
          items: [
            { title: 'Auto-posting', text: 'Schedule straight to LinkedIn, Instagram and X.' },
            { title: 'Team workspaces', text: 'For producers running several shows.' },
            { title: 'Performance loop', text: 'Learn which formats perform and make more of them.' },
          ],
        },
      ],
    },

    {
      id: 'reflection',
      label: 'Reflection',
      eyebrow: 'Reflection',
      title: 'What a first product taught me',
      confirm: true,
      blocks: [{ type: 'quote', text: 'In a first product, every screen is a decision nobody made before you. The best one I made was letting people skip.' }],
    },
  ],
};

export default podtoposts;
