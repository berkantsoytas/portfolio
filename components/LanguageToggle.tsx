"use client";

import { useI18n } from "@/lib/i18n-context";

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
      className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-border hover:border-border-bright transition-colors"
      aria-label="Toggle language"
    >
      <span
        className={
          locale === "tr"
            ? "text-foreground"
            : "text-foreground-dim"
        }
      >
        TR
      </span>
      <span className="text-foreground-dim">/</span>
      <span
        className={
          locale === "en"
            ? "text-foreground"
            : "text-foreground-dim"
        }
      >
        EN
      </span>
    </button>
  );
}
