import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Check, Handshake, Store, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cooperation" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/cooperation"),
  };
}

export default async function CooperationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Cooperation");

  const wholesale = t.raw("wholesale.items") as string[];
  const partners = t.raw("partners.items") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];
  const quoteItems = t.raw("quote.items") as string[];

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <ConditionsCard
              icon={<Store className="h-6 w-6" />}
              title={t("wholesale.title")}
              text={t("wholesale.text")}
              items={wholesale}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ConditionsCard
              icon={<Handshake className="h-6 w-6" />}
              title={t("partners.title")}
              text={t("partners.text")}
              items={partners}
            />
          </Reveal>
        </div>
      </Section>

      <section className="border-y border-border-subtle bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            align="center"
            eyebrow={t("howWeWork.eyebrow")}
            title={t("howWeWork.title")}
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="relative h-full rounded-card border border-border-subtle bg-surface p-6">
                  <span className="font-display text-3xl font-extrabold text-accent/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-bold text-fg">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={t("quote.eyebrow")}
              title={t("quote.title")}
              description={t("quote.description")}
            />
            <ul className="mt-8 space-y-3">
              {quoteItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-fg">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red/10 text-accent">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-card border border-border-subtle bg-bg-soft p-5">
              <Truck className="h-8 w-8 shrink-0 text-accent" />
              <p className="text-sm text-fg-muted">{t("quote.deliveryNote")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-surface p-7 shadow-soft sm:p-8">
              <h3 className="text-xl font-bold text-fg">{t("quote.formTitle")}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{t("quote.formSubtitle")}</p>
              <div className="mt-6">
                <LeadForm kind="quote" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ConditionsCard({
  icon,
  title,
  text,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-8">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
        {icon}
      </span>
      <h2 className="mt-5 text-2xl font-bold text-fg">{title}</h2>
      <p className="mt-2 text-[15px] text-fg-muted">{text}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-accent">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[15px] leading-relaxed text-fg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
