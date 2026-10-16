import type { Metadata } from "next";
import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = {
  title: "红锚哨兵使用声明",
  description: "红锚哨兵以免费软件方式提供，闭源分发。本页授予使用许可，不转让著作权。",
  alternates: { canonical: "/RAS/legal" },
};

const NOTICE = "https://github.com/SpaceSQ/Red-Anchor-Sentinel/blob/main/docs/FREEWARE_NOTICE.md";

export default function RasLegalPage() {
  return (
    <div className="wrap">
      <TopBar page="ras" />
      <main className="page sheet">
        <h1>使用声明</h1>
        <p>红锚哨兵以免费软件方式提供，采用闭源分发。下载、安装或使用，即表示接受这份声明。声明授予使用许可，不转让著作权，也不是开源许可证。</p>
        <p>家庭用户和企业用户都可以在自有或合法控制的主机上安装和使用。安装包不含邮箱密码。补丁和账本留在本机。</p>
        <p>Android 安装包是与桌面主机配对的手机伴侣，不替代 Windows、macOS 或 Linux 上的完整控制台。</p>
        <p className="fine">
          <a href={NOTICE}>声明全文（GitHub）</a>
          {" · "}
          <a href="/RAS">返回下载</a>
        </p>
        <h2>Use notice</h2>
        <p>Red Anchor Sentinel is freeware and is distributed closed-source. Downloading, installing, or using it means this notice is accepted. The notice grants a right to use the software. It does not transfer copyright, and it is not an open-source license.</p>
        <p>Household and enterprise users may install it on hosts they own or lawfully control. The installers do not contain the mail password. Patches and the ledger stay on that machine.</p>
        <p>The Android package is the phone companion that pairs with the desktop host. It does not replace the full console on Windows, macOS, or Linux.</p>
      </main>
      <SiteNav />
    </div>
  );
}
