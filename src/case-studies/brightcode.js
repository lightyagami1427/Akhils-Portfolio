/*
  BrightCode Agency case study.
  Facts: Akhil's notes (problem, solo role, outcomes), BrightCode's positioning,
  and the shipped screens (src/assets/project47-51.png). `confirm: true` marks
  reconstructions for Akhil to check. Set `draft: false` once confirmed.
*/
import hero from '../assets/project48.webp';
import audiences from '../assets/project47.webp';
import services from '../assets/project49.webp';
import contact from '../assets/project50.webp';
import closing from '../assets/project51.webp';

const brand = {
  canvas: '#eef0f6',
  surface: '#ffffff',
  text: '#000c20',
  muted: '#606874',
  accent: '#0050ff',
  onAccent: '#ffffff',
  line: '#e4e4e8',
  bg: '#f8f8fc',
};

const brightcode = {
  slug: 'brightcode',
  draft: false,
  number: '02',
  year: '2025',
  title: 'BrightCode Agency',
  summary:
    'A website for a white-label development studio that couldn’t show its best work. The redesign sells the process instead, and turned the site into the studio’s best salesperson.',
  shows: 'Building proof for a services company whose clients can’t be named',
  tags: ['BrightCode', 'Services', 'Website redesign'],
  meta: [
    { label: 'Role', value: 'Solo designer, research to handoff' },
    { label: 'Timeline', value: '2025', confirm: true },
    { label: 'Team', value: 'Me, with BrightCode’s founders and developers', confirm: true },
    { label: 'Platform', value: 'Web · desktop and mobile · Figma', confirm: true },
  ],
  cover: hero,
  coverLabel: 'brightcode-home.png',

  // Short labels for the project card on the home page
  card: {
    problem: 'Dated site, no proof of work',
    did: ['Positioning', 'Process as proof', 'Booking flow'],
  },

  trio: {
    problem:
      'BrightCode builds sites for agencies, but its own site looked dated and showed nothing a buyer could trust. For a services company, the website is the proof, and theirs was working against them.',
    call: 'Stop asking visitors to imagine the work. Show how BrightCode works: the pipeline, the QA, the handoff. Then make booking a call the obvious next step.',
    outcome: '4–5 new projects within two months of launch, calls scheduled up 23%, and existing clients stayed.',
  },

  sections: [
    {
      id: 'context',
      label: 'Context',
      eyebrow: 'Context',
      title: 'A studio that works in the shadows',
      lede:
        'BrightCode is a white-label web studio. Agencies and marketing teams win the client; BrightCode builds the site under the agency’s brand. That model has one awkward side effect: the best work can’t carry BrightCode’s name.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '3', label: 'Kinds of buyer', text: 'Creative agencies, marketing teams, and teams with too much on their plate.' },
            { value: '0', label: 'Projects it could name', text: 'White-label work belongs to the agency. The usual portfolio grid was off the table.' },
            { value: '1', label: 'Action that matters', text: 'Book a call. Every section had to lead there.' },
          ],
        },
        {
          type: 'findings',
          title: 'What I found',
          items: [
            { title: 'The site undersold the studio', text: 'The old site looked dated next to the agencies it was selling to, so the first impression contradicted the pitch.' },
            { title: 'No proof anywhere', text: 'No process, no examples, no reason to believe. Visitors had to take quality on trust.' },
            { title: 'The real fear is reputation', text: 'An agency hiring a dev partner isn’t buying code. It’s protecting its name with its own client.', confirm: true },
          ],
        },
        { type: 'callout', text: 'Goal: make a studio that can’t show its clients look like the safest pair of hands an agency could hire.' },
      ],
    },

    {
      id: 'role',
      label: 'My role',
      eyebrow: 'My role',
      title: 'Solo, from research to handoff',
      blocks: [
        {
          type: 'list',
          items: [
            'Research: the old site, the buyers, and how competing studios present themselves.',
            'Positioning and page structure, with the founders.',
            'Visual design: layout, illustration style and the process diagrams.',
            'Responsive layouts, form states and developer handoff.',
          ],
        },
      ],
    },

    {
      id: 'audiences',
      label: 'Audiences',
      eyebrow: 'Audiences',
      title: 'Three buyers, one fear',
      lede: 'Proto-personas, built from the three audiences BrightCode serves and my conversations with the team. A working hypothesis, not formal research.',
      blocks: [
        {
          type: 'personas',
          items: [
            {
              name: 'The Agency Owner',
              who: 'Creative and brand agencies',
              quote: 'If the build is bad, it’s my name on it.',
              asks: 'Will you make me look good in front of my client?',
              needs: 'Proof of quality, a clear process, someone senior on calls.',
              leaves: 'If the studio’s own site looks worse than their work.',
              color: 'blue',
            },
            {
              name: 'The Marketing Lead',
              who: 'Marketing and digital teams',
              quote: 'I need it live before the campaign.',
              asks: 'How fast, and who handles SEO and the CMS?',
              needs: 'Timelines, services listed plainly, a quick way to talk.',
              leaves: 'If booking a call takes more than one click.',
              color: 'green',
            },
            {
              name: 'The Stretched Team',
              who: 'Teams with too much on their plate',
              quote: 'We need hands, not a new agency.',
              asks: 'Can you plug into our stack and process?',
              needs: 'The tech they use, how handoff works, flexible scope.',
              leaves: 'If it reads like they’ll have to start over.',
              color: 'violet',
            },
          ],
        },
      ],
    },

    {
      id: 'before',
      label: 'Before & after',
      eyebrow: 'Before & after',
      title: 'From “trust us” to “here’s how”',
      lede: 'The old site described services. The new one demonstrates them.',
      blocks: [
        {
          type: 'beforeAfter',
          beforeLabel: 'Before · the old site',
          afterLabel: 'After · the new page',
          before: [
            { heading: 'What it said', items: ['We build websites', 'A list of services', 'A contact page'] },
            { heading: 'What was missing', items: ['Any proof of quality', 'How the team works', 'Who it’s for', 'A reason to book now'] },
            { heading: 'How it felt', items: ['Dated next to the agencies it sold to', 'Generic, could be any studio'] },
          ],
          beforeNote: 'Described from my audit of the old site.',
          after: [
            { label: 'Hero', text: 'Protect your reputation, plus the delivery pipeline', weight: 3 },
            { label: 'Who we help', text: 'Agencies, marketing teams, stretched teams', weight: 2 },
            { label: 'What we build', text: 'White-label builds, legacy rescue, scalable teams', weight: 2 },
            { label: 'Contact', text: 'Short form, next to the reasons to send it', weight: 1.5 },
            { label: 'Closing call to action', text: 'One last, calm ask', weight: 1 },
          ],
          changes: [
            { title: 'Sell the fear, not the feature', text: '“Protect your reputation. Not just your website.” speaks to what agencies actually lose when a build goes wrong.' },
            { title: 'Process as proof', text: 'The hero shows the delivery pipeline (commits, QA, production stability) instead of client logos the studio can’t use.' },
            { title: 'Name the buyer', text: 'Three cards say who BrightCode is for, so each visitor sees themselves in the first scroll.' },
            { title: 'One action, repeated', text: 'Book a 30-minute call in the hero, Contact us in the nav, the form and the closing banner.' },
          ],
          note: 'If an archived copy of the old bright-code.io exists (the Wayback Machine often has one), swap a screenshot in here for a true screen-to-screen comparison.',
        },
      ],
    },

    {
      id: 'rules',
      label: 'Goals',
      eyebrow: 'Goals',
      title: 'Five rules for the site',
      blocks: [
        {
          type: 'rules',
          items: [
            { title: 'Look better than the buyer', text: 'The site has to out-design the agencies it sells to.' },
            { title: 'Show, don’t claim', text: 'Every promise gets a visual of how it’s kept.' },
            { title: 'Say who it’s for', text: 'Agencies should recognise themselves in seconds.' },
            { title: 'One door', text: 'Every section ends at the same action: book a call.' },
            { title: 'No names needed', text: 'Proof that works without showing a single client.' },
          ],
        },
      ],
    },

    {
      id: 'options',
      label: 'Options',
      eyebrow: 'Options & trade-offs',
      title: 'Three ways to prove it',
      lede: 'The hero had to do the job a portfolio usually does. I explored three directions.',
      confirm: true,
      blocks: [
        {
          type: 'options',
          brand: { bg: brand.bg, accent: brand.accent, text: brand.text },
          items: [
            {
              key: 'A',
              name: 'Portfolio first',
              headline: 'Work we’re proud of',
              pros: ['The classic proof', 'Visual and quick to scan'],
              cons: ['White-label work can’t be shown', 'An empty grid hurts more than no grid'],
            },
            {
              key: 'B',
              name: 'Services menu',
              headline: 'Web design, development, SEO, CMS',
              pros: ['Clear what they sell', 'Easy to maintain'],
              cons: ['Every studio says the same', 'No reason to trust this one'],
            },
            {
              key: 'C',
              name: 'Promise and process',
              headline: 'Protect your reputation. Not just your website.',
              pros: ['Speaks to the agency’s real fear', 'Process is proof that needs no client names'],
              cons: ['Diagrams need care to stay readable', 'Asks visitors to read a little'],
              chosen: true,
              twoButtons: true,
            },
          ],
          criteria: ['Builds trust without names', 'Different from other studios', 'Leads to booking a call', 'Easy to keep current'],
          scores: { A: [0, 1, 1, 0], B: [0, 0, 1, 2], C: [2, 2, 2, 2] },
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
          site: 'bright-code.io',
          items: [
            { title: 'Hero: the promise and the pipeline', text: 'The reputation promise, a one-line answer to “what do you do”, and the delivery pipeline drawn as the proof. Book a 30-minute call is the first button.', image: hero },
            { title: 'Who we’re here to help', text: 'Creative agencies, marketing teams, and teams with too much on their plate, each with an illustration of how BrightCode fits in.', image: audiences },
            { title: 'What we actually build', text: 'White-label builds, legacy rescue and scalable teams, shown as small diagrams of the work rather than stock photos.', image: services },
            { title: 'Contact', text: 'A short form beside the reasons to send it, with the four outcomes BrightCode delivers underneath.', image: contact },
            { title: 'Closing banner and footer', text: 'One calm final ask, then a footer that maps every service and tool.', image: closing },
          ],
        },
      ],
    },

    {
      id: 'details',
      label: 'The details',
      eyebrow: 'The details',
      title: 'The form is the product',
      lede: 'For a services site, the contact form is where revenue starts, so every state of it was designed.',
      confirm: true,
      blocks: [
        {
          type: 'flowStates',
          title: 'Contact form, five states',
          brand,
          items: [
            {
              label: 'Default',
              text: 'Short and friendly. Only what the team needs to reply well.',
              screen: { eyebrow: 'Contact', title: 'Tell us about the project', field: { label: 'Work email', placeholder: 'you@agency.com' }, button: { label: 'Send message' } },
            },
            {
              label: 'Invalid email',
              text: 'The error says what’s wrong and how to fix it, right under the field, and the input is kept.',
              screen: { eyebrow: 'Contact', title: 'Tell us about the project', field: { label: 'Work email', value: 'sam@agency', error: 'This email is missing its ending, like .com' }, button: { label: 'Send message' } },
            },
            {
              label: 'Sending',
              text: 'The button keeps its size and shows progress, so nobody clicks twice.',
              screen: { eyebrow: 'Contact', title: 'Tell us about the project', field: { label: 'Work email', value: 'sam@agency.com' }, button: { label: 'Sending…', loading: true } },
            },
            {
              label: 'Sent',
              text: 'Confirms what happens next and when, and offers the faster route: booking a call directly.',
              screen: { banner: { tone: 'success', text: 'Message sent' }, title: 'Thanks, Sam. We’ll reply within one working day.', body: 'Want to talk sooner? Pick a time that suits you.', button: { label: 'Book a 30-minute call' } },
            },
            {
              label: 'Send failed',
              text: 'If the network fails, the message is kept and there’s a direct email as a fallback.',
              screen: { banner: { tone: 'error', text: 'We couldn’t send that. Your message is saved.' }, title: 'Tell us about the project', field: { label: 'Work email', value: 'sam@agency.com' }, button: { label: 'Try again' }, secondary: 'Or email contact@bright-code.io' },
            },
          ],
        },
        {
          type: 'findings',
          title: 'Edge cases',
          items: [
            { title: 'Diagrams on small screens', text: 'The pipeline in the hero is simplified to three steps on mobile, so it stays readable instead of shrinking.' },
            { title: 'Long agency names', text: 'Form fields and confirmation copy were tested with long names and email addresses.' },
            { title: 'Personal emails', text: 'The form accepts them. Rejecting Gmail would turn away freelancers who become agency partners.' },
          ],
        },
        {
          type: 'responsive',
          brand: { bg: brand.bg, accent: brand.accent, text: brand.text },
          items: [
            { width: 1440, w: 220, label: 'Desktop', text: 'Promise left, pipeline right. Audience cards three across.', layout: 'split' },
            { width: 1024, w: 164, label: 'Laptop', text: 'Pipeline narrows. Cards stay three across.', layout: 'split' },
            { width: 768, w: 118, label: 'Tablet', text: 'Pipeline moves under the headline. Cards two plus one.', layout: 'stack' },
            { width: 390, w: 70, label: 'Phone', text: 'Pipeline becomes three steps. Book a call stays visible.', layout: 'phone' },
          ],
        },
      ],
    },

    {
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      title: 'Measured from the screens',
      lede: 'The headline, button and body colours pass comfortably. The light grey used for small descriptions doesn’t.',
      blocks: [
        {
          type: 'contrast',
          note: 'Measured from the exported screens. Small text is smoothed in exports, so grey values are approximate.',
          items: [
            { label: 'Headline navy', fg: '#000c20', bg: '#ffffff', ratio: 19.56, kind: 'text' },
            { label: 'Accent blue text', fg: '#0050ff', bg: '#ffffff', ratio: 5.85, kind: 'text' },
            { label: 'White on blue button', fg: '#ffffff', bg: '#0050ff', ratio: 5.85, kind: 'text' },
            { label: 'Body grey', fg: '#606874', bg: '#ffffff', ratio: 5.63, kind: 'text' },
            { label: 'Light description grey', fg: '#8c909c', bg: '#ffffff', ratio: 3.19, kind: 'text' },
          ],
          finding: 'The small grey descriptions under the feature icons measure about 3.2:1, under the 4.5:1 AA minimum for body text. Darkening them to the body grey (#606874) fixes it with no visible change in hierarchy.',
        },
        {
          type: 'findings',
          title: 'Also specified',
          confirm: true,
          items: [
            { title: 'Labels, not placeholders', text: 'Every form field has a visible label above it, so the hint doesn’t vanish on typing.' },
            { title: 'Errors in words', text: 'Errors are written out, not shown by a red border alone.' },
            { title: 'Focus you can see', text: 'A clear blue ring on every link, button and field.' },
          ],
        },
      ],
    },

    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      title: 'A small, strict kit',
      lede: 'Five screens, built from a handful of parts. Counted from the shipped designs.',
      blocks: [
        {
          type: 'tokens',
          items: [
            { name: 'bg/page', hex: '#f8f8fc', role: 'Page background' },
            { name: 'bg/card', hex: '#ffffff', role: 'Cards and form' },
            { name: 'line/subtle', hex: '#e4e4e8', role: 'Borders, dividers' },
            { name: 'text/primary', hex: '#000c20', role: 'Headlines' },
            { name: 'text/body', hex: '#606874', role: 'Body copy' },
            { name: 'accent/blue', hex: '#0050ff', role: 'Buttons, highlights' },
            { name: 'accent/sky', hex: '#0080ff', role: 'Gradients, diagrams' },
            { name: 'bg/inverse', hex: '#000c20', role: 'Closing banner' },
          ],
        },
        {
          type: 'components',
          note: 'Counted across the five screens shown above, including cards cut off at the edge.',
          items: [
            { name: 'Pill button', detail: 'Blue filled and grey secondary', count: 7 },
            { name: 'Service card', detail: 'Illustration, title, text, link', count: 7 },
            { name: 'Form field', detail: 'Label above input', count: 5 },
            { name: 'Text link', detail: '“Learn more” with chevron', count: 5 },
            { name: 'Feature item', detail: 'Icon, title, one line', count: 4 },
            { name: 'Eyebrow chip', detail: 'Small label above a section', count: 2 },
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
          weeks: 8,
          note: 'Approximate. Replace with the real phases and weeks.',
          items: [
            { name: 'Research and audit', start: 0, end: 1.5 },
            { name: 'Positioning and structure', start: 1, end: 3 },
            { name: 'Visual design', start: 2.5, end: 6 },
            { name: 'Responsive and states', start: 5, end: 7 },
            { name: 'Handoff and QA', start: 6.5, end: 8 },
          ],
        },
      ],
    },

    {
      id: 'impact',
      label: 'Impact',
      eyebrow: 'Impact',
      title: 'The site started selling',
      blocks: [
        {
          type: 'impact',
          noteConfirm: false,
          items: [
            { value: '4–5', label: 'New projects', text: 'Signed within two months of the new site going live.' },
            { value: '+23%', label: 'Calls scheduled', text: 'More discovery calls booked through the site.' },
            { value: 'High', label: 'Client retention', text: 'Existing clients stayed on after the relaunch.', confirm: true },
          ],
          note: 'Retention has no figure yet. Add one if BrightCode tracked it, or keep it as a quote from the founders.',
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
            { title: 'Process is proof', text: 'When you can’t show the work, show how the work gets done.' },
            { title: 'Sell the fear you remove', text: 'Agencies weren’t buying websites. They were buying peace of mind.' },
            { title: 'A services site is a sales call', text: 'Every section should answer an objection the founder hears on calls.' },
            { title: 'Design the form like a product', text: 'Five states, not one. That’s where leads are won or lost.' },
          ],
        },
        {
          type: 'next',
          title: 'Where the site goes next',
          items: [
            { title: 'Anonymised case studies', text: 'Real projects, with the client’s industry instead of their name.' },
            { title: 'Embedded booking', text: 'Pick a time without leaving the page.' },
            { title: 'Free audit offer', text: 'A low-commitment first step for cautious agencies.' },
          ],
        },
      ],
    },

    {
      id: 'reflection',
      label: 'Reflection',
      eyebrow: 'Reflection',
      title: 'What BrightCode taught me',
      confirm: true,
      blocks: [
        { type: 'quote', text: 'A services company’s website isn’t a brochure. It’s the first piece of work the client ever sees from you.' },
      ],
    },
  ],
};

export default brightcode;
