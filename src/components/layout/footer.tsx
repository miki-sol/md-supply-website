import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border-subtle bg-bg-soft">
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {site.legalName} — дистрибуция и поставки широкого ассортимента товаров по всей
              Республике Беларусь. Опт, розница, HoReCa и интернет-магазины.
            </p>
            <div className="mt-5 flex gap-2.5">
              <Social href={site.socials.telegram} label="Telegram"><Send className="h-4 w-4" /></Social>
              <Social href={site.socials.viber} label="Viber"><Phone className="h-4 w-4" /></Social>
              <Social href={site.socials.whatsapp} label="WhatsApp"><Mail className="h-4 w-4" /></Social>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-fg">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 border-t border-border-subtle py-8 sm:grid-cols-2 lg:grid-cols-3">
          <ContactLine icon={<MapPin className="h-5 w-5 text-accent" />} title="Адрес">
            {site.address}
          </ContactLine>
          <ContactLine icon={<Phone className="h-5 w-5 text-accent" />} title="Телефон">
            <a href={site.phone.href} className="hover:text-accent">{site.phone.display}</a>
          </ContactLine>
          <ContactLine icon={<Mail className="h-5 w-5 text-accent" />} title="Почта">
            <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
          </ContactLine>
        </div>

        <div className="border-t border-border-subtle py-4 text-xs text-fg-muted">
          <p className="mb-1">
            {site.requisites.fullName}. УНП {site.requisites.unp}. {site.requisites.address}.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border-subtle py-5 text-sm text-fg-muted sm:flex-row sm:items-center">
          <p>© {year} {site.legalName}. Все права защищены.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-accent">Политика конфиденциальности</Link>
            <Link href="/faq" className="hover:text-accent">Вопросы и ответы</Link>
            <Link href="/careers" className="hover:text-accent">Вакансии</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-fg-muted transition-colors hover:border-red hover:bg-red hover:text-white"
    >
      {children}
    </a>
  );
}

function ContactLine({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-fg">{children}</div>
      </div>
    </div>
  );
}
