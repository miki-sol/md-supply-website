import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { MapPin, PackageCheck, Truck, Wallet, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const optionIcons = [Truck, MapPin, PackageCheck];
const paymentIcons = [Wallet, Clock, Truck];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Delivery" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/delivery"),
  };
}

export default async function DeliveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Delivery");

  const options = t.raw("options") as { title: string; text: string }[];
  const regions = t.raw("regions") as string[];
  const payments = t.raw("payments") as { title: string; text: string }[];

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <SectionHeader eyebrow={t("delivery.eyebrow")} title={t("delivery.title")} className="mb-12" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {options.map((o, i) => {
            const Icon = optionIcons[i];
            return (
              <RevealItem key={o.title}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-fg">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{o.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Geography */}
      <section className="border-y border-border-subtle bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeader
                eyebrow={t("geography.eyebrow")}
                title={t("geography.title")}
                description={t("geography.description")}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {regions.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-[15px] font-medium text-fg"
                  >
                    <MapPin className="h-4 w-4 text-accent" /> {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Payment */}
      <Section>
        <SectionHeader eyebrow={t("payment.eyebrow")} title={t("payment.title")} className="mb-12" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {payments.map((p, i) => {
            const Icon = paymentIcons[i];
            return (
              <RevealItem key={p.title}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-fg">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-8 rounded-card border border-border-subtle bg-bg-soft p-5 text-sm text-fg-muted">
          {t("disclaimer")}
        </p>
      </Section>

      <CTASection />
    </>
  );
}
