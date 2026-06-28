import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadButton } from "@/components/forms/lead-button";
import { Reveal } from "@/components/ui/reveal";
import { servicesContent } from "@/lib/content";

export function generateStaticParams() {
  return servicesContent.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesContent.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.excerpt,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesContent.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = servicesContent.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.excerpt}
        crumbs={[{ title: "Услуги", href: "/services" }, { title: service.title }]}
      >
        <LeadButton kind="quote" size="lg" className="bg-white text-ink hover:bg-white/90">
          Запросить КП <ArrowRight className="h-4 w-4" />
        </LeadButton>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red/10 text-red">
              <service.icon className="h-7 w-7" />
            </span>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{service.intro}</p>

            <h2 className="mt-10 text-2xl font-bold text-fg">Что входит в услугу</h2>
            <ul className="mt-6 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-fg sm:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-card border border-border-subtle bg-bg-soft p-8">
              <h3 className="text-xl font-bold text-fg">Обсудим вашу задачу?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                Расскажите о канале продаж и объёмах — подготовим персональное предложение и
                рассчитаем условия.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <LeadButton kind="quote" size="lg" className="w-full">
                  Запросить КП
                </LeadButton>
                <LeadButton kind="callback" size="lg" variant="outline" className="w-full">
                  Заказать звонок
                </LeadButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="border-t border-border-subtle bg-bg-soft py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-fg">Другие услуги</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-card border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
              >
                <s.icon className="h-6 w-6 text-red" />
                <h3 className="mt-3 font-bold text-fg group-hover:text-red">{s.title}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/services" variant="outline">
              Все услуги <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
