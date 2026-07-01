import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/home/hero";
import { TrustBand } from "@/components/trust-band";
import { CTASection } from "@/components/cta-section";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { serviceSlugs, serviceIcons, advantageIcons, brandChannelIcons } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const ts = await getTranslations("Services.items");

  const advantages = t.raw("advantages.items") as { title: string; text: string }[];
  const channels = t.raw("channels.items") as { name: string; text: string }[];

  return (
    <>
      <Hero />
      <TrustBand />

      <Section>
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          description={t("services.description")}
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {serviceSlugs.map((slug) => {
            const Icon = serviceIcons[slug];
            return (
              <RevealItem key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="group flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent transition-colors group-hover:bg-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 flex items-center gap-1.5 text-xl font-bold text-fg">
                    {ts(`${slug}.title`)}
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{ts(`${slug}.excerpt`)}</p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <section className="bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            align="center"
            eyebrow={t("advantages.eyebrow")}
            title={t("advantages.title")}
            description={t("advantages.description")}
            className="mb-14"
          />
          <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, i) => {
              const Icon = advantageIcons[i];
              return (
                <RevealItem key={a.title} className="bg-surface">
                  <div className="flex h-full flex-col p-7">
                    {Icon && <Icon className="h-7 w-7 text-accent" />}
                    <h3 className="mt-4 text-lg font-bold text-fg">{a.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{a.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow={t("channels.eyebrow")}
            title={t("channels.title")}
            description={t("channels.description")}
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {channels.map((c, i) => {
              const Icon = brandChannelIcons[i];
              return (
                <RevealItem key={c.name}>
                  <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-6">
                    {Icon && <Icon className="h-7 w-7 text-accent" />}
                    <h3 className="mt-4 font-bold text-fg">{c.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
