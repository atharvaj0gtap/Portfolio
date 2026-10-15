/* ==========================================================================
   JagtapWorks v3 — all site copy lives here.
   Rules for this file (agreed July 2026, see voice-profile.md in repo root):
   - First person, plain language, lead with the point.
   - No em dashes, semicolons, or parenthetical asides in prose.
     (The "—" in mono chart annotations is atlas notation, not prose.)
   - Every number must be one Atharva can defend in an interview.
   - Each case study carries a "broke" note where an honest one exists.
   - Glyphs classify work like star magnitudes: ● client work · ✦ startup · ✧ experiment
   ========================================================================== */

export const GLYPHS = {
  client: '●',
  startup: '✦',
  experiment: '✧',
};

export const NOW = {
  now: 'shipping test automation at Vretta · building carbon software at Arts Factory',
  openTo: 'full-time roles in Canada',
  contact: 'atharva@jagtapworks.com',
  place: 'Vancouver, BC',
  /* Not his address: the coordinates of Polaris, the star you navigate by.
     On-concept for the atlas, and it points at nobody's apartment. */
  star: 'RA 02h 31m · Dec +89° 16′',
};

/* The hero headline, used verbatim (chosen by Atharva, Oct 2026), and the
   three measured outcomes that prove it. */
export const HERO = {
  headline: 'I build systems that take manual work off your hands.',
  proof: [
    'About 15 hours a week of email scheduling taken off a sales team, with n8n.',
    'Roughly 90% less manual carbon estimation for a Vancouver nonprofit.',
    'HR letters cut from 15 minutes to under 2, with Power Automate.',
  ],
};

/* The constellation: Atharva's real geography, one star per city, plotted
   left-to-right through time in the chart's 460×400 viewBox space. The
   chapters that happened in each place live in the hover detail, so the
   chart never mixes places with ventures. */
export const PATH_STARS = [
  { id: 'dubai',     x: 85,  y: 315, r: 2.4, label: 'Dubai — where it started',   detail: 'An HTML tutorial in 8th grade, then first internships: Tridel in 2022, GetMax in 2024.' },
  { id: 'kelowna',   x: 225, y: 195, r: 2.4, label: 'Kelowna — UBC, CS ’25',      detail: '86% average, high distinction, Dean’s List three times. Built the BFL pipeline as capstone.' },
  { id: 'vancouver', x: 370, y: 85,  r: 3.0, label: 'Vancouver — now', hot: true, detail: 'Co-founded NxtMeals here. Today: carbon software, test automation, applied AI.' },
];

