import type { Metadata } from "next";
import { FundingView } from "@/components/funding-view";
import { FUNDING_LEAD } from "@/lib/site";

export const metadata: Metadata = {
  title: "资助与投资",
  description: FUNDING_LEAD,
  alternates: { canonical: "/funding" },
};

export default function FundingPage() {
  return <FundingView />;
}
