export type Section = {
  label: string;
  heading: string;
  body: string[];
  bullets?: string[];
  footnote?: string; // optional closing line rendered after the bullets
  bulletStyle?: "list" | "grid";
  stats?: { value: number; prefix?: string; suffix?: string; label: string; tone?: "positive" | "negative" }[]; // tone omitted = neutral (terracotta)
  image?: string | string[];
  captions?: string[]; // parallel to image[]; short labels shown under each device/image
  cropOffsets?: number[]; // parallel to image[]; for "laptop-trio" — fraction of image height to shift up so the frame opens on the distinctive region (0 = top)
  compareLabels?: [string, string]; // [before, after] chip labels for imageAspect "before-after"
  imageAspect?: "portrait" | "page" | "laptop" | "screenshot" | "scattered" | "landscape-portrait" | "annotated-comparison" | "screenshots" | "map" | "feature-panorama" | "phone-trio" | "before-after" | "page-trio" | "laptop-trio" | "ia-comparison"; // portrait = phone, page = full-height, screenshot = natural size, scattered = overlapping rotated cards, landscape-portrait = stacked mixed orientations, annotated-comparison = before/after with metric callouts, screenshots = multiple stacked at natural size, before-after = labelled old→new comparison, page-trio = three page-tops side by side with captions, laptop-trio = three screens each in a laptop frame with captions, ia-comparison = built tangled→clean IA node diagram, default = 16:9
  showcase?: "design-system" | "lhc-journey" | "lhc-components" | "lhc-blocks" | "lhc-rows" | "lhc-before-after" | "iq-cardsort"; // renders a built visual instead of an image
  dark?: boolean;
};

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  subtitle: string;
  tools: string[];
  heroImage?: string;
  heroImageStyle?: "phone";
  heroShowcase?: "lhc-ds" | "lhc-web" | "iq-ia"; // renders a bespoke coded hero instead of heroImage
  /** Small note shown under the hero — e.g. that on-screen data/metrics are illustrative. */
  disclaimer?: string;
  sections: Section[];
  learnings: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "everyday-banking",
    company: "Nedbank",
    title: "Reimagining Everyday Banking",
    subtitle:
      "Simplifying the onboarding journey for personal banking products — creating faster, clearer, and more human experiences.",
    tools: ["Figma", "Maze", "Sketch", "InVision"],
    heroImage: "/images/EDB_creditcard-27main Copy.webp",
    sections: [
      {
        label: "Discover",
        heading: "The Challenge — \"The Old Experience\"",
        body: [
          "The onboarding experience for Nedbank's Everyday Banking products had become outdated and overcomplicated.",
          "Clients faced too many screens, irrelevant upsells, and confusing cross-sells that made the process feel more transactional than human.",
          "Application times were long. Drop-offs were high. Trust was low.",
        ],
        image: "/images/Screenshot 2020-09-14 at 13.12 3.png",
        imageAspect: "screenshot",
      },
      {
        label: "Define",
        heading: "Research & Insights — \"Understanding the Pain\"",
        body: [
          "To understand where friction lived, I mapped the full user journey and conducted user testing on the existing flows.",
          "Pain points emerged quickly:",
        ],
        bullets: [
          "Unclear steps",
          "Excessive screens",
          "Confusing product offers",
          "A lack of visible progress",
        ],
        footnote: "Clients didn't feel guided — they felt pushed.",
        image: "/images/iMac - 2.png",
        imageAspect: "laptop",
      },
      {
        label: "Design",
        heading: "The Design Approach — \"Simplify to Clarify\"",
        body: [
          "I rebuilt the journey from the ground up — removing redundancy, merging steps, and stripping out unnecessary offers.",
          "Each screen had to earn its place.",
          "Using low-fidelity wireframes, I restructured the process around user intent, not business convenience.",
        ],
        image: "/images/PL standalon choice- PL standalone selected.png",
        imageAspect: "laptop",
      },
      {
        label: "Deliver",
        heading: "The Solution — \"Designing for Ease and Trust\"",
        body: [],
        bullets: [
          "The new onboarding flow cut down steps, clarified progress, and reduced friction.",
          "Value-added offers were repositioned to appear after key tasks, ensuring clients felt supported — not sold to.",
          "The UI adopted Nedbank's growing design system, creating consistency across products and platforms.",
        ],
        image: "/images/EDB_creditcard-27main Copy.webp",
        imageAspect: "laptop",
      },
      {
        label: "Results",
        heading: "Impact",
        body: [
          "The redesigned onboarding process helped bring focus back to what mattered: the client's goal.",
        ],
        bullets: [
          "Reduced friction",
          "Improved task clarity",
          "Established reusable patterns for future product flows",
        ],
        bulletStyle: "grid",
        image: "/images/iMac - 1.png",
        imageAspect: "laptop",
        dark: true,
      },
    ],
    learnings: [
      "This project reminded me that clarity isn't about fewer clicks — it's about fewer doubts.",
      "Good UX is invisible: it makes complex processes feel effortless.",
      "The success of this redesign became the foundation for all future Nedbank onboarding journeys.",
    ],
  },
  {
    slug: "business-banking",
    company: "Nedbank",
    title: "Designing for Scale, Precision, and Trust",
    heroImage: "/images/nedbank-dashboard.png.png",
    subtitle:
      "Reimagining key corporate banking features within Nedbank's NetBank Business Hub — optimising usability for high-stakes users managing global accounts and trade operations.",
    tools: ["Figma", "Sketch", "InVision"],
    sections: [
      {
        label: "Discover",
        heading: "The Challenge — \"When Banking Gets Big\"",
        body: [
          "Corporate clients don't have time for friction.",
          "They manage complex portfolios, global transactions, and trade documentation daily — any inefficiency costs time and trust.",
          "Our challenge was to redesign critical banking features in the NetBank Business Hub to simplify workflows, improve visibility, and enhance control for enterprise users handling millions in movement.",
        ],
        image: "/images/process map 2.png",
        imageAspect: "page",
      },
      {
        label: "Define",
        heading: "Research & Insights — \"Understanding the Corporate Mindset\"",
        body: [
          "We conducted stakeholder interviews and user feedback sessions with treasury managers, finance officers, and global trade specialists.",
          "They didn't want flashy design — they wanted clarity, reliability, and control. From these sessions, three core needs emerged:",
        ],
        bullets: [
          "Visibility — Quick access to balances, rates, and documentation.",
          "Efficiency — Streamlined, step-light processes for recurring tasks.",
          "Confidence — Every action should feel precise and traceable.",
        ],
        image: "/images/Screenshot 2026-04-01 at 14.23.39 1.webp",
        imageAspect: "laptop",
      },
      {
        label: "Design",
        heading: "Design Approach — \"Complexity, Organised Beautifully\"",
        body: [
          "I mapped the user journeys for each core feature, identifying friction-heavy moments in navigation, form completion, and data visibility.",
          "The solution was to design with hierarchical clarity — guiding users through complexity without oversimplifying their power.",
          "I structured information into clear, digestible views that let users complete tasks faster and with confidence.",
        ],
        image: "/images/image 4 prototpye.webp",
        imageAspect: "laptop",
      },
      {
        label: "Deliver",
        heading: "The Solution — \"Precision Tools for Power Users\"",
        body: [
          "The redesigned features within the Business Hub transformed the experience from dense and mechanical to structured and intuitive.",
        ],
        bullets: [
          "Global Transactional Accounts — Simplified dashboard views for multiple currencies and real-time conversion summaries.",
          "Global Documentary Trade — Streamlined document uploads and status tracking, reducing confusion and processing delays.",
          "Call & Term Investment Accounts — Interactive comparison tables for rates and durations, helping corporate users make quick, informed decisions.",
        ],
        image: ["/images/image 6.webp", "/images/image 7.webp", "/images/image 8.webp"],
        captions: ["Global Transactional Accounts", "Global Documentary Trade", "Call & Term Investment Accounts"],
        imageAspect: "feature-panorama",
      },
      {
        label: "Results",
        heading: "Impact — \"Design that Earned Trust\"",
        body: [
          "The new experience improved user efficiency and reinforced client trust in Nedbank's enterprise digital offering.",
        ],
        stats: [
          { value: 40, suffix: "%", label: "Fewer steps in key flows", tone: "positive" },
        ],
        bullets: [
          "Enhanced visibility of global transactions.",
          "Decreased error rates in documentation submission.",
          "Positive feedback from business clients on ease of navigation and clarity of data presentation.",
        ],
        bulletStyle: "grid",
        dark: true,
      },
    ],
    learnings: [
      "Corporate design isn't about complexity — it's about trust through structure.",
      "Every click, label, and interaction carries weight when the stakes are high.",
      "This project reminded me that enterprise UX is not about decoration — it's about giving clarity to chaos.",
      "When design becomes invisible, the user feels in control. That's the goal.",
    ],
  },
  {
    slug: "corporate-banking",
    company: "iqbusiness",
    title: "From Chaos to Clarity",
    subtitle:
      "Rebuilding the information architecture of an internal SharePoint platform — transforming a confusing system into one that aligns with how people think and navigate.",
    tools: ["Figma", "Useberry", "SharePoint", "FigJam"],
    heroShowcase: "iq-ia",
    sections: [
      {
        label: "Discover",
        heading: "The Challenge — 'A System That Lost Its Way'",
        body: [
          "The internal SharePoint had become difficult to navigate — not because of visual design, but because of structure.",
          "Content was scattered, categories were unclear, and users often got lost trying to find simple information.",
          "It didn't matter if you were new or experienced — the system didn't align with how people thought.",
        ],
        image: "ia",
        imageAspect: "ia-comparison",
      },
      {
        label: "Define",
        heading: "Research & Insights — 'Understanding Mental Models'",
        body: [
          "I began with a full audit and heuristic review of the SharePoint, mapping out existing structures and identifying breakdowns in navigation and content grouping.",
          "The core issue became clear: the architecture wasn't built around user mental models — it reflected how content was stored, not how it was found.",
        ],
        image: "/images/iqbusiness case study/Screenshot 2024-10-07 at 16.20.19 1.png",
        imageAspect: "laptop",
      },
      {
        label: "Design",
        heading: "Design Approach — 'Let Users Shape the Structure'",
        body: [
          "Instead of jumping into design, I focused on rebuilding the foundation.",
          "Through multiple card sorting exercises, I worked with users across different roles — from junior employees to senior stakeholders — to understand how they naturally grouped and labelled information.",
          "This allowed me to design an architecture based on real mental models, not assumptions.",
        ],
        showcase: "iq-cardsort",
        image: "/images/iqbusiness case study/Screenshot 2024-10-07 at 16.22.09 1.png",
        imageAspect: "laptop",
      },
      {
        label: "Test & Iterate",
        heading: "Validation — 'Test, Learn, Refine'",
        body: [
          "I created the first iteration of the new information architecture and validated it through tree testing using Useberry.",
          "The initial results highlighted gaps — areas where users still struggled to locate information.",
          "Using this feedback, I refined the structure and tested again.",
        ],
        image: [
          "/images/iqbusiness case study/Overview old.png",
          "/images/iqbusiness case study/Overview new.png",
        ],
        imageAspect: "annotated-comparison",
      },
      {
        label: "Results",
        heading: "Outcome — 'Clarity Achieved'",
        body: [
          "The second iteration showed a significant improvement in usability.",
          "Users were able to find information quickly, navigate confidently, and understood the structure intuitively.",
          "What was once a frustrating experience became clear, predictable, and aligned with how people think.",
        ],
        image: "/images/iqbusiness case study/Screenshot 2024-10-07 at 16.23.24 1.png",
        imageAspect: "laptop",
        dark: true,
      },
    ],
    learnings: [
      "This project reinforced that UX doesn't always live in the interface — sometimes it lives entirely in the structure beneath it.",
      "When architecture aligns with human thinking, navigation becomes effortless.",
      "Good design isn't always seen — but it's always felt.",
    ],
  },
  {
    slug: "africa-regions",
    company: "Nedbank Africa Regions",
    title: "Designing for Scale, Culture, and Context",
    subtitle:
      "Localising Nedbank's personal banking onboarding journeys for six African markets — balancing standardisation with regional nuance.",
    tools: ["Figma", "Maze", "Sketch", "InVision"],
    sections: [
      {
        label: "Discover",
        heading: "The Challenge - \"One Experience, Six Realities\"",
        body: [
          "The Everyday Banking onboarding experience needed to scale beyond South Africa — into six African regions, each with its own regulatory rules, infrastructure constraints, and user expectations.",
          "The challenge: how do we maintain a unified onboarding experience while respecting local requirements and ensuring each flow feels natural and familiar to its region?",
        ],
        image: "map",
        imageAspect: "map",
      },
      {
        label: "Define",
        heading: "Research & Insights — \"Understanding Regional Contexts\"",
        body: [],
        bullets: [
          "We partnered with business and compliance teams to map differences in product eligibility, documentation requirements, and customer verification processes.",
          "Beyond regulatory needs, we explored subtle UX differences: connection speeds, device usage patterns, and language tone preferences.",
          "Each discovery reshaped our design decisions.",
        ],
        image: "/images/unsplash_PUd6C90Isp0.webp",
      },
      {
        label: "Design",
        heading: "The Design Approach — \"Consistency with Flexibility\"",
        body: [
          "Using the design foundation built during Everyday Banking, I adapted the core onboarding flow to align with each region's unique conditions.",
          "The goal wasn't to copy — it was to translate.",
        ],
        image: "/images/image 9.png",
        imageAspect: "laptop",
      },
      {
        label: "Deliver",
        heading: "The Solution — \"A System That Scales Gracefully\"",
        body: [],
        bullets: [
          "The new onboarding flow cut down steps, clarified progress, and reduced friction.",
          "Value-added offers were repositioned to appear after key tasks, ensuring clients felt supported — not sold to.",
          "The UI adopted Nedbank's growing design system, creating consistency across products and platforms.",
        ],
        image: "/images/image 10.webp",
        imageAspect: "laptop",
      },
      {
        label: "Results",
        heading: "Impact",
        body: [
          "The redesigned multi-region onboarding framework created operational efficiency and design harmony across borders.",
        ],
        bullets: [
          "Reduced redundant regional builds.",
          "Created scalable, future-proof onboarding templates for additional countries.",
        ],
        bulletStyle: "grid",
        dark: true,
      },
    ],
    learnings: [
      "Designing across borders taught me that true consistency isn't about sameness — it's about shared intent.",
      "Each country needed its own story, but the design language helped unify those stories into one coherent experience.",
      "It's design diplomacy: universal structure, local soul.",
    ],
  },
  {
    slug: "african-bank-website-redesign",
    company: "African Bank",
    title: "Reimagining African Bank's Digital Experience",
    subtitle:
      "Transforming an outdated, fragmented website into a modern, structured, and scalable platform — built on a unified design system.",
    tools: ["Figma", "UI Design", "User Research", "Prototyping"],
    heroImage: "/images/african-bank-landing.png.webp",
    sections: [
      {
        label: "The Challenge",
        heading: "Everything was broken — and it showed",
        body: [
          "The existing website wasn't just outdated — it was fundamentally flawed.",
          "Inconsistent colour palette, buttons that varied in size and behaviour, scattered CTAs, broken navigation, and an information architecture that made no sense.",
          "Products and features were presented in a way that made them feel like separate, disconnected offerings — confusing users and breaking trust.",
        ],
        image: "/images/african-bank-bank-before.webp",
        imageAspect: "laptop",
      },
      {
        label: "Insights",
        heading: "Users weren't confused — the system was",
        body: [
          "The problem wasn't lack of content. It was lack of structure.",
          "No clear product hierarchy, no guided journey, no consistency across interactions, and no design system to support scale.",
          "Users weren't being guided — they were being left to figure things out.",
        ],
        image: [
          "/images/african-bank-personal-loan-before.webp",
          "/images/african-bank-personal-banking-before.webp",
          "/images/african-bank-invest-before.webp",
        ],
        imageAspect: "page-trio",
        captions: ["Personal Loan", "MyWORLD account", "Invest"],
      },
      {
        label: "Approach",
        heading: "Rebuild the foundation, not just the interface",
        body: [
          "We didn't redesign screens. We rebuilt the system.",
        ],
        bullets: [
          "Created a new design system and component library",
          "Redefined the information architecture",
          "Grouped products into clear logical categories",
          "Standardised buttons, CTAs, and interaction patterns",
        ],
        footnote: "Inspired by modern digital banks like Wio, Revolut, and other international platforms.",
        showcase: "design-system",
        image: "/images/Webpage - Personal wireframe.webp",
        imageAspect: "laptop",
      },
      {
        label: "The Solution",
        heading: "A modern, structured, and guided experience",
        body: [
          "The new website introduced clarity at every level:",
        ],
        bullets: [
          "Clean, consistent visual design",
          "A unified component system",
          "Clear product grouping and hierarchy",
          "Strong, intentional CTAs",
        ],
        footnote: "The experience shifted from confusing and fragmented — to clear, guided, and scalable.",
        image: ["/images/african-bank-bank-before.webp", "/images/Landing page final.webp"],
        imageAspect: "before-after",
        compareLabels: ["Before · Business Bank account (2024)", "After · Redesign"],
      },
      {
        label: "Impact",
        heading: "From confusion to confidence",
        body: [],
        bullets: [
          "Improved product discoverability and clearer user journeys.",
          "Consistent experience across every page.",
          "Stronger foundation for future scalability.",
        ],
        bulletStyle: "grid",
        dark: true,
      },
    ],
    learnings: [
      "Good design doesn't fix problems — it prevents them.",
      "The biggest shift wasn't visual — it was structural.",
      "Once the system was clear, everything else followed.",
    ],
  },
  {
    slug: "african-bank-onboarding",
    company: "African Bank",
    title: "Reimagining Digital Onboarding for Simplicity and Conversion",
    subtitle:
      "Redesigning a fragmented, high-friction onboarding journey into a streamlined, intuitive experience — reducing complexity and guiding users with clarity.",
    tools: ["Figma", "UX Design", "UI Design", "Design System"],
    heroImage: "/images/Initial landing.webp",
    heroImageStyle: "phone",
    sections: [
      {
        label: "The Challenge",
        heading: "Too long. Too complex. Easy to abandon.",
        body: ["The existing onboarding experience was fundamentally broken:"],
        stats: [
          { value: 30, suffix: "+", label: "Screens to complete", tone: "negative" },
          { value: 90, suffix: "%", label: "Drop-off rate", tone: "negative" },
        ],
        bullets: [
          "Heavy manual input required",
          "Inconsistent UI and interaction patterns",
          "Confusing button placement and navigation",
        ],
        image: ["/images/Mpho.webp", "/images/PB - Web - NTB.webp"],
        captions: ["Target user persona", "The recommended end-to-end customer journey"],
        imageAspect: "feature-panorama",
      },
      {
        label: "Insights",
        heading: "Friction was everywhere",
        body: ["The experience created unnecessary effort at every step:"],
        bullets: [
          "Users were repeatedly asked for information",
          "Instructions were long and unclear",
          "UI inconsistencies made navigation unpredictable",
          "No clear sense of progress or direction",
        ],
        image: "/images/Onboarding.webp",
        imageAspect: "page",
      },
      {
        label: "Approach",
        heading: "Reduce effort. Increase clarity.",
        body: ["We focused on simplifying the journey at every level:"],
        bullets: [
          "Reduced the number of steps and screens",
          "Introduced a clear, consistent design system",
          "Standardised buttons, layouts, and interaction patterns",
          "Simplified instructions into short, actionable text",
          "Used API integrations to prepopulate user data where possible",
        ],
        image: ["/images/OTP.webp", "/images/Facial Biometrics.webp"],
        imageAspect: "scattered",
      },
      {
        label: "The Solution",
        heading: "A faster, clearer, more human onboarding experience",
        body: ["The redesigned flow introduced:"],
        bullets: [
          "Streamlined step-by-step progression",
          "Clear and consistent CTAs",
          "Reduced cognitive load through better layout and hierarchy",
          "Pre-filled data to minimise manual input",
          "A modern, clean UI aligned with the new design system",
        ],
        image: [
          "/images/Step 1.3 - Getting started.webp",
          "/images/Step 4 - Product selection.webp",
        ],
        captions: ["Getting started", "Product selection"],
        imageAspect: "phone-trio",
      },
      {
        label: "Impact",
        heading: "From drop-offs to completion",
        body: [],
        bullets: [
          "Significant reduction in friction across the journey",
          "Improved completion rates",
          "Faster onboarding experience",
          "More consistent and scalable design foundation",
        ],
        bulletStyle: "grid",
        image: "/images/Completed.webp",
        captions: ["Account successfully created"],
        imageAspect: "phone-trio",
        dark: true,
      },
    ],
    learnings: [
      "Good onboarding removes doubt.",
      "Users don't abandon flows because they're unwilling — they abandon them because they're unsure.",
      "When the path is clear, users move forward.",
    ],
  },
  {
    slug: "life-healthcare-website",
    company: "Life Healthcare",
    title: "Redesigning Care Around the Patient",
    subtitle:
      "Rebuilding South Africa's largest private-hospital website from an org-chart structure into a patient-first experience — search-led, mobile-first, and accessible by default.",
    tools: ["Figma", "UX Research", "Accessibility", "Design System"],
    heroImage: "/images/lhc-website-cover.png",
    heroShowcase: "lhc-web",
    disclaimer: "All data, names and metrics shown on the mockup screens are placeholder content for demonstration purposes only.",
    sections: [
      {
        label: "Discover",
        heading: "A site built for the org chart, not the patient",
        body: [
          "Life Healthcare runs more than 60 hospitals, yet the website was organised around the company's structure — divisions, investors, suppliers — not the handful of reasons a real person actually visits.",
          "The core journeys were buried. Finding a doctor meant scrolling one endless, unfiltered page. Finding a hospital meant another — with no map and no \"near me\". On mobile, where most patients actually are, these pages ran tens of thousands of pixels tall.",
        ],
        stats: [
          { value: 947, label: "Links on one find-a-doctor page", tone: "negative" },
          { value: 23, suffix: "k px", label: "Find-a-doctor page height", tone: "negative" },
          { value: 31, suffix: "k px", label: "Find-a-hospital on mobile", tone: "negative" },
        ],
        image: "/images/lhc-before-doctors.webp",
        imageAspect: "page",
      },
      {
        label: "Define",
        heading: "Four jobs, one apprehensive patient",
        body: [
          "I ran a full audit — heuristic review, a machine-verified axe-core WCAG 2.1 A/AA scan on the five core flows, an information-architecture review, and Lighthouse baselines. The evidence pointed the same way every time: the site served the organisation, not the person using it.",
          "Three patient personas and the analytics agreed. 76% of traffic was mobile, yet the experience was built desktop-first. So I framed the redesign around the four highest-intent patient jobs:",
        ],
        bullets: [
          "Find a hospital — by location, with a map and \"near me\"",
          "Find a doctor — search-first, by name, speciality or hospital",
          "Going into hospital — plan the visit, the stay, and leaving",
          "Get in touch — triaged to the right place, fast",
        ],
        footnote: "The measured \"before\" these jobs had to beat:",
        stats: [
          { value: 76, suffix: "%", label: "Of traffic was mobile", tone: "negative" },
          { value: 43, label: "Home Lighthouse performance", tone: "negative" },
          { value: 118, label: "Colour-contrast failures (5 pages)", tone: "negative" },
        ],
        image: "/images/lhc-before-home.webp",
        imageAspect: "page",
      },
      {
        label: "Design",
        heading: "Designing the patient journey",
        body: [
          "The spine of the redesign is the journey a patient actually travels: find the right place, plan the visit, get through the stay, and leave well — with follow-up care.",
          "That journey became a literal motif — an organic line that threads the hospital experience together across the site, lighting each stage as the patient moves through it.",
        ],
        showcase: "lhc-journey",
      },
      {
        label: "Deliver",
        heading: "Search-led, from the first tap",
        body: [
          "The homepage leads with the four jobs and a single search — not a wall of links. Find-a-doctor is search-first; find-a-hospital opens on a map with \"near me\". One box replaces 947 links.",
        ],
        image: ["/images/lhc-home.webp", "/images/lhc-find-doctors.webp", "/images/lhc-find-hospitals-map.webp"],
        imageAspect: "laptop-trio",
        captions: ["Patient-first homepage", "Find a doctor — search-led", "Find a hospital — map & near me"],
        cropOffsets: [0, 0.25, 0.34],
      },
      {
        label: "The Solution",
        heading: "Guided through the whole hospital stay",
        body: [
          "Profiles answer the real questions — where, which medical aid, which doctors, what to expect. The \"going into hospital\" flow walks a patient through planning the visit, the stay itself, and leaving, so nothing is a surprise.",
        ],
        image: ["/images/lhc-plan-visit.webp", "/images/lhc-hospital-profile.webp", "/images/lhc-doctor-profile.webp"],
        imageAspect: "laptop-trio",
        captions: ["Plan your visit", "Hospital profile", "Doctor profile"],
      },
      {
        label: "Before & After",
        heading: "How far the key pages came",
        body: [
          "The clearest way to see the shift is side by side. The homepage moves from an org-chart of divisions to four patient jobs and a single search. And find-a-doctor — the worst offender — trades a 947-link, 23,000-pixel wall for one search box and filterable result cards.",
        ],
        showcase: "lhc-before-after",
      },
      {
        label: "Impact",
        heading: "From org chart to patient journey",
        body: [
          "The redesign re-centres the site on four clear jobs and the journey between them — and fixes the root causes the audit surfaced, not just the symptoms.",
        ],
        bullets: [
          "One search replaces a 947-link wall on find-a-doctor.",
          "Find-a-hospital opens on a map with \"near me\" — built mobile-first for the 76%.",
          "The four patient jobs sit in the top navigation, not under the org chart.",
          "A tokenised, accessible component library closes the ~118 contrast failures at the source.",
        ],
        bulletStyle: "grid",
        footnote: "The accessible component library behind this is its own case study — the design system.",
        dark: true,
      },
    ],
    learnings: [
      "A hospital group's website isn't about the group — it's about the person trying to get care.",
      "Structure the site around jobs, not departments, and the journey designs itself.",
      "Accessibility isn't a pass at the end; it's a decision made once, in the tokens.",
    ],
  },
  {
    slug: "life-healthcare-design-system",
    company: "Life Healthcare",
    title: "A Design System for a Hospital Group",
    subtitle:
      "Turning a UI with four navies, six button styles and 118 contrast failures into a tokenised, accessible component library — the backbone the whole redesign is built on.",
    tools: ["Figma", "Design Tokens", "Component Library", "Accessibility"],
    heroShowcase: "lhc-ds",
    disclaimer: "All data, names and metrics shown on the mockup screens are placeholder content for demonstration purposes only.",
    sections: [
      {
        label: "The Challenge",
        heading: "A UI with no system",
        body: [
          "Before a single screen could be redesigned, the building blocks had to exist. A computed-style teardown of the live site showed why nothing felt consistent: there was no system underneath it.",
          "Four different navy blues. Two reds. Seven body font-sizes. An H3 rendered larger than the H1. Six button styles. Corner radii that were either zero or a full circle. The result — measured — was roughly 118 colour-contrast failures across the five core pages.",
        ],
        stats: [
          { value: 4, label: "Different navy blues", tone: "negative" },
          { value: 6, label: "Button styles", tone: "negative" },
          { value: 118, label: "Contrast failures (5 pages)", tone: "negative" },
        ],
        image: "/images/lhc-before-home.webp",
        imageAspect: "laptop",
      },
      {
        label: "Approach",
        heading: "Tokens, then a component library",
        body: [
          "The fix starts one level below the interface. I defined semantic colour tokens, a single Helvetica Neue type ramp, and one spacing and radius scale — then built the components on top of them.",
          "Everything here is the live component, themed by token. Tab through the library — colour, type, buttons, controls, alerts, and the card family — all on the real photography and type.",
        ],
        showcase: "lhc-components",
      },
      {
        label: "The Build",
        heading: "A library of 129 blocks",
        body: [
          "Above the cards sits the block library — 129 ready-made sections that cover every page the site needs: journey timelines, quality-measure grids, patient-experience scores, medical-aid scheme checkers, visiting hours, referral pathways, stats, bento, and more.",
          "Each is a self-contained block with a head and a content slot, built on the same tokens — so a page gets assembled, not reinvented.",
        ],
        showcase: "lhc-blocks",
      },
      {
        label: "Deliver",
        heading: "Rows & Blocks — the layout system",
        body: [
          "Cards don't float on their own. They slot into Blocks, and Blocks stack into Rows — a nesting contract that lets anyone assemble a page from the system without breaking the grid, the spacing, or the rhythm.",
        ],
        showcase: "lhc-rows",
      },
      {
        label: "Impact",
        heading: "Consistency, fixed at the root",
        body: [
          "A design system isn't a style guide — it's the reason the redesign can scale across 60-plus hospitals without drifting.",
        ],
        bullets: [
          "Four navies and six button styles collapse into one tokenised set.",
          "Contrast passes AA by default — fixing the ~118 failures at the source.",
          "A single card family covers doctors, hospitals, metrics and information.",
          "Rows & Blocks let the whole team build on-system, on-grid.",
        ],
        bulletStyle: "grid",
        dark: true,
      },
    ],
    learnings: [
      "The most impactful design work often sits below the surface, in the tokens nobody sees.",
      "Accessibility is cheapest and most reliable when it's a property of the system, not a final audit.",
      "A good system lets more people build without lowering the bar.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
