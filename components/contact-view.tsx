"use client";

import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";
import { ADDRESS_EN, ADDRESS_ZH, INBOX } from "@/lib/site";

export function ContactView() {
  const { lang } = useLang();
  const text = COPY[lang];

  return (
    <div className="wrap">
      <TopBar page="contact" />
      <main className="page sheet">
        <h1>{text.contact}</h1>
        <div className="address">
          <h2>{text.address}</h2>
          <p>{lang === "en" ? ADDRESS_EN : ADDRESS_ZH}</p>
          <p className="fine">{lang === "en" ? ADDRESS_ZH : ADDRESS_EN}</p>
        </div>
        <div className="address">
          <h2>{text.person}</h2>
          <p>
            <a href={`mailto:${INBOX}`}>{INBOX}</a>
          </p>
        </div>
      </main>
      <SiteNav current="/contact" />
    </div>
  );
}
