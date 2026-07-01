import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceSlugs } from "@/lib/content";
import { routing } from "@/i18n/routing";

const paths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/cooperation", priority: 0.8, freq: "monthly" },
  { path: "/delivery", priority: 0.6, freq: "monthly" },
  { path: "/faq", priority: 0.5, freq: "monthly" },
  { path: "/contacts", priority: 0.8, freq: "monthly" },
  { path: "/careers", priority: 0.5, freq: "monthly" },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: 0.7, freq: "monthly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${site.url}/${l}${p.path}`]),
        ),
      },
    })),
  );
}
