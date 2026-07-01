import { Home, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("Common.notFound");
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 grid-lines opacity-[0.07]" aria-hidden />
      <div
        className="absolute -right-20 top-0 h-full w-1/2 accent-bar opacity-90"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden
      />
      <Container>
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <div className="font-display text-7xl font-extrabold tracking-tight sm:text-8xl">
            4<span className="text-red-soft">0</span>4
          </div>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">{t("title")}</h1>
          <p className="mt-3 max-w-md text-white/70">{t("text")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg" className="bg-white text-ink hover:bg-white/90">
              <Home className="h-4 w-4" /> {t("home")}
            </ButtonLink>
            <ButtonLink href="/catalog" size="lg" variant="outline" className="border-white/30 text-white hover:border-white">
              <Search className="h-4 w-4" /> {t("catalog")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
