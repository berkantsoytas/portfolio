"use client";

import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";

export default function TerminalHero() {
  const { t } = useI18n();

  return (
    <section className="py-16 sm:py-24">
      <div className="font-mono text-sm text-foreground-dim mb-6">
        <span className="text-foreground-dim">$</span>{" "}
        <span className="text-foreground">{t("hero.command")}</span>
      </div>

      <div className="font-mono text-sm space-y-1.5 mb-10 pl-4 border-l-2 border-border">
        <div>
          <span className="text-foreground-dim">{`{`}</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"name"</span>
          <span className="text-foreground-dim">: </span>
          <span className="text-foreground">"Berkant Soytaş"</span>
          <span className="text-foreground-dim">,</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"role"</span>
          <span className="text-foreground-dim">: </span>
          <span className="text-foreground">"Software Architect"</span>
          <span className="text-foreground-dim">,</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"specialty"</span>
          <span className="text-foreground-dim">: </span>
          <span className="text-foreground">"Systems Programming"</span>
          <span className="text-foreground-dim">,</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"status"</span>
          <span className="text-foreground-dim">: </span>
          <span className="text-green-400">"open to work"</span>
          <span className="text-foreground-dim">,</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"location"</span>
          <span className="text-foreground-dim">: </span>
          <span className="text-foreground">"Adana, TR"</span>
          <span className="text-foreground-dim">,</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground-dim">"stack"</span>
          <span className="text-foreground-dim">: [</span>
          <span className="text-foreground">"Go"</span>
          <span className="text-foreground-dim">, </span>
          <span className="text-foreground">"Node.js"</span>
          <span className="text-foreground-dim">, </span>
          <span className="text-foreground">"Rust"</span>
          <span className="text-foreground-dim">, </span>
          <span className="text-foreground">"Solidity"</span>
          <span className="text-foreground-dim">, </span>
          <span className="text-foreground">"Kafka"</span>
          <span className="text-foreground-dim">, </span>
          <span className="text-foreground">"Redis"</span>
          <span className="text-foreground-dim">]</span>
        </div>
        <div>
          <span className="text-foreground-dim">{`}`}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-foreground-dim mb-8">
        <span className="font-mono text-sm text-foreground-dim">
          ~/profile $
        </span>
        <span className="inline-block w-2 h-4 bg-foreground cursor-blink" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-mono font-semibold text-foreground mb-4 leading-tight">
        {t("hero.title")}
      </h1>
      <p className="text-lg text-foreground-dim max-w-xl mb-6 leading-relaxed">
        {t("hero.description")}
      </p>

      <div className="flex items-center gap-2 mb-8">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-green-400">available for hire</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/portfolio"
          className="inline-flex items-center px-5 py-2.5 text-sm font-mono rounded-md bg-foreground text-surface font-medium hover:opacity-80 transition-opacity"
        >
          {t("hero.cta")}
          <span className="ml-2">→</span>
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center px-5 py-2.5 text-sm font-mono rounded-md border border-border hover:border-border-bright text-foreground-dim hover:text-foreground transition-colors"
        >
          {t("hero.secondary")}
        </Link>
      </div>
    </section>
  );
}
