"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { LeadButton } from "@/components/forms/lead-button";
import { mainNav, services } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Основная панель */}
      <div
        className={cn(
          "border-b border-border-subtle transition-all duration-300",
          scrolled ? "bg-bg/85 backdrop-blur-md shadow-soft" : "bg-bg",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Link href="/" aria-label="MD Supply — на главную">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {mainNav.map((item) =>
                item.children ? (
                  <ServicesDropdown key={item.href} active={pathname.startsWith(item.href)} />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-red",
                      pathname === item.href ? "text-red" : "text-fg",
                    )}
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={site.phone.href}
                className="hidden items-center gap-2 text-[15px] font-semibold text-fg transition-colors hover:text-red 2xl:flex"
              >
                <Phone className="h-4 w-4 text-red" />
                {site.phone.display}
              </a>
              <ThemeToggle className="hidden sm:inline-flex" />
              <LeadButton kind="callback" size="sm" className="hidden md:inline-flex">
                Обратный звонок
              </LeadButton>
              <ButtonLink href="/cooperation" size="sm" variant="secondary" className="hidden 2xl:inline-flex">
                Сотрудничество
              </ButtonLink>
              <button
                type="button"
                aria-label="Меню"
                aria-expanded={openMenu}
                onClick={() => setOpenMenu(true)}
                className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border-subtle xl:hidden"
              >
                <span className="h-0.5 w-5 bg-fg" />
                <span className="h-0.5 w-5 bg-fg" />
                <span className="h-0.5 w-5 bg-fg" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} />
    </header>
  );
}

function ServicesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/services"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-red",
          active ? "text-red" : "text-fg",
        )}
      >
        Услуги
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </Link>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border-subtle bg-surface p-3 shadow-card">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl p-3 transition-colors hover:bg-bg-soft"
                >
                  <span className="block font-semibold text-fg group-hover:text-red">{s.title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-fg-muted">{s.desc}</span>
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
