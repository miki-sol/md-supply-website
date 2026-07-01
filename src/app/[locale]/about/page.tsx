import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { ShieldCheck, Handshake, Target, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { TrustBand } from "@/components/trust-band";
import { CTASection } from "@/components/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const valueIcons = [Handshake, Target, ShieldCheck, Sparkles];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  const values = t.raw("values.items") as { title: string; text: string }[];
  const approach = t.raw("approach.items") as { title: string; text: string }[];

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader eyebrow={t("whoWeAre.eyebrow")} title={t("whoWeAre.title")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted sm:text-base">
              <p>{t("whoWeAre.p1", { legalName: site.legalName })}</p>
              <p>{t("whoWeAre.p2")}</p>
              <p>{t("whoWeAre.p3")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-bg-soft p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
                <ShieldCheck className="h-5 w-5 text-accent" /> {t("mission.heading")}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{t("mission.text")}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <TrustBand />

      <Section>
        <SectionHeader
          align="center"
          eyebrow={t("values.eyebrow")}
          title={t("values.title")}
          className="mb-14"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <RevealItem key={v.title}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-fg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <section className="bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
            description={t("approach.description")}
            className="mb-12 sm:mb-14"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <RevealItem key={a.title}>
                <div className="h-full rounded-card border border-border-subtle bg-surface p-7">
                  <h3 className="text-lg font-bold text-fg">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
