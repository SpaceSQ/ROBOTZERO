"use client";

import { MarkS2RB } from "@/components/marks";
import { SiteNav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { useLang } from "@/components/lang";
import { COPY } from "@/lib/copy";
import { PRODUCTS, REPO, type Product } from "@/lib/site";

function Logo({ id }: { id: Product["id"] }) {
  if (id === "s2") return <img className="logo-img" src="/brand/s2-aios.png" alt="" />;
  if (id === "s2rb") return <MarkS2RB />;
  if (id === "ras") return <img className="logo-img" src="/brand/red-anchor.png" alt="" />;
  if (id === "rao") return <img className="logo-img" src="/brand/rao.svg" alt="" />;
  if (id === "s2os") return <img className="logo-img logo-wide" src="/brand/s2-os.jpg" alt="" />;
  return <img className="logo-img logo-wide" src="/brand/taohuayuan.jpg" alt="" />;
}

export function HomeView() {
  const { lang } = useLang();
  const text = COPY[lang];

  return (
    <div className="wrap">
      <TopBar />
      <header className="hero">
        <h1>
          <img className="brand-lockup" src="/brand/robotzero.png" alt="ROBOTZERO 机器人零号" width={2400} height={762} />
        </h1>
        <p className="promise">{text.promise}</p>
        <p className="kicker">{text.products}</p>
      </header>
      <section className="products" aria-label={text.products}>
        {PRODUCTS.map((product) => {
          const title = lang === "en" ? product.nameEn : product.name;
          const other = lang === "en" ? product.name : product.nameEn;
          const host = product.href.replace(/^https:\/\//, "");
          const wide = product.id === "s2os" || product.id === "thy";
          return (
            <a
              key={product.id}
              className={["product", product.id === "s2rb" ? "bridge" : "", wide ? "banner" : ""].filter(Boolean).join(" ")}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <header>
                <Logo id={product.id} />
                <div>
                  <h2>{title}</h2>
                  <p className="en">{other}</p>
                  <p className="role">{lang === "en" ? product.roleEn : product.role}</p>
                </div>
              </header>
              <p className="blurb">{lang === "en" ? product.blurbEn : product.blurb}</p>
              <span className="go">
                <span className="sr">
                  {text.enter}
                  {title}
                </span>
                <span aria-hidden="true">{host}</span>
              </span>
            </a>
          );
        })}
      </section>
      <SiteNav />
      <footer className="home-foot">
        <span>{text.foot}</span>
        <span>
          <a href={REPO}>GitHub</a>
          {" · "}
          <a href="/privacy">{text.privacy}</a>
        </span>
      </footer>
    </div>
  );
}
