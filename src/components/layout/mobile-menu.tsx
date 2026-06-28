"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Mail, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";
import { LeadButton } from "@/components/forms/lead-button";
import { mainNav, services } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface shadow-card"
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
              <Logo />
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-fg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href} className="border-b border-border-subtle/70">
                    {item.children ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-fg"
                        >
                          Услуги
                          <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <m.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <li>
                                <Link href="/services" onClick={onClose} className="block py-2.5 pl-3 text-[15px] text-fg-muted hover:text-red">
                                  Все услуги
                                </Link>
                              </li>
                              {services.map((s) => (
                                <li key={s.href}>
                                  <Link href={s.href} onClick={onClose} className="block py-2.5 pl-3 text-[15px] text-fg-muted hover:text-red">
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </m.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block py-3.5 text-base font-medium transition-colors hover:text-red",
                          pathname === item.href ? "text-red" : "text-fg",
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-border-subtle px-5 py-4">
              <div className="flex items-center justify-between">
                <a href={site.phone.href} className="flex items-center gap-2 font-semibold text-fg">
                  <Phone className="h-4 w-4 text-red" /> {site.phone.display}
                </a>
                <ThemeToggle />
              </div>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-fg-muted">
                <Mail className="h-4 w-4 text-red" /> {site.email}
              </a>
              <LeadButton kind="callback" size="lg" className="w-full">
                Заказать звонок
              </LeadButton>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
