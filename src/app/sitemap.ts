import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicesContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/catalog", priority: 0.9, freq: "weekly" as const },
    { path: "/cooperation", priority: 0.8, freq: "monthly" as const },
    { path: "/delivery", priority: 0.6, freq: "monthly" as const },
    { path: "/faq", priority: 0.5, freq: "monthly" as const },
    { path: "/contacts", priority: 0.8, freq: "monthly" as const },
    { path: "/careers", priority: 0.5, freq: "monthly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
  ];

  const staticEntries = routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const serviceEntries = servicesContent.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries];
}
