import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { LeadButton } from "@/components/forms/lead-button";

export function CTASection({
  title = "Готовы обсудить поставки?",
  text = "Оставьте заявку — менеджер MD Supply подготовит коммерческое предложение под ваш канал продаж и ответит на все вопросы.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 grid-lines opacity-[0.08]" aria-hidden />
          <div
            className="absolute -right-10 top-0 h-full w-1/2 accent-bar opacity-90"
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/75">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LeadButton kind="quote" size="lg" className="bg-white text-ink hover:bg-white/90">
                Запросить КП <ArrowRight className="h-4 w-4" />
              </LeadButton>
              <ButtonLink href="/cooperation" size="lg" variant="outline" className="border-white/30 text-white hover:border-white">
                <FileText className="h-4 w-4" /> Условия сотрудничества
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
