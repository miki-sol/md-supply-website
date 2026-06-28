"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LeadForm, type LeadKind } from "./lead-form";

const titles: Record<LeadKind, { title: string; subtitle: string }> = {
  callback: {
    title: "Заказать обратный звонок",
    subtitle: "Оставьте номер — перезвоним в рабочее время и ответим на вопросы.",
  },
  quote: {
    title: "Запросить коммерческое предложение",
    subtitle: "Подготовим персональное КП с ценами и условиями под ваш канал продаж.",
  },
  contact: {
    title: "Оставить заявку",
    subtitle: "Напишите нам — менеджер свяжется с вами и поможет с подбором.",
  },
  vacancy: {
    title: "Отклик на вакансию",
    subtitle: "Расскажите о себе — мы рассмотрим отклик и свяжемся с вами.",
  },
};

type Ctx = { open: (kind: LeadKind) => void };
const LeadContext = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used within LeadProvider");
  return ctx;
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<LeadKind | null>(null);

  const open = useCallback((k: LeadKind) => setKind(k), []);
  const close = useCallback(() => setKind(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (kind) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [kind, close]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {kind && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={titles[kind].title}
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-t-3xl bg-surface p-6 shadow-card sm:rounded-3xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Закрыть"
                onClick={close}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mb-5 pr-8">
                <h2 className="text-xl font-bold text-fg">{titles[kind].title}</h2>
                <p className="mt-1.5 text-sm text-fg-muted">{titles[kind].subtitle}</p>
              </div>
              <LeadForm kind={kind} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}
