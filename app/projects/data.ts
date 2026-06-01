export type Section = {
  label: string;
  heading: string;
  body: string[];
  image?: string | string[];
  imageAspect?: "portrait" | "page" | "screenshot" | "scattered"; // portrait = phone, page = full-height, screenshot = natural size, scattered = overlapping rotated cards, default = 16:9
  dark?: boolean;
};

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  subtitle: string;
  tools: string[];
  heroImage?: string;
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
    heroImage: "/images/EDB_creditcard-27main Copy.jpg",
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
          "Pain points emerged quickly: unclear steps, excessive screens, confusing product offers, and a lack of visible progress.",
          "Clients didn't feel guided — they felt pushed.",
        ],
        image: "/images/iMac - 2.png",
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
        imageAspect: "page",
      },
      {
        label: "Deliver",
        heading: "The Solution — \"Designing for Ease and Trust\"",
        body: [
          "The new onboarding flow cut down steps, clarified progress, and reduced friction.",
          "Value-added offers were repositioned to appear after key tasks, ensuring clients felt supported — not sold to.",
          "The UI adopted Nedbank's growing design system, creating consistency across products and platforms.",
        ],
        image: "/images/EDB_creditcard-27main Copy.jpg",
        imageAspect: "page",
      },
      {
        label: "Results",
        heading: "Impact",
        body: [
          "The redesigned onboarding process helped bring focus back to what mattered: the client's goal.",
          "The new experience reduced friction, improved task clarity, and established reusable patterns for future product flows.",
        ],
        image: "/images/iMac - 1.png",
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
      },
      {
        label: "Define",
        heading: "Research & Insights — \"Understanding the Corporate Mindset\"",
        body: [
          "We conducted stakeholder interviews and user feedback sessions with treasury managers, finance officers, and global trade specialists.",
          "They didn't want flashy design — they wanted clarity, reliability, and control. From these sessions, three core needs emerged: Visibility: Quick access to balances, rates, and documentation. Efficiency: Streamlined, step-light processes for recurring tasks. Confidence: Every action should feel precise and traceable.",
        ],
      },
      {
        label: "Design",
        heading: "Design Approach — \"Complexity, Organised Beautifully\"",
        body: [
          "I mapped the user journeys for each core feature, identifying friction-heavy moments in navigation, form completion, and data visibility.",
          "The solution was to design with hierarchical clarity — guiding users through complexity without oversimplifying their power.",
          "I structured information into clear, digestible views that let users complete tasks faster and with confidence.",
        ],
      },
      {
        label: "Deliver",
        heading: "The Solution — \"Precision Tools for Power Users\"",
        body: [
          "The redesigned features within the Business Hub transformed the experience from dense and mechanical to structured and intuitive.",
          "Global Transactional Accounts: Simplified dashboard views for multiple currencies and real-time conversion summaries.",
          "Global Documentary Trade: Streamlined document uploads and status tracking, reducing confusion and processing delays.",
          "Call & Term Investment Accounts: Interactive comparison tables for rates and durations, helping corporate users make quick, informed decisions.",
        ],
      },
      {
        label: "Results",
        heading: "Impact — \"Design that Earned Trust\"",
        body: [
          "The new experience improved user efficiency and reinforced client trust in Nedbank's enterprise digital offering.",
          "Reduced steps in key flows by up to 40%.",
          "Enhanced visibility of global transactions.",
          "Decreased error rates in documentation submission.",
          "Positive feedback from business clients on ease of navigation and clarity of data presentation.",
        ],
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
    company: "IQ Business",
    title: "From Chaos to Clarity",
    subtitle:
      "Rebuilding the information architecture of an internal SharePoint platform — transforming a confusing system into one that aligns with how people think and navigate.",
    tools: ["Figma", "Useberry", "SharePoint", "FigJam"],
    sections: [
      {
        label: "Discover",
        heading: "The Challenge — 'A System That Lost Its Way'",
        body: [
          "The internal SharePoint had become difficult to navigate — not because of visual design, but because of structure.",
          "Content was scattered, categories were unclear, and users often got lost trying to find simple information.",
          "It didn't matter if you were new or experienced — the system didn't align with how people thought.",
        ],
        image: "/images/iq-discover.png",
      },
      {
        label: "Define",
        heading: "Research & Insights — 'Understanding Mental Models'",
        body: [
          "I began with a full audit and heuristic review of the SharePoint, mapping out existing structures and identifying breakdowns in navigation and content grouping.",
          "The core issue became clear: the architecture wasn't built around user mental models — it reflected how content was stored, not how it was found.",
        ],
        image: ["/images/iq-define-1.png", "/images/iq-define-2.png"],
      },
      {
        label: "Design",
        heading: "Design Approach — 'Let Users Shape the Structure'",
        body: [
          "Instead of jumping into design, I focused on rebuilding the foundation.",
          "Through multiple card sorting exercises, I worked with users across different roles — from junior employees to senior stakeholders — to understand how they naturally grouped and labelled information.",
          "This allowed me to design an architecture based on real mental models, not assumptions.",
        ],
        image: "/images/iq-design.png",
      },
      {
        label: "Test & Iterate",
        heading: "Validation — 'Test, Learn, Refine'",
        body: [
          "I created the first iteration of the new information architecture and validated it through tree testing using Useberry.",
          "The initial results highlighted gaps — areas where users still struggled to locate information.",
          "Using this feedback, I refined the structure and tested again.",
        ],
        image: "/images/iq-test.png",
      },
      {
        label: "Results",
        heading: "Outcome — 'Clarity Achieved'",
        body: [
          "The second iteration showed a significant improvement in usability.",
          "Users were able to find information quickly, navigate confidently, and understood the structure intuitively.",
          "What was once a frustrating experience became clear, predictable, and aligned with how people think.",
        ],
        image: "/images/iq-results.png",
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
      },
      {
        label: "Define",
        heading: "Research & Insights — \"Understanding Regional Contexts\"",
        body: [
          "We partnered with business and compliance teams to map differences in product eligibility, documentation requirements, and customer verification processes.",
          "Beyond regulatory needs, we explored subtle UX differences: connection speeds, device usage patterns, and language tone preferences.",
          "Each discovery reshaped our design decisions.",
        ],
      },
      {
        label: "Design",
        heading: "The Design Approach — \"Consistency with Flexibility\"",
        body: [
          "Using the design foundation built during Everyday Banking, I adapted the core onboarding flow to align with each region's unique conditions.",
          "The goal wasn't to copy — it was to translate.",
        ],
      },
      {
        label: "Deliver",
        heading: "The Solution — \"A System That Scales Gracefully\"",
        body: [
          "The new onboarding flow cut down steps, clarified progress, and reduced friction.",
          "Value-added offers were repositioned to appear after key tasks, ensuring clients felt supported — not sold to.",
          "The UI adopted Nedbank's growing design system, creating consistency across products and platforms.",
        ],
      },
      {
        label: "Results",
        heading: "Impact",
        body: [
          "The redesigned multi-region onboarding framework created operational efficiency and design harmony across borders.",
          "Reduced redundant regional builds.",
          "Created scalable, future-proof onboarding templates for additional countries.",
        ],
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
    sections: [
      {
        label: "The Challenge",
        heading: "Everything was broken — and it showed",
        body: [
          "The existing website wasn't just outdated — it was fundamentally flawed.",
          "Inconsistent colour palette, buttons that varied in size and behaviour, scattered CTAs, broken navigation, and an information architecture that made no sense.",
          "Products and features were presented in a way that made them feel like separate, disconnected offerings — confusing users and breaking trust.",
        ],
        image: "/images/ab-website-section.png",
        imageAspect: "screenshot",
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
          "/images/Screenshot 2025-01-08 at 13.33.22 1.png",
          "/images/Screenshot 2025-01-08 at 13.33.22 1 (2).png",
          "/images/image 53.png",
        ],
        imageAspect: "scattered",
      },
      {
        label: "Approach",
        heading: "Rebuild the foundation, not just the interface",
        body: [
          "We didn't redesign screens. We rebuilt the system.",
          "Created a new design system and component library, redefined the information architecture, grouped products into clear logical categories, and standardised buttons, CTAs, and interaction patterns.",
          "Inspired by modern digital banks like Wio, Revolut, and other international platforms.",
        ],
        image: "/images/Webpage - Personal wireframe.png",
        imageAspect: "page",
      },
      {
        label: "The Solution",
        heading: "A modern, structured, and guided experience",
        body: [
          "The new website introduced clarity at every level: clean, consistent visual design, a unified component system, clear product grouping and hierarchy, and strong intentional CTAs.",
          "The experience shifted from confusing and fragmented — to clear, guided, and scalable.",
        ],
        image: "/images/Landing page final.png",
        imageAspect: "page",
      },
      {
        label: "Impact",
        heading: "From confusion to confidence",
        body: [
          "Improved product discoverability and clearer user journeys.",
          "Consistent experience across every page.",
          "Stronger foundation for future scalability.",
        ],
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
    tools: ["Figma", "UI Design", "User Research", "Prototyping", "Human Centred Design"],
    sections: [
      {
        label: "The Challenge",
        heading: "Too long. Too complex. Easy to abandon.",
        body: [
          "The existing onboarding experience was fundamentally broken: over 30+ screens to complete, heavy manual input required, a 90% drop-off rate, and inconsistent UI and interaction patterns.",
          "Users weren't completing the journey — they were abandoning it.",
        ],
      },
      {
        label: "Insights",
        heading: "Friction was everywhere",
        body: [
          "The experience created unnecessary effort at every step: users repeatedly asked for information, unclear instructions, unpredictable navigation, and no clear sense of progress or direction.",
          "The process didn't feel guided — it felt like work.",
        ],
      },
      {
        label: "Approach",
        heading: "Reduce effort. Increase clarity.",
        body: [
          "We focused on simplifying the journey at every level: reducing screens, introducing a consistent design system, standardising buttons and layouts, and using API integrations to prepopulate user data where possible.",
          "Every decision was driven by one principle: make it easier to move forward.",
        ],
      },
      {
        label: "The Build",
        heading: "A faster, clearer, more human onboarding experience",
        body: [
          "The redesigned flow introduced streamlined step-by-step progression, clear and consistent CTAs, reduced cognitive load through better layout and hierarchy, and pre-filled data to minimise manual input.",
          "The experience shifted from overwhelming and fragmented — to guided, predictable, and efficient.",
        ],
        image: "/images/ab-onboarding-phone.png",
        imageAspect: "portrait",
      },
      {
        label: "Impact",
        heading: "From drop-offs to completion",
        body: [
          "Significant reduction in friction across the journey.",
          "Improved completion rates and a faster onboarding experience.",
          "More consistent and scalable design foundation.",
        ],
        dark: true,
      },
    ],
    learnings: [
      "Good onboarding removes doubt.",
      "Users don't abandon flows because they're unwilling — they abandon them because they're unsure.",
      "When the path is clear, users move forward.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
