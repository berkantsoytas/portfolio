"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import LanguageToggle from "./LanguageToggle";

const navItems = [
  { href: "/", labelKey: "nav.home" },
  { href: "/portfolio", labelKey: "nav.portfolio" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/notes", labelKey: "nav.notes" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-mono text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            berkant@dev:~$
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors font-mono ${
                    isActive
                      ? "text-foreground bg-surface-hover"
                      : "text-foreground-dim hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="ml-2 pl-2 border-l border-border">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
