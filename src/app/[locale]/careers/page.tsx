import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Briefcase, GraduationCap, HeartHandshake, MapPin, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { LeadButton } from "@/components/forms/lead-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const perkIcons = [TrendingUp, HeartHandshake, GraduationCap];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/careers"),
  };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  const perks = t.raw("perks") as { title: string; text: string }[];
  const jobs = t.raw("jobs") as { title: string; type: string; city: string; desc: string }[];

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <RevealGroup className="mb-16 grid gap-5 md:grid-cols-3">
          {perks.map((p, i) => {
            const Icon = perkIcons[i];
            return (
              <RevealItem key={p.title}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                  <Icon className="h-7 w-7 text-accent" />
                  <h3 className="mt-4 text-lg font-bold text-fg">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <SectionHeader eyebrow={t("openPositions.eyebrow")} title={t("openPositions.title")} className="mb-10" />
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05}>
              <div className="flex flex-col gap-4 rounded-card border border-border-subtle bg-surface p-6 transition-colors hover:border-red/40 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-fg">{job.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{job.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag icon={<Briefcase className="h-3.5 w-3.5" />}>{job.type}</Tag>
                    <Tag icon={<MapPin className="h-3.5 w-3.5" />}>{job.city}</Tag>
                  </div>
                </div>
                <LeadButton kind="vacancy" className="shrink-0">
                  {t("apply")}
                </LeadButton>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-t border-border-subtle bg-bg-soft py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg">{t("noMatch.heading")}</h2>
            <p className="mt-3 text-fg-muted">{t("noMatch.text")}</p>
            <div className="mt-6 flex justify-center">
              <LeadButton kind="vacancy" size="lg">
                {t("noMatch.cta")}
              </LeadButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-soft px-3 py-1 text-xs font-medium text-fg-muted">
      {icon}
      {children}
    </span>
  );
}
