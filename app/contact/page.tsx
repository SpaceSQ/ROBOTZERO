import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view";
import { ADDRESS_ZH, INBOX } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系方式",
  description: `${ADDRESS_ZH} ${INBOX}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
