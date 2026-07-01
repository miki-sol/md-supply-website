import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { CTASection } from "@/components/cta-section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { serviceSlugs, serviceIcons } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.page" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tp = await getTranslations("Services.page");
  const ts = await getTranslations("Services.items");
  const ta = await getTranslations("Common.actions");

  return (
    <>
      <PageHeader title={tp("title")} description={tp("description")} crumbs={[{ title: tp("title") }]} />

      <Section>
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {serviceSlugs.map((slug) => {
            const Icon = serviceIcons[slug];
            return (
              <RevealItem key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="group flex h-full flex-col rounded-card border border-border-subtle bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent transition-colors group-hover:bg-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 flex items-center gap-1.5 text-xl font-bold text-fg">
                    {ts(`${slug}.title`)}
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{ts(`${slug}.excerpt`)}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {ta("details")}
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <CTASection />
    </>
  );
}
