"use client";

import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground-dim font-mono">
            © {new Date().getFullYear()} Berkant Soytaş — {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground-dim font-mono">
            <span>{t("footer.tagline")}</span>
            <a
              href="https://github.com/berkantsoytas/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t("footer.source")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
