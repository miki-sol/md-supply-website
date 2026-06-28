import type { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты MD Supply: ${site.address}. Телефон ${site.phone.display}, e-mail ${site.email}. Карта проезда и форма обратной связи.`,
  alternates: { canonical: "/contacts" },
};

const { lat, lng } = site.geo;
const bbox = `${lng - 0.012}%2C${lat - 0.006}%2C${lng + 0.012}%2C${lat + 0.006}`;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Контакты"
        description="Свяжитесь с нами удобным способом — ответим в рабочее время и поможем с подбором ассортимента и условиями."
        crumbs={[{ title: "Контакты" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5">
              <ContactItem icon={<MapPin className="h-5 w-5" />} title="Адрес">
                {site.address}
              </ContactItem>
              <ContactItem icon={<Phone className="h-5 w-5" />} title="Телефон">
                <a href={site.phone.href} className="block hover:text-red">{site.phone.display}</a>
              </ContactItem>
              <ContactItem icon={<Mail className="h-5 w-5" />} title="E-mail">
                <a href={`mailto:${site.email}`} className="hover:text-red">{site.email}</a>
              </ContactItem>
            </div>

            <div className="mt-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-muted">
                Мессенджеры
              </div>
              <div className="flex flex-wrap gap-3">
                <Messenger href={site.socials.telegram} label="Telegram" />
                <Messenger href={site.socials.viber} label="Viber" />
                <Messenger href={site.socials.whatsapp} label="WhatsApp" />
              </div>
            </div>

            <div className="mt-8 rounded-card border border-border-subtle bg-bg-soft p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-fg">Реквизиты</h3>
              <dl className="mt-3 space-y-1.5 text-sm text-fg-muted">
                <div>{site.requisites.fullName}</div>
                <div>УНП {site.requisites.unp}</div>
                <div>Р/с {site.requisites.account}</div>
                <div>{site.requisites.bank}, БИК {site.requisites.bik}</div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-surface p-7 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-fg">Форма обратной связи</h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Напишите нам — менеджер свяжется с вами в ближайшее рабочее время.
              </p>
              <div className="mt-6">
                <LeadForm kind="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Карта */}
      <section className="pb-20">
        <Container>
          <div className="overflow-hidden rounded-card border border-border-subtle">
            <iframe
              title={`MD Supply на карте — ${site.addressShort}`}
              src={mapSrc}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ash">{title}</div>
        <div className="mt-1 text-[15px] font-medium leading-relaxed text-fg">{children}</div>
      </div>
    </div>
  );
}

function Messenger({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-red hover:text-red"
    >
      <Send className="h-4 w-4 text-red" /> {label}
    </a>
  );
}
