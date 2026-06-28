import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description:
    "Ответы на частые вопросы клиентов и партнёров MD Supply: условия работы, прайс-лист, регионы поставок, оплата и сотрудничество.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHeader
        title="Вопросы и ответы"
        description="Собрали ответы на самые частые вопросы клиентов и партнёров. Не нашли нужный — свяжитесь с нами."
        crumbs={[{ title: "Вопросы и ответы" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      <CTASection
        title="Остались вопросы?"
        text="Напишите или позвоните нам — менеджер MD Supply подробно ответит и поможет с подбором ассортимента."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
