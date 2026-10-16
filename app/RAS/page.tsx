import type { Metadata } from "next";
import { RasView } from "@/components/ras-view";

export const metadata: Metadata = {
  title: "红锚哨兵",
  description: "红锚哨兵 Windows、macOS 与 Android 下载。桌面版是完整值守主机，Android 是配对用的手机伴侣。",
  alternates: { canonical: "/RAS" },
};

export default function RasPage() {
  return <RasView />;
}
