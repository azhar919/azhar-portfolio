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
  compareLabels?: [string, string]; // [before, after] chip labels for imageAspect "before-after"
  imageAspect?: "portrait" | "page" | "laptop" | "screenshot" | "scattered" | "landscape-portrait" | "annotated-comparison" | "screenshots" | "map" | "feature-panorama" | "phone-trio" | "before-after" | "page-trio" | "ia-comparison"; // portrait = phone, page = full-height, screenshot = natural size, scattered = overlapping rotated cards, landscape-portrait = stacked mixed orientations, annotated-comparison = before/after with metric callouts, screenshots = multiple stacked at natural size, before-after = labelled old→new comparison, page-trio = three page-tops side by side with captions, ia-comparison = built tangled→clean IA node diagram, default = 16:9
  showcase?: "design-system"; // renders a built visual (e.g. a mini design-system sheet) instead of an image
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
        image: "/images/EDB_creditcard-27main Copy.jpg",
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
        image: "/images/Screenshot 2026-04-01 at 14.23.39 1.png",
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
        image: "/images/image 4 prototpye.png",
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
        image: ["/images/image 6.png", "/images/image 7.png", "/images/image 8.png"],
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
        image: "/images/unsplash_PUd6C90Isp0.png",
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
        image: "/images/image 10.png",
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
    heroImage: "/images/african-bank-landing.png.png",
    sections: [
      {
        label: "The Challenge",
        heading: "Everything was broken — and it showed",
        body: [
          "The existing website wasn't just outdated — it was fundamentally flawed.",
          "Inconsistent colour palette, buttons that varied in size and behaviour, scattered CTAs, broken navigation, and an information architecture that made no sense.",
          "Products and features were presented in a way that made them feel like separate, disconnected offerings — confusing users and breaking trust.",
        ],
        image: "/images/african-bank-bank-before.png",
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
          "/images/african-bank-personal-loan-before.png",
          "/images/african-bank-personal-banking-before.png",
          "/images/african-bank-invest-before.png",
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
        image: "/images/Webpage - Personal wireframe.png",
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
        image: ["/images/african-bank-bank-before.png", "/images/Landing page final.png"],
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
    heroImage: "/images/Initial landing.png",
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
        image: ["/images/Mpho.png", "/images/PB - Web - NTB.png"],
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
        image: "/images/Onboarding.png",
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
        image: ["/images/OTP.png", "/images/Facial Biometrics.png"],
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
          "/images/Step 1.3 - Getting started.png",
          "/images/Step 4 - Product selection.png",
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
        image: "/images/Completed.png",
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
