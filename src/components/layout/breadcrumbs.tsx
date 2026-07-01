import { getLocale, getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export type Crumb = { title: string; href?: string };

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = await getTranslations("Common");
  const locale = await getLocale();
  const all: Crumb[] = [{ title: t("breadcrumbHome"), href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      ...(c.href ? { item: `${site.url}/${locale}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <div className="border-b border-border-subtle bg-bg-soft/60">
      <Container>
        <nav aria-label={t("breadcrumbAria")} className="flex flex-wrap items-center gap-1.5 py-4 text-sm">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <span key={i} className="inline-flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className="text-fg-muted transition-colors hover:text-accent">
                    {c.title}
                  </Link>
                ) : (
                  <span className="font-medium text-fg">{c.title}</span>
                )}
                {!last && <ChevronRight className="h-3.5 w-3.5 text-fg-muted" />}
              </span>
            );
          })}
        </nav>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
