import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contacts" });

  return {
    title: t("meta.title"),
    description: t("meta.description", {
      address: site.address,
      phone: site.phone.display,
      email: site.email,
    }),
    alternates: localizedAlternates(locale, "/contacts"),
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contacts");

  return (
    <>
      <PageHeader
        title={t("heading")}
        description={t("subheading")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5">
              <ContactItem icon={<MapPin className="h-5 w-5" />} title={t("address")}>
                {site.address}
              </ContactItem>
              <ContactItem icon={<Phone className="h-5 w-5" />} title={t("phone")}>
                <a href={site.phone.href} className="block hover:text-accent">{site.phone.display}</a>
              </ContactItem>
              <ContactItem icon={<Mail className="h-5 w-5" />} title={t("emailLabel")}>
                <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
              </ContactItem>
            </div>

            <div className="mt-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-muted">
                {t("messengers")}
              </div>
              <div className="flex flex-wrap gap-3">
                <Messenger href={site.socials.telegram} label="Telegram" />
                <Messenger href={site.socials.viber} label="Viber" />
                <Messenger href={site.socials.whatsapp} label="WhatsApp" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-surface p-7 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-fg">{t("form.title")}</h2>
              <p className="mt-1.5 text-sm text-fg-muted">{t("form.intro")}</p>
              <div className="mt-6">
                <LeadForm kind="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
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
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-accent">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{title}</div>
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
      className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-red hover:text-accent"
    >
      <Send className="h-4 w-4 text-accent" /> {label}
    </a>
  );
}
