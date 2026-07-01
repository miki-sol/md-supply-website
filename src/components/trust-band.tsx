import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { trustFactIcons } from "@/lib/content";

export async function TrustBand() {
  const t = await getTranslations("Common.trustBand");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="border-y border-border-subtle bg-bg-soft py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {items.map((f, i) => {
            const Icon = trustFactIcons[i];
            return (
              <div key={f.title} className="flex flex-col items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red/10 text-accent">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <div>
                  <div className="font-display text-base font-bold leading-tight text-fg sm:text-lg">
                    {f.title}
                  </div>
                  <div className="mt-1 text-[13px] leading-snug text-fg-muted">{f.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
