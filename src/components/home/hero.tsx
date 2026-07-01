"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LeadButton } from "@/components/forms/lead-button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("Home.hero");
  const tc = useTranslations("Common.actions");
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 grid-lines opacity-[0.08]" aria-hidden />
      <div
        className="absolute right-0 top-0 hidden h-full w-[60%] accent-bar opacity-95 sm:block"
        style={{ clipPath: "polygon(32% 0, 100% 0, 100% 100%, 0% 100%)" }}
        aria-hidden
      />
      <div className="absolute right-0 top-0 hidden h-full w-[60%] bg-ink/30 mix-blend-multiply sm:block" aria-hidden
        style={{ clipPath: "polygon(46% 0, 100% 0, 100% 100%, 14% 100%)" }}
      />
      {/* Мобильный акцент — диагональная полоса снизу, чтобы текст не ложился на красный */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 accent-bar opacity-95 sm:hidden"
        style={{ clipPath: "polygon(0 55%, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden
      />

      <Container>
        <div className="relative grid items-center gap-10 py-14 sm:gap-12 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="text-[2rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
            >
              {t.rich("title", {
                hl: (chunks) => (
                  <span className="relative whitespace-nowrap">
                    <span className="relative z-10">{chunks}</span>
                  </span>
                ),
              })}
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              {t("subtitle")}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <LeadButton kind="quote" size="lg" className="bg-white text-ink hover:bg-white/90">
                {tc("requestQuote")} <ArrowRight className="h-4 w-4" />
              </LeadButton>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
              <div className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {t("badge")}
              </div>
              <ul className="mt-5 space-y-3.5">
                {(t.raw("points") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-white/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-red-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
