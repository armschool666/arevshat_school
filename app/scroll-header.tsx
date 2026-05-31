"use client";

import { useEffect, useRef } from "react";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) {
        el.classList.add("site-header--hidden");
      } else {
        el.classList.remove("site-header--hidden");
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className="site-header">
      {children}
    </header>
  );
}
