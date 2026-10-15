"use client";

import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";
import { PRODUCTS } from "@/lib/site";

export function AboutView() {
  const { lang } = useLang();
  const text = COPY[lang];
  const names = PRODUCTS.map((product) => (lang === "en" ? product.nameEn : product.name)).join(lang === "en" ? ", " : "、");

  return (
    <div className="wrap">
      <TopBar page="about" />
      <main className="page sheet">
        <h1>{text.about}</h1>
        <p>{text.aboutLead}</p>
        <p>
          {text.aboutMore}
          {names}
          {text.aboutEnd}
        </p>
      </main>
      <SiteNav current="/about" />
    </div>
  );
}
