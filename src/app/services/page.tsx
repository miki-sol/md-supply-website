import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { CTASection } from "@/components/cta-section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { servicesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Услуги MD Supply: дистрибуция, формирование ассортимента, мерчандайзинг, логистика и маркетинговые услуги для торговых компаний Беларуси.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Услуги"
        description="Полный цикл работы с товаром: дистрибуция, ассортимент, мерчандайзинг, логистика и маркетинг — под задачи вашего канала продаж."
        crumbs={[{ title: "Услуги" }]}
      />

      <Section>
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {servicesContent.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-card border border-border-subtle bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 flex items-center gap-1.5 text-xl font-bold text-fg">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red" />
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-red">
                  Подробнее
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTASection />
    </>
  );
}
