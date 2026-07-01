import { routing, type Locale } from "./routing";

// Единственная точка с привязкой локали к OG-формату. Новый язык — одна строка здесь.
const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
};

export function ogLocale(locale: string): string {
  return OG_LOCALE[locale as Locale] ?? locale;
}

// canonical + hreflang alternates, выведенные из routing.locales — не требуют правок при добавлении языка.
export function localizedAlternates(locale: string, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
  };
}