const STUDIES = [
  {
    id: 'bfl',
    designation: 'JW-05',
    type: 'client',
    title: 'Insurance policy comparison, automated',
    org: 'BFL Canada',
    role: 'Full-stack developer · AI pipeline lead (capstone team of 5)',
    period: 'Sep 2024 – Apr 2025',
    oneLiner: 'An AI pipeline that catches what changed between insurance policy versions.',
    problem:
      'BFL Canada’s brokers compared long policy documents by hand to catch changed clauses. Slow, error-prone work across 100+ documents a month. Our capstone team of five spent six months building them a replacement, with brokers reviewing live demos throughout.',
    built: [
      'A React and Node.js web app with a MySQL backend that automates policy creation and side-by-side comparison.',
      'The AI discrepancy pipeline. GROBID extracts policy text to structured JSON, then Levenshtein distance plus LLM calls flag changed clauses. It caught about 90% of seeded discrepancies in our test set.',
      'End-to-end Playwright and Jest suites at roughly 60% coverage, so broker-facing flows could not silently regress between demos.',
    ],
    broke:
      'Two months in, my database schema failed. I had modelled it tightly around the first policy documents BFL gave us. When they introduced a policy type with a different structure, queries broke and nothing new could be stored. I owned the call-out, proposed a two-week spike, and we refactored to a flexible schema that handled every later request. The lesson stuck: build the schema for the documents the client hasn’t sent yet.',
    outcome:
      'Cut manual review time by roughly 80% on the document set brokers tested with.',
    stack: ['React', 'Node.js', 'MySQL', 'GROBID', 'Playwright', 'Jest'],
    links: [{ label: 'BFL Canada', href: 'https://www.bflcanada.ca/' }],
  },
  {
    id: 'artsfactory',
    designation: 'JW-02',
    type: 'client',
    title: 'Carbon accounting for the arts',
    org: 'Arts Factory Society',
    role: 'Product engineer — first technical hire',
    period: 'Oct 2025 – present',
    oneLiner: 'Software that turns material volumes into embodied-carbon numbers.',
    problem:
      'Arts Factory is a Vancouver nonprofit that needed to measure the embodied carbon of physical builds. Estimation was manual: look up emission factors, convert volumes, repeat for every material. As their first technical hire I own the product end to end, from requirements and architecture to deployment and maintenance.',
    built: [
      'A React, Vite and Tailwind app with a dynamic form system covering 18 geometric configurations for real-world objects.',
      'A five-tier Firestore data hierarchy backing a crowdsourced material library and component builder.',
      'A calculation engine that integrates the ICE embodied-carbon database and converts volume to carbon automatically, cutting manual estimation time by roughly 90%.',
    ],
    broke: null,
    outcome:
      'In production and in use. It also doubles as my working lab for the carbon and ESG domain. Disclosure rules like CSRD and California SB 253 are making this class of software mandatory, and very few engineers have shipped any.',
    stack: ['React', 'Vite', 'Tailwind', 'Firebase Firestore', 'ICE Database'],
    links: [{ label: 'Arts Factory Society', href: 'https://www.artsfactorysociety.ca/' }],
  },
  {
    id: 'vosyn',
    designation: 'JW-03',
    type: 'client',
    title: 'Sales outreach and HR paperwork, automated',
    org: 'Vosyn',
    role: 'AI engineer',
    period: 'May 2025 – Apr 2026',
    oneLiner: 'Automation that took outreach scheduling and HR letters off two teams, plus the assistant app 50+ colleagues used.',
    problem:
      'Two teams at Vosyn were doing repetitive work by hand. Sales scheduled every outreach email and follow-up manually across 500+ leads, and HR drafted each letter by hand. The company also wanted an internal AI assistant over its own documents, built on a self-hosted RAG service the platform team ran to keep that data off cloud APIs.',
    built: [
      'An n8n outreach system for the sales team, with configurable follow-up cadences, attempt thresholds, per-lead pause and resume, and a three-bin classification across 500+ active leads. It removed about 15 hours a week of manual email scheduling and cut per-campaign setup from 2 hours to under 10 minutes.',
      'A Power Automate document generator connecting Microsoft Forms, SharePoint, Excel and Word. HR letters went from 15 minutes to under 2 per request.',
      'Vosyn Insights, the React and TypeScript assistant app: 15+ components, session chat history, role-based permissions and artifact management. I built it as the client layer on the platform team’s self-hosted RAG service, from the Figma designs to a working app used by 50+ internal users.',
    ],
    broke: null,
    outcome:
      'About 15 hours a week back for the sales team, HR letters in under 2 minutes, and an assistant 50+ colleagues used.',
    stack: ['React', 'TypeScript', 'n8n', 'Power Automate', 'Google Sheets', 'SharePoint'],
    links: [{ label: 'Vosyn', href: 'https://www.vosyn.ai' }],
  },
  {
    id: 'vretta',
    designation: 'JW-01',
    type: 'client',
    title: 'Test automation for provincial assessments',
    org: 'Vretta',
    role: 'Software engineer in test',
    period: 'May 2026 – present',
    oneLiner: 'Building the first end-to-end automation framework for a large-scale e-assessment platform.',
    problem:
      'Vretta builds the e-assessment platform behind large-scale provincial assessments, including EQAO in Ontario and Alberta Education, which runs about 700,000 exams a year on it. Testing was largely manual. I am one of three engineers building the company’s first end-to-end test automation framework.',
    built: [
      'The Alberta Playwright UAT suite, built solo: typed configuration, a page object model and auth fixtures. Still in progress, it already reduces manual work for the Manual QA team and sets the template for the other jurisdictions.',
      'A Python and pandas cheat-detection pipeline that sessionizes scorer activity and flags anomalous behaviour across 2.5 million log rows in 3 to 5 minutes. Deployed as a reusable team tool.',
      'Found and fixed a silent row-drop defect in an AI-driven log-splitting process on a 2M+ row dataset. Rebuilt it as a lossless, time-sorted batching pipeline.',
      'Reported two real security holes: an answer-ID exposure in the developer console and a multi-tab test exploit. Both confirmed and fixed by the platform team.',
    ],
    broke: null,
    outcome:
      'Assessment is a trust business. My job is making sure the software that scores students does not quietly get it wrong.',
    stack: ['Playwright', 'TypeScript', 'Python', 'pandas', 'AWS CloudWatch'],
    links: [{ label: 'Vretta', href: 'https://www.vretta.com' }],
  },
  {
    id: 'nxtmeals',
    designation: 'JW-04',
    type: 'startup',
    title: 'NxtMeals: a startup, start to finish',
    org: 'Co-founded with Siddharth Jain',
    role: 'Co-founder & CTO',
    period: 'Aug 2024 – Jan 2026',
    oneLiner: 'Meal savings for students, a pivot to food trucks, and a clean shutdown in 2026.',
    problem:
      'Food was getting painfully expensive for students. My co-founder and I set out to make meal planning smarter, more accessible and more affordable. I learned that the problem you assume is rarely the one you find.',
    built: [
      'Ran the customer discovery myself: 100+ student surveys and three focus groups at UBC. The surprise was that meal-planning time and missing loyalty rewards at independent grocers hurt as much as price.',
      'Built and launched an MVP prototype in weeks, deliberately on Wix since we were validating rather than engineering. It pulled 50+ beta signups in three weeks around a 2% cashback model.',
      'Designed an analog-first pilot with local grocers: 50 numbered loyalty cards and receipt photos instead of a POS integration. A six-month technical problem reduced to a launchable experiment.',
      'Pivoted to test a direct marketing service for food trucks, reaching out across Greater Vancouver to see if we could drive them customer traffic. That phase alone taught me more about outbound sales, market saturation and founder resilience than any classroom.',
    ],
    broke:
      'The company itself. We brought NxtMeals to a close in January 2026. What we kept: proving assumptions instead of trusting them, pitching, negotiating, iterating, handling rejection, and operating lean with limited capital. There is a difference between studying entrepreneurship and doing it. We got to do it.',
    outcome:
      '50+ beta signups, a grocer pilot design, a food-truck experiment, and the best product education I have had.',
    stack: ['Customer discovery', 'Wix', 'Figma', 'Firestore'],
    links: [{ label: 'NxtMeals', href: 'https://linktr.ee/nxtmeals' }],
  },
];

