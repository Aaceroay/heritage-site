"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

export function MobileNav({
  items,
  menuLabel,
  closeLabel,
}: {
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 text-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:text-ink-dark dark:hover:bg-white/10"
      >
        <span className="sr-only">{open ? closeLabel : menuLabel}</span>
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="absolute inset-x-0 top-full z-40 border-t border-ink/10 bg-paper px-4 py-4 shadow-lg dark:border-white/10 dark:bg-paper-dark"
        >
          <nav aria-label={menuLabel}>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:text-ink-dark dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
