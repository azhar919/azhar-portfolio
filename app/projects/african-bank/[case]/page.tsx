import { notFound } from "next/navigation";
import { getCaseStudy } from "../../data";
import CaseStudyClient from "../../[slug]/CaseStudyClient";

const CASES = ["website-redesign", "onboarding"];

export async function generateStaticParams() {
  return CASES.map((c) => ({ case: c }));
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
