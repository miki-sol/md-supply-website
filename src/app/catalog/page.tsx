import type { Metadata } from "next";
import { Download, FileSpreadsheet } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadButton } from "@/components/forms/lead-button";
import { CTASection } from "@/components/cta-section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { catalogCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Каталог и ассортимент",
  description:
    "Каталог товаров MD Supply: продукты питания, бытовая химия, товары для дома, HoReCa и собственная торговая марка. Скачайте прайс-лист и каталог.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        title="Каталог и ассортимент"
        description="Широкий ассортимент в шести товарных направлениях. Актуальный прайс-лист и каталог доступны для скачивания."
        crumbs={[{ title: "Каталог" }]}
      >
        <ButtonLink href="/price-list.pdf" size="lg" className="bg-white text-ink hover:bg-white/90">
          <Download className="h-4 w-4" /> Скачать прайс-лист
        </ButtonLink>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="Ассортимент"
          title="Товарные направления"
          description="Сайт носит информационный характер — оформление заказов и цены уточняйте у менеджера или в прайс-листе."
          className="mb-12"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalogCategories.map((c) => (
            <RevealItem key={c.title}>
              <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                  <c.icon className="h-6 w-6" />
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
          ))}
        </RevealGroup>
      </Section>

      {/* Скачать документы */}
      <section className="border-y border-border-subtle bg-bg-soft py-16">
        <Container>
          <Reveal>
            <DownloadCard
              icon={<FileSpreadsheet className="h-7 w-7 text-accent" />}
              title="Прайс-лист (PDF)"
              text="Актуальные цены и позиции для оптовых клиентов. Обновляется регулярно."
              href="/price-list.pdf"
            />
          </Reveal>
          <div className="mt-8 rounded-card border border-border-subtle bg-surface p-6 text-center sm:p-8">
            <p className="text-fg-muted">
              Нужен прайс под ваш канал продаж? Запросите персональное предложение.
            </p>
            <div className="mt-4">
              <LeadButton kind="quote" size="lg">
                Запросить прайс и КП
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
