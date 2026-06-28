import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { TrustBand } from "@/components/trust-band";
import { CTASection } from "@/components/cta-section";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { servicesContent, advantages, brandChannels } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />

      {/* Направления / Услуги */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Что мы делаем"
            title="Направления деятельности"
            description="Полный цикл работы с товаром — от закупки и хранения до представленности на полке и роста продаж."
          />
          <ButtonLink href="/services" variant="outline" className="shrink-0">
            Все услуги <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesContent.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red/40 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-accent transition-colors group-hover:bg-red group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 flex items-center gap-1.5 text-xl font-bold text-fg">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.excerpt}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Преимущества */}
      <section className="bg-bg-soft py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Почему MD Supply"
            title="Партнёрам важно работать с надёжным поставщиком"
            description="Мы отвечаем не только за отгрузку, но и за результат: представленность, оборачиваемость и продажи."
            className="mb-14"
          />
          <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <RevealItem key={a.title} className="bg-surface">
                <div className="flex h-full flex-col p-7">
                  <a.icon className="h-7 w-7 text-accent" />
                  <h3 className="mt-4 text-lg font-bold text-fg">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Каналы продаж */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Каналы продаж"
            title="Работаем с каждым каналом по отдельной модели"
            description="Под каждый канал — своя товарная матрица, ценообразование и стандарты представленности."
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {brandChannels.map((c) => (
              <RevealItem key={c.channel}>
                <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-6">
                  <c.icon className="h-7 w-7 text-accent" />
                  <h3 className="mt-4 font-bold text-fg">{c.channel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
