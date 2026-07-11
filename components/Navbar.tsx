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
        {/* Top row: logo + toggle (always visible) */}
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-mono text-sm font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            berkant@dev:~$
          </Link>

          <div className="flex items-center gap-1">
            {/* Desktop nav items */}
            <div className="hidden md:flex items-center gap-1">
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

            {/* Mobile toggle */}
            <div className="md:hidden">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Mobile nav items (secondary row) */}
        <div className="md:hidden -mt-1 pb-2.5 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors font-mono whitespace-nowrap ${
                  isActive
                    ? "text-foreground bg-surface-hover"
                    : "text-foreground-dim hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
