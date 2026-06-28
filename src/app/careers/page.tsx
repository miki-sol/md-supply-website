import type { Metadata } from "next";
import { Briefcase, GraduationCap, HeartHandshake, MapPin, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { LeadButton } from "@/components/forms/lead-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { jobs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Вакансии",
  description:
    "Вакансии в MD Supply (ООО «МД Сапплай»), Минск: торговые представители, закупки, склад и логистика. Присоединяйтесь к команде.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: TrendingUp, title: "Рост и развитие", text: "Обучение, наставничество и карьерные перспективы внутри компании." },
  { icon: HeartHandshake, title: "Стабильность", text: "Официальное трудоустройство и своевременная оплата труда." },
  { icon: GraduationCap, title: "Сильная команда", text: "Опытные коллеги и отлаженные процессы работы." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Вакансии"
        description="MD Supply растёт — и мы ищем людей, которые хотят расти вместе с нами. Посмотрите открытые позиции."
        crumbs={[{ title: "Вакансии" }]}
      />

      <Section>
        <RevealGroup className="mb-16 grid gap-5 md:grid-cols-3">
          {perks.map((p) => (
            <RevealItem key={p.title}>
              <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface p-7">
                <p.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 text-lg font-bold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <SectionHeader eyebrow="Открытые позиции" title="Актуальные вакансии" className="mb-10" />
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05}>
              <div className="flex flex-col gap-4 rounded-card border border-border-subtle bg-surface p-6 transition-colors hover:border-red/40 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-fg">{job.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{job.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag icon={<Briefcase className="h-3.5 w-3.5" />}>{job.type}</Tag>
                    <Tag icon={<MapPin className="h-3.5 w-3.5" />}>{job.city}</Tag>
                  </div>
                </div>
                <LeadButton kind="vacancy" className="shrink-0">
                  Откликнуться
                </LeadButton>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-t border-border-subtle bg-bg-soft py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg">Не нашли подходящую вакансию?</h2>
            <p className="mt-3 text-fg-muted">
              Отправьте резюме — мы свяжемся с вами, когда появится подходящая позиция.
            </p>
            <div className="mt-6 flex justify-center">
              <LeadButton kind="vacancy" size="lg">
                Отправить резюме
              </LeadButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-soft px-3 py-1 text-xs font-medium text-fg-muted">
      {icon}
      {children}
    </span>
  );
}
