/*
  Joynt Delivery case study.
  Facts: Akhil's notes (solo, research to handoff, users lost after landing,
  outcomes), Joynt's platform brief, and the shipped screens
  (src/assets/project41-46.png). `confirm: true` marks reconstructions.
*/
import home from '../assets/project41.webp';
import patients from '../assets/project42.webp';
import products from '../assets/project43.webp';
import cart from '../assets/project44.webp';
import blogs from '../assets/project45.webp';
import wishlist from '../assets/project46.webp';

const brand = {
  canvas: '#f4f4f4',
  surface: '#ffffff',
  text: '#111111',
  muted: '#646464',
  accent: '#284850',
  onAccent: '#ffffff',
  line: '#e8e8e8',
  bg: '#ffffff',
};

const joynt = {
  slug: 'joynt',
  draft: false,
  number: '05',
  year: '2025',
  title: 'Joynt Delivery',
  summary:
    'The online store for cannabis dispensaries on the Joynt platform. Visitors landed and didn’t know what to do next. The redesign gives every kind of shopper an obvious first step, and sales grew 13% month on month.',
  shows: 'Untangling a regulated e-commerce flow: location, patients, medical cards and checkout',
  tags: ['Joynt', 'E-commerce', 'Cannabis retail'],
  meta: [
    { label: 'Role', value: 'Solo designer, research to handoff' },
    { label: 'Timeline', value: '2025', confirm: true },
    { label: 'Team', value: 'Joynt’s founders and engineering', confirm: true },
    { label: 'Platform', value: 'Web store · desktop and mobile · Figma', confirm: true },
  ],
  cover: home,
  coverLabel: 'joynt-home.png',

  // Short labels for the project card on the home page
  card: {
    problem: 'Shoppers lost after landing',
    did: ['Clear first step', 'Patient profiles', '4-step checkout'],
  },

  trio: {
    problem:
      'Users landed on the store and didn’t understand what to do next. In a regulated category (location rules, medical cards, patients ordering through caregivers) confusion costs sales, and competitors were winning them.',
    call: 'One obvious first step (Start Shopping), location set up front, and the regulated parts (patient, card, address) moved into a clear, numbered checkout.',
    outcome: 'Sales up 13% month on month, more active users, and the store reached #8 in search results.',
  },

  sections: [
    {
      id: 'context',
      label: 'Context',
      eyebrow: 'Context',
      title: 'Shopify, POS and compliance in one',
      lede:
        'Joynt is an all-in-one platform for cannabis dispensaries: point of sale, inventory, kiosks, signage, CRM, and the online store. I redesigned the store, where dispensary customers browse and order.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '4', label: 'Checkout steps', text: 'Cart, patient, address, payment. Regulation adds steps other stores don’t have.' },
            { value: '3', label: 'Product filters that matter', text: 'Strain type, THC and CBD levels, product type.' },
            { value: '1', label: 'Account, many patients', text: 'Caregivers order for several patients from one account.' },
          ],
        },
        {
          type: 'findings',
          title: 'What I found',
          items: [
            { title: 'No obvious first step', text: 'Visitors landed and stalled. Nothing said “start here”.' },
            { title: 'Regulation showed up as friction', text: 'Medical card details and patient info felt like random walls instead of a known part of ordering.' },
            { title: 'Caregivers were invisible', text: 'One person ordering for several patients is common in medical cannabis, and the old flow assumed one buyer.', confirm: true },
          ],
        },
        { type: 'callout', text: 'Goal: make ordering cannabis online feel as simple as any good store, without hiding the rules that make it legal.' },
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
            'Research: competitor stores, the existing flow, and where users dropped off.',
            'Information architecture: browse, product, patients, cart and checkout.',
            'Visual design and the component system.',
            'Content structure for the blog, built with search in mind.',
            'States, edge cases and developer handoff.',
          ],
        },
      ],
    },

    {
      id: 'audiences',
      label: 'Audiences',
      eyebrow: 'Audiences',
      title: 'Three shoppers, three different rules',
      lede: 'Proto-personas built from the shipped flows and the Michigan market. A working hypothesis, not formal research.',
      blocks: [
        {
          type: 'personas',
          items: [
            {
              name: 'The Patient',
              who: 'Medical card holder',
              quote: 'I know what works for my pain.',
              asks: 'Is my strain in stock, and is my card on file?',
              needs: 'Fast reorder, THC and CBD filters, saved card details.',
              leaves: 'If they re-enter medical details every order.',
              color: 'green',
            },
            {
              name: 'The Caregiver',
              who: 'Orders for several patients',
              quote: 'I order for my mother and two others.',
              asks: 'Can I keep each patient’s details separate?',
              needs: 'Multiple patients on one account, the right card per order.',
              leaves: 'If the store assumes one buyer.',
              color: 'orange',
            },
            {
              name: 'The Newcomer',
              who: 'First-time shopper',
              quote: 'Indica or sativa? No idea.',
              asks: 'What should I even buy?',
              needs: 'Plain explanations, offers, guides.',
              leaves: 'If the first screen is a wall of products.',
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
      title: 'From “now what?” to Start Shopping',
      lede: 'The old store dropped visitors into a catalogue with no guidance and surprised them with rules at checkout.',
      blocks: [
        {
          type: 'beforeAfter',
          beforeLabel: 'Before · the old store',
          afterLabel: 'After · the new flow',
          before: [
            { heading: 'Landing', items: ['No clear first action', 'Location not set', 'Nothing for first-timers'] },
            { heading: 'Ordering', items: ['Medical details asked at random points', 'One buyer per account assumed', 'Rules discovered late'] },
            { heading: 'Result', items: ['Visitors stalled after landing', 'Competitors won the sale'] },
          ],
          beforeNote: 'Described from my research notes.',
          after: [
            { label: 'Location in the header', text: 'Michigan · Change, always visible', weight: 1 },
            { label: 'Home', text: 'One promise, Start Shopping, a daily offer', weight: 2.5 },
            { label: 'Products', text: 'Strain, THC, CBD and type filters', weight: 2 },
            { label: 'Patients', text: 'Several patients per account, card on file', weight: 1.5 },
            { label: 'Checkout', text: 'Cart → Patient → Address → Payment', weight: 2 },
          ],
          changes: [
            { title: 'One first step', text: 'The home page leads with a single action, Start Shopping, plus one offer to make the first order worth it.' },
            { title: 'Location first', text: 'State is set in the header from the start, so prices, stock and rules are right before anyone browses.' },
            { title: 'Rules become steps', text: 'Patient and card details are a named, numbered step in checkout, not a surprise.' },
            { title: 'Caregivers built in', text: 'An account holder can add and edit several patients, each with their own medical card.' },
          ],
        },
      ],
    },

    {
      id: 'rules',
      label: 'Goals',
      eyebrow: 'Goals',
      title: 'Five rules for the store',
      blocks: [
        {
          type: 'rules',
          items: [
            { title: 'One obvious start', text: 'Every visitor knows the first thing to do.' },
            { title: 'Rules up front', text: 'Location and eligibility never surprise anyone at payment.' },
            { title: 'Filters in their words', text: 'Strain, THC, CBD: how buyers actually choose.' },
            { title: 'Many patients, one account', text: 'Caregivers are customers too.' },
            { title: 'Teach, then sell', text: 'Guides for newcomers that also bring in search traffic.' },
          ],
        },
      ],
    },

    {
      id: 'options',
      label: 'Options',
      eyebrow: 'Options & trade-offs',
      title: 'Three ways to land',
      lede: 'The first screen decides whether a visitor starts shopping or leaves. I explored three.',
      confirm: true,
      blocks: [
        {
          type: 'options',
          brand: { bg: '#ffffff', accent: '#284850', text: '#111111' },
          items: [
            {
              key: 'A',
              name: 'Catalogue first',
              headline: 'All products, straight away',
              pros: ['Fast for regulars', 'Fewer clicks to a product'],
              cons: ['Overwhelms newcomers', 'Location and rules come later, as surprises'],
            },
            {
              key: 'B',
              name: 'Eligibility wall',
              headline: 'Verify your card to continue',
              pros: ['Compliance handled first', 'No surprises later'],
              cons: ['Blocks browsing', 'Most visitors leave before seeing a product'],
            },
            {
              key: 'C',
              name: 'Start Shopping',
              headline: 'The Herb Connection',
              pros: ['One clear action', 'Location set in the header', 'Rules arrive as a checkout step'],
              cons: ['Regulars need one extra click', 'Checkout gets longer'],
              chosen: true,
            },
          ],
          criteria: ['Clear first step', 'Works for newcomers', 'Rules handled without surprise', 'Fast for regulars'],
          scores: { A: [1, 0, 0, 2], B: [1, 0, 2, 0], C: [2, 2, 2, 1] },
        },
      ],
    },

    {
      id: 'final',
      label: 'Final output',
      eyebrow: 'Final output',
      title: 'The store, screen by screen',
      lede: 'Pick a screen to see the shipped design.',
      blocks: [
        {
          type: 'walkthrough',
          site: 'joynt store',
          items: [
            { title: 'Home: one promise, one action', text: 'Location in the header, the promise, Start Shopping, and one daily offer.', image: home },
            { title: 'Products and filters', text: 'Strain type, THC and CBD sliders and product type, with grid and list views.', image: products },
            { title: 'Patients', text: 'An account holder adds and edits patients, each with their medical card and details.', image: patients },
            { title: 'Cart and checkout', text: 'A numbered four-step checkout, coupons and a clear price breakdown.', image: cart },
            { title: 'Wishlist', text: 'Saved products with one-tap add to cart and a reminder of the last order.', image: wishlist },
            { title: 'Blogs', text: 'Guides for newcomers, filtered by topic, written to be found in search.', image: blogs },
          ],
        },
      ],
    },

    {
      id: 'details',
      label: 'The details',
      eyebrow: 'The details',
      title: 'Where regulated orders go wrong',
      lede: 'The edge cases in this store aren’t rare. They’re the law. Each one got its own state.',
      confirm: true,
      blocks: [
        {
          type: 'flowStates',
          title: 'Ordering, five states',
          brand,
          items: [
            {
              label: 'Outside service area',
              text: 'Location is checked first, so nobody fills a cart they can’t order.',
              screen: { banner: { tone: 'warning', text: 'We don’t deliver to Ohio yet' }, title: 'Browse anyway, or change location', body: 'Prices and stock shown are for Michigan.', button: { label: 'Change location' }, secondary: 'Keep browsing' },
            },
            {
              label: 'Card expired',
              text: 'Caught at the Patient step, with the fix (upload a new card) right there.',
              screen: { eyebrow: 'Step 2 of 4 · Patient', title: 'Anna’s medical card has expired', body: 'Upload a current card to continue this order.', field: { label: 'MMJ card', value: 'Anna_MMJ_card.pdf', error: 'Expired on 01/01/2025' }, button: { label: 'Upload new card' }, secondary: 'Order for another patient' },
            },
            {
              label: 'Out of stock',
              text: 'Items that sold out while in the cart are flagged before payment, with a similar item suggested.',
              screen: {
                eyebrow: 'Step 1 of 4 · Cart',
                title: 'One item just sold out',
                list: [
                  { label: 'Cannabis Flower · 24 Karatz', tag: 'In stock', tone: 'success' },
                  { label: 'Live Rosin Jam', tag: 'Sold out', tone: 'error', muted: true },
                  { label: 'Cannabis Vape', tag: 'In stock', tone: 'success' },
                ],
                button: { label: 'Remove and continue' },
                secondary: 'See similar products',
              },
            },
            {
              label: 'Coupon applied',
              text: 'The discount shows as a line in the price breakdown, so the saving is visible.',
              screen: { banner: { tone: 'success', text: 'MAX500 applied: you saved $2.50' }, eyebrow: 'Step 1 of 4 · Cart', title: 'Total $67.09', body: '4 items · free delivery', button: { label: 'Place order' } },
            },
            {
              label: 'Order placed',
              text: 'Confirms the patient and address used, so caregivers know which order went where.',
              screen: { banner: { tone: 'success', text: 'Order placed' }, title: 'On its way to Anna Lopez', body: '123 Main Street, Anytown · arriving today', button: { label: 'Track order' } },
            },
          ],
        },
        {
          type: 'findings',
          title: 'More edge cases',
          items: [
            { title: 'Same product, many strains', text: 'Products with the same name (several “Cannabis Flower”) show strain and THC on the card so they can be told apart.' },
            { title: 'Long patient lists', text: 'Patient cards wrap into a grid and stay editable at a glance, even with ten patients.' },
            { title: 'Filters with zero results', text: 'Narrow filters suggest which one to loosen instead of showing an empty grid.' },
          ],
        },
        {
          type: 'responsive',
          brand: { bg: '#ffffff', accent: '#284850', text: '#111111' },
          items: [
            { width: 1440, w: 220, label: 'Desktop', text: 'Filters sidebar, four products a row.', layout: 'split' },
            { width: 1024, w: 164, label: 'Laptop', text: 'Three products a row. Checkout stepper stays on the left.', layout: 'split' },
            { width: 768, w: 118, label: 'Tablet', text: 'Filters move into a drawer. Stepper becomes a top bar.', layout: 'stack' },
            { width: 390, w: 70, label: 'Phone', text: 'Two products a row, sticky cart button, location in the menu.', layout: 'phone' },
          ],
        },
      ],
    },

    {
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      title: 'Measured from the screens',
      lede: 'The deep teal buttons and black text pass easily. The small orange badges and muted grey don’t.',
      blocks: [
        {
          type: 'contrast',
          note: 'Measured from the exported screens. Small text is smoothed in exports, so grey values are approximate.',
          items: [
            { label: 'Headline black', fg: '#000000', bg: '#ffffff', ratio: 21, kind: 'text' },
            { label: 'White on teal button', fg: '#ffffff', bg: '#284850', ratio: 9.85, kind: 'text' },
            { label: 'Body grey', fg: '#646464', bg: '#ffffff', ratio: 5.92, kind: 'text' },
            { label: 'Muted grey', fg: '#787878', bg: '#ffffff', ratio: 4.42, kind: 'text' },
            { label: 'White on orange NEW badge', fg: '#ffffff', bg: '#e87050', ratio: 3.06, kind: 'text' },
          ],
          finding:
            'White text on the orange NEW badges measures about 3.1:1, and the muted grey sits just under 4.5:1. Darkening the orange to around #c2502f, or using dark text on it, fixes the badges.',
        },
        {
          type: 'findings',
          title: 'Also specified',
          confirm: true,
          items: [
            { title: 'Sliders with inputs', text: 'THC and CBD ranges have number fields beside the sliders, so they work without dragging.' },
            { title: 'Steps announced', text: 'The checkout stepper says “Step 2 of 4, Patient” to screen readers.' },
            { title: 'Real labels on medical fields', text: 'Every patient field has a visible label, never just a placeholder.' },
          ],
        },
      ],
    },

    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      title: 'Built from a store kit',
      lede: 'Six screens, built from repeating parts. Counted from the shipped designs.',
      blocks: [
        {
          type: 'tokens',
          items: [
            { name: 'bg/page', hex: '#ffffff', role: 'Page background' },
            { name: 'bg/subtle', hex: '#f4f4f4', role: 'Product image wells' },
            { name: 'line/subtle', hex: '#e8e8e8', role: 'Borders, dividers' },
            { name: 'text/primary', hex: '#111111', role: 'Headlines, prices' },
            { name: 'text/body', hex: '#646464', role: 'Body copy' },
            { name: 'brand/teal', hex: '#284850', role: 'Buttons, location chip' },
            { name: 'accent/orange', hex: '#e87050', role: 'NEW badges, offers' },
            { name: 'accent/amber', hex: '#f4a460', role: 'Category chip' },
          ],
        },
        {
          type: 'components',
          note: 'Counted across the six screens shown above, including partly visible items.',
          items: [
            { name: 'Product card', detail: 'Image, badge, name, price, cart', count: 16 },
            { name: 'Form field', detail: 'Label and input', count: 11 },
            { name: 'Header', detail: 'Logo, location, search, cart, wishlist', count: 6 },
            { name: 'Patient card', detail: 'Photo, name, edit, delete', count: 4 },
            { name: 'Cart line item', detail: 'Image, name, price, quantity', count: 4 },
            { name: 'Filter group', detail: 'Checkboxes or range slider', count: 4 },
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
          weeks: 10,
          note: 'Approximate. Replace with the real phases and weeks.',
          items: [
            { name: 'Research and audit', start: 0, end: 2 },
            { name: 'Flows and structure', start: 1.5, end: 4 },
            { name: 'Visual design and kit', start: 3, end: 7 },
            { name: 'Checkout and states', start: 5.5, end: 8.5 },
            { name: 'Blog, SEO and handoff', start: 8, end: 10 },
          ],
        },
      ],
    },

    {
      id: 'impact',
      label: 'Impact',
      eyebrow: 'Impact',
      title: 'Clearer store, more orders',
      blocks: [
        {
          type: 'impact',
          items: [
            { value: '+13%', label: 'Monthly sales', text: 'Month-on-month sales growth after launch.', confirm: true },
            { value: '#8', label: 'Search ranking', text: 'The store reached 8th place in search results.', confirm: true },
            { label: 'Active users', hint: 'Went up. Add the number or percentage if you have it.' },
          ],
          note: 'Confirm whether 13% was month-on-month growth or a one-time monthly lift, and which search term the #8 ranking was for. Interviewers will ask both.',
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
            { title: 'Regulation is a design input', text: 'Rules feel fair when they’re a named step, and hostile when they’re a surprise.' },
            { title: 'Find the hidden customer', text: 'Caregivers weren’t in the brief, but they were in the orders.' },
            { title: 'One first step', text: 'A clear Start Shopping beat a clever homepage.' },
            { title: 'Content is a channel', text: 'Guides for newcomers also brought in search traffic.' },
          ],
        },
        {
          type: 'next',
          title: 'Where the store goes next',
          items: [
            { title: 'One-tap reorder', text: 'For patients who buy the same thing every month.' },
            { title: 'Delivery tracking', text: 'Ready for when Joynt’s delivery management launches.' },
            { title: 'Strain finder', text: 'A short quiz that turns “no idea” into a shortlist.' },
          ],
        },
      ],
    },

    {
      id: 'reflection',
      label: 'Reflection',
      eyebrow: 'Reflection',
      title: 'What Joynt taught me',
      confirm: true,
      blocks: [{ type: 'quote', text: 'In a regulated product, good UX doesn’t hide the rules. It turns them into steps people can follow.' }],
    },
  ],
};

export default joynt;
