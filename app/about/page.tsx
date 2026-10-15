import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";
import { ABOUT } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于我们",
  description: ABOUT,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
