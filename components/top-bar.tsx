"use client";

import { COPY } from "@/lib/copy";
import { useLang, type Lang } from "@/components/lang";

export function TopBar({ page }: { page?: "research" | "funding" | "about" | "contact" | "privacy" }) {
  const { lang, setLang } = useLang();
  const text = COPY[lang];

  return (
    <div className="rule">
      {page ? (
        <a className="brand-link" href="/" aria-label="ROBOTZERO">
          <img className="brand-mini" src="/brand/robotzero.png" alt="" />
        </a>
      ) : (
        <span>robotzero.com</span>
      )}
      <div className="rule-right">
        {page ? <span className="rule-label">{text[page]}</span> : null}
        <div className="lang-switch" role="group" aria-label={text.langLabel}>
          <LangButton current={lang} value="zh" onPick={setLang}>
            中文
          </LangButton>
          <LangButton current={lang} value="en" onPick={setLang}>
            EN
          </LangButton>
        </div>
      </div>
    </div>
  );
}

function LangButton({
  current,
  value,
  onPick,
  children,
}: {
  current: Lang;
  value: Lang;
  onPick: (lang: Lang) => void;
  children: string;
}) {
  return (
    <button type="button" aria-pressed={current === value} onClick={() => onPick(value)}>
      {children}
    </button>
  );
}
