import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: "Robotzero 机器人零号。与你共创碳硅共生世界。S2 AIOS、S2 彩虹桥、红锚哨兵、红锚观察者、S2 具境智能操作系统、桃花源世界模型。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeView />;
}
