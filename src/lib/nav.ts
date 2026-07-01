import { serviceSlugs, type ServiceSlug } from "@/lib/content";

export type NavKey =
  | "about"
  | "services"
  | "cooperation"
  | "contacts"
  | "careers"
  | "delivery"
  | "faq"
  | "privacy";

export type MainNavItem = { key: NavKey; href: string; hasChildren?: boolean };

export const mainNav: MainNavItem[] = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services", hasChildren: true },
  { key: "cooperation", href: "/cooperation" },
  { key: "contacts", href: "/contacts" },
];

// href-и услуг в порядке serviceSlugs; заголовок/описание берутся из messages Services.items.<slug>.
export const serviceLinks: { slug: ServiceSlug; href: string }[] = serviceSlugs.map((slug) => ({
  slug,
  href: `/services/${slug}`,
}));

export type FooterColumn = { titleKey: "companyTitle" | "clientsTitle"; links: { key: NavKey; href: string }[] };

export const footerColumns: FooterColumn[] = [
  {
    titleKey: "companyTitle",
    links: [
      { key: "about", href: "/about" },
      { key: "careers", href: "/careers" },
      { key: "contacts", href: "/contacts" },
    ],
  },
  {
    titleKey: "clientsTitle",
    links: [
      { key: "cooperation", href: "/cooperation" },
      { key: "delivery", href: "/delivery" },
      { key: "faq", href: "/faq" },
    ],
  },
];
