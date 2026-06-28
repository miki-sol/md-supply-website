"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Button } from "@/components/ui/button";

const KEY = "mdsupply-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage недоступен — баннер не показываем
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
        >
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-border-subtle bg-surface p-5 shadow-card sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-fg-muted">
              Мы используем файлы cookie для корректной работы сайта и аналитики. Продолжая
              пользоваться сайтом, вы соглашаетесь с{" "}
              <Link href="/privacy" className="text-red hover:underline">
                политикой конфиденциальности
              </Link>
              .
            </p>
            <Button size="sm" onClick={accept} className="shrink-0">
              Принять
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
