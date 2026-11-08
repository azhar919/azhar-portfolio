import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "../../data";
import CaseStudyClient from "../../[slug]/CaseStudyClient";
import { SHOW_LIFE_HEALTHCARE } from "@/lib/flags";

const CASES = ["website", "design-system"];

export async function generateStaticParams() {
  // Held back until the live client site launches (see lib/flags).
  if (!SHOW_LIFE_HEALTHCARE) return [];
  return CASES.map((c) => ({ case: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ case: string }>;
}): Promise<Metadata> {
  const { case: caseSlug } = await params;
  const study = getCaseStudy(`life-healthcare-${caseSlug}`);
  if (!study) return {};
  const title = `${study.title} — Azhar Mohamed`;
  const description = study.subtitle;
  const image = study.heroImage ?? "/og-image.png";
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ case: string }>;
}) {
  if (!SHOW_LIFE_HEALTHCARE) notFound();
  const { case: caseSlug } = await params;
  const slug = `life-healthcare-${caseSlug}`;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyClient study={study} />;
}
