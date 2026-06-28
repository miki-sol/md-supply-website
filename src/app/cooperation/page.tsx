import type { Metadata } from "next";
import { Check, Download, Handshake, Store, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { cooperationSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Сотрудничество",
  description:
    "Условия сотрудничества с MD Supply для оптовых клиентов и партнёров: схема работы, запрос коммерческого предложения, презентация компании.",
  alternates: { canonical: "/cooperation" },
};

const wholesale = [
  "Гибкие цены и условия в зависимости от объёма закупок",
  "Отсрочка платежа для постоянных партнёров",
  "Персональный менеджер и оперативная обработка заявок",
  "Полный пакет сопроводительных документов",
  "Доставка по Минску и регионам или самовывоз со склада",
];

const partners = [
  "Дистрибуция вашего бренда на территории Беларуси",
  "Покрытие розницы, HoReCa и интернет-магазинов",
  "Команда мерчандайзеров и трейд-маркетинг",
  "Прозрачная отчётность по продажам и остаткам",
  "Совместное планирование промо и вывода новинок",
];

export default function CooperationPage() {
  return (
    <>
      <PageHeader
        title="Сотрудничество"
        description="Работаем с оптовыми клиентами и производителями. Прозрачные условия, надёжные поставки и поддержка на каждом этапе."
        crumbs={[{ title: "Сотрудничество" }]}
      >
        <ButtonLink href="/presentation.pdf" size="lg" className="bg-white text-ink hover:bg-white/90">
          <Download className="h-4 w-4" /> Скачать презентацию
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <ConditionsCard
              icon={<Store className="h-6 w-6" />}
              title="Оптовым клиентам"
              text="Для магазинов, сетей, заведений HoReCa и интернет-магазинов."
              items={wholesale}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ConditionsCard
              icon={<Handshake className="h-6 w-6" />}
              title="Партнёрам и поставщикам"
              text="Для производителей и брендов, которым нужна дистрибуция в Беларуси."
              items={partners}
            />
          </Reveal>
        </div>
      </Section>

      {/* Схема работы */}
      <section className="border-y border-border-subtle bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Как мы работаем"
            title="Схема сотрудничества"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {cooperationSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="relative h-full rounded-card border border-border-subtle bg-surface p-6">
                  <span className="font-display text-3xl font-extrabold text-red/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-bold text-fg">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Запрос КП */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="Запрос предложения"
              title="Запросите коммерческое предложение"
              description="Заполните форму — менеджер подготовит персональное КП с ценами и условиями под ваш канал продаж."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Ответим в течение рабочего дня",
                "Подберём ассортимент под ваш формат",
                "Рассчитаем условия отгрузки и доставки",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-fg">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red/10 text-red">
                    <Check className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-card border border-border-subtle bg-bg-soft p-5">
              <Truck className="h-8 w-8 shrink-0 text-red" />
              <p className="text-sm text-fg-muted">
                Поставки по всей Республике Беларусь. Доставка по Минску — на следующий рабочий
                день.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border-subtle bg-surface p-7 shadow-soft sm:p-8">
              <h3 className="text-xl font-bold text-fg">Форма запроса КП</h3>
              <p className="mt-1.5 text-sm text-fg-muted">Все поля, кроме отмеченных, обязательны.</p>
              <div className="mt-6">
                <LeadForm kind="quote" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ConditionsCard({
  icon,
  title,
  text,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-8">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-red">
        {icon}
      </span>
      <h2 className="mt-5 text-2xl font-bold text-fg">{title}</h2>
      <p className="mt-2 text-[15px] text-fg-muted">{text}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[15px] leading-relaxed text-fg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
