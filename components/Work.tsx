"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const experiences = [
  {
    company: "African Bank",
    logo: "/images/logo-africanbank.png",
    logoW: 461, logoH: 148, logoMaxH: 44,
    role: "Design Lead",
    duration: "1 year",
    description:
      "Built the foundations for Business Banking's digital evolution — bringing cohesion to fragmented experiences across the website, onboarding, and online banking platforms.\n\nEstablished the bank's first design system, creating a scalable foundation for consistent, client-focused experiences moving forward.",
    href: "/projects/african-bank",
  },
  {
    company: "IQ Business",
    logo: "/images/logo-iqbusiness.svg",
    logoW: 260, logoH: 148, logoMaxH: 36,
    role: "Senior Principal Consultant",
    duration: "6 years",
    description:
      "As a Design Lead and Consultant, I redefined the information architecture of our internal SharePoint — transforming a disorganised system into a structured, intuitive experience that empowered employees to find what they needed, faster and with ease.",
    href: "/projects/corporate-banking",
  },
  {
    company: "Nedbank",
    logo: "/images/logo-nedbank.svg",
    logoW: 148, logoH: 148, logoMaxH: 44,
    role: "Product Designer",
    duration: "5 years",
    description:
      "Designed and improved digital experiences across Everyday Banking, Corporate Banking, and Nedbank Africa Regions — from product onboarding and maintenance flows to online business banking.",
    href: "/projects",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="work" className="py-24 bg-raised">
      <div className="page-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col gap-3 mb-14"
        >
          <p className="text-accent text-label font-medium">Experience</p>
          <h2 className="font-bold text-ink leading-tight text-h2">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-6"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={card}
              className="bg-surface border border-line rounded-[24px] p-10 flex flex-col gap-8"
            >
              <div className="flex items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exp.logo}
                  alt={exp.company}
                  width={exp.logoW}
                  height={exp.logoH}
                  style={{ maxHeight: `${exp.logoMaxH}px`, width: "auto" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-ink leading-snug text-h3">
                  {exp.role}
                </h3>
                <p className="text-quiet text-body font-medium">
                  {exp.duration}
                </p>
              </div>

              <div className="text-dim text-body-lg space-y-4">
                {exp.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {exp.href && (
                <div>
                  <Link
                    href={exp.href}
                    className="inline-flex items-center gap-2 h-[48px] px-7 bg-accent rounded-full font-medium text-ghost text-body hover:bg-accent-dark transition-colors duration-200 group"
                  >
                    View work
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
