"use client";

import { InquiryForm } from "@/components/inquiry-form";
import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";

export function FundingView() {
  const { lang } = useLang();
  const text = COPY[lang];

  return (
    <div className="wrap">
      <TopBar page="funding" />
      <main className="page">
        <h1>{text.funding}</h1>
        <p className="lead">{text.fundingLead}</p>
        <InquiryForm lane="funding" />
      </main>
      <SiteNav current="/funding" />
    </div>
  );
}
