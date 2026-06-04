import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "../../data";
import CaseStudyClient from "../../[slug]/CaseStudyClient";

const CASES = ["website-redesign", "onboarding"];

export async function generateStaticParams() {
  return CASES.map((c) => ({ case: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ case: string }>;
}): Promise<Metadata> {
  const { case: caseSlug } = await params;
  const study = getCaseStudy(`african-bank-${caseSlug}`);
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
  const { case: caseSlug } = await params;
  const slug = `african-bank-${caseSlug}`;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyClient study={study} />;
}
