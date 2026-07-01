import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { footerColumns, serviceLinks } from "@/lib/nav";
import { site } from "@/lib/site";

export async function Footer() {
  const tf = await getTranslations("Nav.footer");
  const tm = await getTranslations("Nav.main");
  const ts = await getTranslations("Services.items");

  return (
    <footer className="border-t border-border-subtle bg-bg-soft">
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {tf("intro", { legalName: site.legalName })}
            </p>
            <div className="mt-5 flex gap-2.5">
              <Social href={site.socials.telegram} label="Telegram"><Send className="h-4 w-4" /></Social>
              <Social href={site.socials.viber} label="Viber"><Phone className="h-4 w-4" /></Social>
              <Social href={site.socials.whatsapp} label="WhatsApp"><Mail className="h-4 w-4" /></Social>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-fg">{tf(col.titleKey)}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                      {tm(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-fg">{tf("servicesTitle")}</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                    {ts(`${s.slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border-subtle py-8 sm:grid-cols-2 lg:grid-cols-3">
          <ContactLine icon={<MapPin className="h-5 w-5 text-accent" />} title={tf("addressLabel")}>
            {site.address}
          </ContactLine>
          <ContactLine icon={<Phone className="h-5 w-5 text-accent" />} title={tf("phoneLabel")}>
            <a href={site.phone.href} className="hover:text-accent">{site.phone.display}</a>
          </ContactLine>
          <ContactLine icon={<Mail className="h-5 w-5 text-accent" />} title={tf("emailLabel")}>
            <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
          </ContactLine>
        </div>

        <div className="border-t border-border-subtle py-4 text-xs text-fg-muted">
          <p className="mb-1">
            {tf("legalLine", {
              fullName: site.requisites.fullName,
              unp: site.requisites.unp,
            })}
          </p>
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
