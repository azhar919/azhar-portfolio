import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "../data";
import CaseStudyClient from "./CaseStudyClient";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyClient study={study} />;
}