/* Displayed newest first: recency is what a visitor scans for. Designations
   match the display order, JW-01 being the most recent. */
const STUDY_ORDER = ['vretta', 'artsfactory', 'vosyn', 'nxtmeals', 'bfl'];
export const CASE_STUDIES = STUDY_ORDER.map(id => STUDIES.find(s => s.id === id));

/* ✧ Experiments — the archive. A plate, a couple of honest sentences, a link.
   The first five show by default. Items marked deep: true live behind the
   "view full archive" toggle, so the section stays curated without losing
   anything. image: null renders a ✧ placeholder plate. */
export const EXPERIMENTS = [
  {
    title: 'Duely',
    image: '/assets/projects/Duely.webp',
    description:
      'Time tracking and invoicing for contractors. Log hours, and multi-page PDF invoices generate themselves against configurable pay periods. Built with React 19 and Express, fully local: your data never leaves your machine.',
    href: 'https://github.com/atharvaj0gtap/Duely',
  },
  {
    title: 'Jersey number recognition',
    image: '/assets/projects/Jersey.webp',
    description:
      'A deep-learning pipeline that reads jersey numbers in sports footage. I rebuilt the legibility classifier with heavier augmentations and MixUp soft targets, lifting accuracy by 18% and cutting illegible-frame false positives by 25%.',
    href: 'https://github.com/MahmoudOsama97/jersey-number-pipeline_PlusPlus',
  },
  {
    title: 'Adaptive bubble cursor',
    image: '/assets/projects/HCI.webp',
    description:
      'A Unity cursor that resizes itself in dense, moving target fields. I ran a controlled study with 20 participants across four scenarios: 47% fewer selection errors and 12% faster target acquisition, p < .01.',
    href: 'https://github.com/atharvaj0gtap/COSC-441-Group-5',
  },
  {
    title: 'Alberta wildfire networks',
    image: '/assets/projects/Wildfire.webp',
    description:
      'Network analysis of Alberta wildfire events in R using Louvain, DBSCAN and K-Means. Found 69 distinct fire communities, with major fires acting as hubs that connect a quarter of the smaller clusters.',
    href: 'https://github.com/atharvaj0gtap/Network-Science-Team-4',
  },
  {
    title: 'This site',
    image: '/assets/projects/SiteThumb.webp',
    description:
      'The page you are reading. A star atlas with a day and a night mode, built with React and Vite and served free on Cloudflare Pages. The design, the copy and the constellation mark are all custom work.',
    href: 'https://github.com/atharvaj0gtap/Portfolio',
  },
  {
    title: 'AI trend analysis',
    image: '/assets/projects/AI.webp',
    deep: true,
    description:
      'A Python pipeline over the AI-Powered Job Market Insights dataset: 500 roles across 50+ countries. Ten-plus visualizations and a report on where AI hits jobs hardest, presented to an academic audience.',
    href: 'https://github.com/atharvaj0gtap/AI-Trend-Analysis',
  },
  {
    title: 'Learning Layers',
    image: '/assets/projects/LearningLayers.webp',
    deep: true,
    description:
      'An e-learning platform built by a five-person team across eight two-week sprints. I ran sprint planning, built the Node and Express APIs over MongoDB, and shipped the React enrollment and assignment modules.',
    href: 'https://github.com/dabby04/TheLearningLayers',
  },
  {
    title: 'ShelterFinder',
    image: '/assets/projects/ShelterFinder.webp',
    deep: true,
    description:
      'An Android app listing emergency shelters for people displaced by wildfires, with Google Maps geolocation and routing. Built in Java and tested in simulated disaster drills.',
    href: 'https://github.com/atharvaj0gtap/ShelterFinderApp',
  },
  {
    title: 'World happiness analysis',
    image: '/assets/projects/WorldHappiness.webp',
    deep: true,
    description:
      'Regression and cluster analysis on decades of World Happiness Index data from 150+ countries. Five determinants explained 65% of score variance. Interactive Tableau dashboard included.',
    href: 'https://github.com/ubco-W2022T1-cosc301/project-group41',
  },
  {
    title: 'SwiftShopper',
    image: '/assets/projects/SwiftShopper.webp',
    deep: true,
    description:
      'A full-stack Java store with real-time order status and one-click checkout. Early coursework, but the UML-modelled schema and embedded SQL were mine end to end.',
    href: 'https://github.com/atharvaj0gtap/Web-development',
  },
];

