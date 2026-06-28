import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { TrustBand } from "@/components/trust-band";
import { CTASection } from "@/components/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { values } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "MD Supply (ООО «МД Сапплай») — торговая компания из Минска. Миссия и ценности, подход к работе, реквизиты компании.",
  alternates: { canonical: "/about" },
};

const approach = [
  { title: "Команда с опытом", text: "За проектом — специалисты с опытом в дистрибуции, закупках и логистике." },
  { title: "Отлаженные процессы", text: "Приём заявок, комплектация и отгрузка работают как единый механизм." },
  { title: "Прямые контракты", text: "Закупаем у производителей напрямую — честная цена и гарантия происхождения." },
  { title: "Гибкость к партнёру", text: "Подстраиваем ассортимент и условия под канал и формат вашего бизнеса." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="О компании MD Supply"
        description="Мы — торговая компания из Минска, которая обеспечивает поставки и дистрибуцию широкого ассортимента товаров по всей Республике Беларусь."
        crumbs={[{ title: "О компании" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader eyebrow="Кто мы" title="Надёжное звено между производителем и торговой точкой" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted sm:text-base">
              <p>
                {site.legalName} — торговая компания из Минска. Мы выстраиваем модель дистрибуции,
                которая закрывает весь путь товара — от закупки у производителя до представленности
                на полке и роста продаж у партнёра.
              </p>
              <p>
                Мы поставляем товары в розничные сети, магазины у дома, заведения HoReCa и
                интернет-магазины по всей стране. За проектом стоит команда с практическим опытом в
                закупках, продажах и логистике.
              </p>
              <p>
                Главная ценность компании — отношения с партнёрами, построенные на ответственности,
                прозрачных условиях и стабильности поставок.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-bg-soft p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
                <ShieldCheck className="h-5 w-5 text-red" /> Миссия
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                Делать качественные товары доступными для бизнеса по всей Беларуси — обеспечивая
                бесперебойные поставки, честные условия и сервис, на который можно положиться.
              </p>
              <h3 className="mt-8 text-lg font-bold text-fg">Реквизиты</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Req label="Наименование" value={site.requisites.fullName} />
                <Req label="УНП" value={site.requisites.unp} />
                <Req label="Адрес" value={site.requisites.address} />
                <Req label="Банк" value={site.requisites.bank} />
                <Req label="БИК" value={site.requisites.bik} />
                <Req label="Расчётный счёт" value={site.requisites.account} />
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <TrustBand />

      {/* Ценности */}
      <Section>
        <SectionHeader
          align="center"
          eyebrow="Наши ценности"
          title="Принципы, по которым мы работаем"
          className="mb-14"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <RevealItem key={v.title}>
              <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-red">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-fg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Подход */}
      <section className="bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="Наш подход"
            title="Как мы обеспечиваем результат"
            description="Мы молодая компания, но работаем по взрослым стандартам — на опыте команды и отлаженных процессах."
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

function Req({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-border-subtle pb-2 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="font-medium text-fg sm:text-right">{value}</dd>
    </div>
  );
}
