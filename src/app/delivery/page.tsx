import type { Metadata } from "next";
import { MapPin, PackageCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { deliveryRegions, paymentMethods } from "@/lib/content";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Доставка и оплата MD Supply: география поставок по всей Беларуси, способы доставки и безналичный расчёт для юридических лиц и ИП.",
  alternates: { canonical: "/delivery" },
};

const deliveryOptions = [
  {
    icon: Truck,
    title: "Доставка по Минску",
    text: "Собственным транспортом на следующий рабочий день после подтверждения заказа.",
  },
  {
    icon: MapPin,
    title: "Доставка по регионам",
    text: "Поставки во все областные центры Беларуси по согласованному графику.",
  },
  {
    icon: PackageCheck,
    title: "Самовывоз со склада",
    text: "Готовый заказ можно забрать со склада в Минске в удобное время.",
  },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        title="Доставка и оплата"
        description="Информация о географии поставок, способах доставки и оплаты. Точные условия фиксируются в договоре."
        crumbs={[{ title: "Доставка и оплата" }]}
      />

      <Section>
        <SectionHeader eyebrow="Доставка" title="Способы доставки" className="mb-12" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {deliveryOptions.map((o) => (
            <RevealItem key={o.title}>
              <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                  <o.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-fg">{o.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{o.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* География */}
      <section className="border-y border-border-subtle bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeader
                eyebrow="География поставок"
                title="Работаем во всех областях Беларуси"
                description="Логистическая сеть MD Supply покрывает Минск и все областные центры страны."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {deliveryRegions.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-[15px] font-medium text-fg"
                  >
                    <MapPin className="h-4 w-4 text-accent" /> {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Оплата */}
      <Section>
        <SectionHeader eyebrow="Оплата" title="Способы оплаты" className="mb-12" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {paymentMethods.map((p) => (
            <RevealItem key={p.title}>
              <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 rounded-card border border-border-subtle bg-bg-soft p-5 text-sm text-fg-muted">
          Раздел носит информационный характер. Точные условия доставки и оплаты — минимальная
          сумма заказа, сроки и тарифы — согласуются индивидуально и фиксируются в договоре поставки.
        </p>
      </Section>

      <CTASection />
    </>
  );
}
