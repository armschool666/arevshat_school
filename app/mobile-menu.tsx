"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

export type MobileNavItem = {
  key: string;
  href: string;
  label: string;
  children?: { key: string; href: string; label: string }[];
};

export function MobileMenu({ items }: { items: MobileNavItem[] }) {
  const t = useTranslations("mobileMenu");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      <button
        className={`burger-btn${open ? " burger-btn--open" : ""}`}
        aria-label={open ? t("closeLabel") : t("openLabel")}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && <div className="mobile-nav-backdrop" onClick={close} />}

      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-top">
          <button className="mobile-nav-close" onClick={close} aria-label={t("closeLabel")}>
            ✕
          </button>
        </div>

        <div className="mobile-nav-body">
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expanded === item.key;

            if (!hasChildren) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={close}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.key} className="mobile-nav-group">
                <button
                  className={`mobile-nav-toggle${isExpanded ? " mobile-nav-toggle--open" : ""}`}
                  onClick={() => setExpanded(isExpanded ? null : item.key)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav-arrow">{isExpanded ? "▴" : "▾"}</span>
                </button>
                {isExpanded && (
                  <div className="mobile-nav-sub">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="mobile-nav-sub-link"
                        onClick={close}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