export const ABOUT = {
  paragraphs: [
    'I started coding in 8th grade with a basic HTML tutorial. I didn’t know it then, but I was hooked on a specific kind of problem: taking something abstract and turning it into something people can actually use. About a decade later, that’s still the whole job.',
    'I studied Computer Science at UBC, class of 2025 with high distinction. The education I trust most happened outside lecture halls. Two Dubai internships taught me what shipping for real stakeholders feels like. Co-founding NxtMeals taught me that the customer’s real problem is rarely the one you assumed. Building the assistant client on top of Vosyn’s RAG service taught me how much of an AI product is the plumbing around the model.',
    'Right now I split my weeks between test automation for provincial assessment platforms at Vretta and carbon-accounting software at Arts Factory. The thread through all of it: find the work people do by hand, then build the system that does it for them. Usually that work has consequences. Grades, insurance policies, emissions numbers. A system that saves time but gets those wrong is worse than the manual process it replaced. That’s also why I’m going deep on applied AI. Most AI demos die on contact with production, and I want to be the person whose systems don’t.',
    'If I had to pick one word: disciplined. I show up, I finish what I start, and I write down what broke so it doesn’t break twice.',
  ],
  offDuty:
    'Off duty: gym and basketball, books on finance and behavioural economics, cooking, and stargazing. The stargazing explains a few things about this site.',
  credentials: 'Microsoft Certified: Azure Fundamentals · Dean’s List ×3 · Deputy Vice-Chancellor Scholarship',
};

/* Certifications for the footer modal. Dean's List and the scholarship stay
   in the About credentials line: they are awards, not certifications. */
export const CERTIFICATIONS = [
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    detail: 'Cloud concepts, Azure architecture and services, management and governance.',
  },
  {
    name: 'Data Analytics Essentials',
    issuer: 'Cisco',
    detail: 'Data characteristics, acquisition and transformation with Excel, SQL and Tableau.',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    detail: 'Global cyber threats, vulnerabilities, threat detection and defense.',
  },
  {
    name: 'Database Web Development Badge',
    issuer: 'UBC · Dr. Ramon Lawrence',
    detail: 'Awarded for a top web development project in COSC 304: Introduction to Databases.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'His professionalism, combined with his eagerness to learn and adapt, makes him an invaluable asset to any organization.',
    name: 'Pankaj Jain',
    role: 'CEO, GetMax.ae',
    href: 'https://www.linkedin.com/in/rightpankaj/',
  },
  {
    quote:
      'His technical expertise and problem-solving mindset have been instrumental in bringing our vision to life.',
    name: 'Siddharth Jain',
    role: 'Co-founder & CEO, NxtMeals',
    href: 'https://www.linkedin.com/in/siddharthsj/',
  },
];
