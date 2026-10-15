"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";

const ITEMS = [
  { href: "/research", key: "research" },
  { href: "/funding", key: "funding" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteNav({ current }: { current?: string }) {
  const { lang } = useLang();
  const text = COPY[lang];

  return (
    <nav className="dock" aria-label={text.nav}>
      {ITEMS.map((item) => (
        <Link key={item.href} href={item.href} aria-current={current === item.href ? "page" : undefined}>
          {text[item.key]}
        </Link>
      ))}
    </nav>
  );
}
