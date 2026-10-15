import type { Metadata } from "next";
import { ResearchView } from "@/components/research-view";
import { RESEARCH_LEAD } from "@/lib/site";

export const metadata: Metadata = {
  title: "研究合作",
  description: RESEARCH_LEAD,
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return <ResearchView />;
}
