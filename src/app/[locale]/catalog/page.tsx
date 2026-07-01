import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { Download, FileSpreadsheet, Package, Sparkles, Store, Building2, Boxes, Gem } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadButton } from "@/components/forms/lead-button";
import { CTASection } from "@/components/cta-section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";

const CATEGORY_ICONS = [Package, Sparkles, Store, Building2, Boxes, Gem];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Catalog" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/catalog"),
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Catalog");

  const categories = t.raw("categories") as { title: string; desc: string; items: string[] }[];

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      >
        <ButtonLink href="/price-list.pdf" size="lg" className="bg-white text-ink hover:bg-white/90">
          <Download className="h-4 w-4" /> {t("downloadPrice")}
        </ButtonLink>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow={t("range.eyebrow")}
          title={t("range.title")}
          description={t("range.description")}
          className="mb-12"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = CATEGORY_ICONS[i];
            return (
              <RevealItem key={c.title}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-fg">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{c.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border-subtle bg-bg-soft px-3 py-1 text-xs font-medium text-fg-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <section className="border-y border-border-subtle bg-bg-soft py-16">
        <Container>
          <Reveal>
            <DownloadCard
              icon={<FileSpreadsheet className="h-7 w-7 text-accent" />}
              title={t("priceCard.title")}
              text={t("priceCard.text")}
              href="/price-list.pdf"
            />
          </Reveal>
          <div className="mt-8 rounded-card border border-border-subtle bg-surface p-6 text-center sm:p-8">
            <p className="text-fg-muted">{t("quotePrompt")}</p>
            <div className="mt-4">
              <LeadButton kind="quote" size="lg">
                {t("quoteButton")}
              </LeadButton>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function DownloadCard({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-5 rounded-card border border-border-subtle bg-surface p-6 transition-all hover:border-red/40 hover:shadow-card"
    >
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red/10">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="font-bold text-fg">{title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{text}</p>
      </div>
      <Download className="h-5 w-5 shrink-0 text-fg-muted transition-colors group-hover:text-accent" />
    </a>
  );
}
