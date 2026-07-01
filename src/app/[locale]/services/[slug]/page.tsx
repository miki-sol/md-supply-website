import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadButton } from "@/components/forms/lead-button";
import { Reveal } from "@/components/ui/reveal";
import { serviceSlugs, serviceIcons, type ServiceSlug } from "@/lib/content";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

function isServiceSlug(slug: string): slug is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "Services.items" });
  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.excerpt`),
    alternates: localizedAlternates(locale, `/services/${slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  setRequestLocale(locale);

  const ts = await getTranslations("Services.items");
  const td = await getTranslations("Services.detail");
  const ta = await getTranslations("Common.actions");

  const Icon = serviceIcons[slug];
  const features = ts.raw(`${slug}.features`) as string[];
  const others = serviceSlugs.filter((s) => s !== slug);

  return (
    <>
      <PageHeader
        title={ts(`${slug}.title`)}
        description={ts(`${slug}.excerpt`)}
        crumbs={[{ title: td("crumb"), href: "/services" }, { title: ts(`${slug}.title`) }]}
      >
        <LeadButton kind="quote" size="lg" className="bg-white text-ink hover:bg-white/90">
          {ta("requestQuote")} <ArrowRight className="h-4 w-4" />
        </LeadButton>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red/10 text-accent">
              <Icon className="h-7 w-7" />
            </span>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{ts(`${slug}.intro`)}</p>

            <h2 className="mt-10 text-2xl font-bold text-fg">{td("featuresTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-accent">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-fg sm:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-card border border-border-subtle bg-bg-soft p-8">
              <h3 className="text-xl font-bold text-fg">{td("asideTitle")}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{td("asideText")}</p>
              <div className="mt-6 flex flex-col gap-3">
                <LeadButton kind="quote" size="lg" className="w-full">
                  {ta("requestQuote")}
                </LeadButton>
                <LeadButton kind="callback" size="lg" variant="outline" className="w-full">
                  {ta("callbackAlt")}
                </LeadButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="border-t border-border-subtle bg-bg-soft py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-fg">{td("others")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => {
              const OtherIcon = serviceIcons[s];
              return (
                <Link
                  key={s}
                  href={`/services/${s}`}
                  className="group rounded-card border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
                >
                  <OtherIcon className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 font-bold text-fg group-hover:text-accent">{ts(`${s}.title`)}</h3>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <ButtonLink href="/services" variant="outline">
              {ta("allServices")} <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
