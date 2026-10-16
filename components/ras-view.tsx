"use client";

import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";

const TAG = "v9.1.4";
const BASE = `https://github.com/SpaceSQ/Red-Anchor-Sentinel/releases/download/${TAG}`;
const RELEASE = `https://github.com/SpaceSQ/Red-Anchor-Sentinel/releases/tag/${TAG}`;

const FILES = {
  exe: `${BASE}/Red.Anchor.Sentinel_9.1.4_x64-setup.exe`,
  msi: `${BASE}/Red.Anchor.Sentinel_9.1.4_x64_en-US.msi`,
  dmg: `${BASE}/Red.Anchor.Sentinel_9.1.4_aarch64.dmg`,
  apk: `${BASE}/Red.Anchor.Sentinel_9.1.4_android.apk`,
  deb: `${BASE}/Red.Anchor.Sentinel_9.1.4_amd64.deb`,
  appimage: `${BASE}/Red.Anchor.Sentinel_9.1.4_amd64.AppImage`,
};

export function RasView() {
  const { lang } = useLang();
  const zh = lang === "zh";

  const cards = [
    {
      name: "Windows",
      ver: "9.1.4 · x64",
      body: zh
        ? "桌面主机。安装后可发注册邮件、重置密码，并在本机做 AI 蠕虫监测。邮件和金库需要本机已安装 Node.js 22 或更新版本。安装包不含邮箱密码。"
        : "Desktop host. It can send account mail, reset a password, and run the AI worm watch on this computer. Mail and the vault need Node.js 22 or newer. The installer does not contain the mail password.",
      links: [
        { href: FILES.exe, label: ".exe" },
        { href: FILES.msi, label: ".msi" },
      ],
    },
    {
      name: "macOS",
      ver: zh ? "9.1.4 · Apple Silicon" : "9.1.4 · Apple Silicon",
      body: zh
        ? "桌面主机，Apple Silicon（aarch64）磁盘映像。没有 Intel 安装包。若系统提示已损坏，展开下方的终端步骤。"
        : "Desktop host, Apple Silicon (aarch64) disk image. There is no Intel package. If macOS says the app is damaged, use the Terminal steps below.",
      links: [{ href: FILES.dmg, label: ".dmg" }],
    },
    {
      name: "Android",
      ver: "0.1.0 · APK",
      body: zh
        ? "手机伴侣。用来发现并配对同一 Wi-Fi 上的桌面主机。它不是完整的桌面控制台，深度扫描仍在 Windows 或 Mac 上。"
        : "Phone companion. It finds and pairs with the desktop host on the same Wi-Fi. It is not the full desktop console. Deep scan stays on Windows or Mac.",
      links: [{ href: FILES.apk, label: "APK" }],
    },
    {
      name: "Linux",
      ver: "9.1.4 · x64",
      body: zh
        ? "桌面主机。.deb 用系统安装器，AppImage 赋予执行权限后打开。同样需要 Node.js 22 或更新版本。"
        : "Desktop host. Install the .deb with the system installer, or mark the AppImage executable and open it. Node.js 22 or newer is required.",
      links: [
        { href: FILES.deb, label: ".deb" },
        { href: FILES.appimage, label: "AppImage" },
      ],
    },
  ];

  return (
    <div className="wrap">
      <TopBar page="ras" />
      <main className="page">
        <h1>{zh ? "红锚哨兵" : "Red Anchor Sentinel"}</h1>
        <p className="lead">
          {zh
            ? "AI 智能体的安全防护助手。桌面版是完整值守主机。Android 是与那台电脑配对的手机伴侣。"
            : "A safety guard for AI agents. The desktop build is the full host. Android is the phone companion that pairs with that computer."}
        </p>
        <section className="downloads" aria-label={zh ? "下载" : "Download"}>
          {cards.map((card) => (
            <article key={card.name} className="download">
              <strong>{card.name}</strong>
              <span className="ver">{card.ver}</span>
              <p>{card.body}</p>
              <div className="files">
                {card.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>
        <p className="fine">
          {zh ? "iPhone 与 iPad 使用同一套手机伴侣。" : "iPhone and iPad use the same phone companion."}{" "}
          {zh
            ? "这一版不在此页提供侧载包，安装以 App Store 审核通过后的版本为准。"
            : "This page does not offer a sideload build. Install the version that has passed App Store review."}
        </p>
        <p className="fine">
          {zh ? "全部文件见 " : "Every file is on "}
          <a href={RELEASE}>{TAG}</a>
          {zh ? "。免费软件，闭源分发。" : ". Freeware. Closed-source client."}{" "}
          <a href="/RAS/legal">{zh ? "使用声明" : "Use notice"}</a>
        </p>
        <details className="mac-help">
          <summary>{zh ? "macOS 提示「已损坏」" : "macOS says the app is damaged"}</summary>
          {zh ? (
            <>
              <p>安装包没有坏。这是未做苹果公证时，系统隔离下载文件的提示。</p>
              <p>把 Red Anchor Sentinel.app 放进「应用程序」，然后在终端执行：</p>
              <p>
                <code>xattr -cr &quot;/Applications/Red Anchor Sentinel.app&quot;</code>
              </p>
              <p>
                <code>codesign --force --deep --sign - &quot;/Applications/Red Anchor Sentinel.app&quot;</code>
              </p>
            </>
          ) : (
            <>
              <p>The download is intact. Without Apple notarization, Gatekeeper quarantines the app and shows this warning.</p>
              <p>Move Red Anchor Sentinel.app into Applications, then run:</p>
              <p>
                <code>xattr -cr &quot;/Applications/Red Anchor Sentinel.app&quot;</code>
              </p>
              <p>
                <code>codesign --force --deep --sign - &quot;/Applications/Red Anchor Sentinel.app&quot;</code>
              </p>
            </>
          )}
        </details>
      </main>
      <SiteNav />
    </div>
  );
}
