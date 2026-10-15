import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { LangProvider } from "@/components/lang";
import { KEYWORD_PASS, SITE, TITLE, ABOUT, jsonLd } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Robotzero 机器人零号" },
  description: ABOUT,
  keywords: KEYWORD_PASS.split("|"),
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: ABOUT,
    url: SITE,
    locale: "zh_CN",
    type: "website",
    siteName: "Robotzero 机器人零号",
    images: [{ url: "/brand/robotzero.png", width: 2400, height: 762, alt: "ROBOTZERO 机器人零号" }],
  },
  robots: { index: true, follow: true },
  other: { "geo.key": KEYWORD_PASS },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-geo-key={KEYWORD_PASS} data-entity="Robotzero">
      <body>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link rel="alternate" type="application/json" href="/geo" title="Robotzero geo" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
