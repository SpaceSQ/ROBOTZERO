"use client";

import { InquiryForm } from "@/components/inquiry-form";
import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";

export function ResearchView() {
  const { lang } = useLang();
  const text = COPY[lang];

  return (
    <div className="wrap">
      <TopBar page="research" />
      <main className="page">
        <h1>{text.research}</h1>
        <p className="lead">{text.researchLead}</p>
        <InquiryForm lane="research" />
      </main>
      <SiteNav current="/research" />
    </div>
  );
}
