"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

export function BackToTop() {
  const t = useTranslations("Common");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          aria-label={t("backToTop")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-card transition-colors hover:bg-red dark:bg-white dark:text-ink dark:hover:bg-red dark:hover:text-white"
        >
          <ArrowUp className="h-5 w-5" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
