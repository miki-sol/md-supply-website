import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Providers } from "@/components/providers";
import { LeadProvider } from "@/components/forms/lead-modal";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { OrganizationJsonLd } from "@/components/json-ld";
import { routing, type Locale } from "@/i18n/routing";
import { localizedAlternates, ogLocale } from "@/i18n/metadata";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  const title = `${site.name} — ${t("tagline")}`;
  const description = t("description");

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description,
    applicationName: site.name,
    keywords: t("keywords").split("|"),
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    alternates: localizedAlternates(locale),
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/icon.svg" }],
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description,
      images: [{ url: "/og-image.jpg", width: 1280, height: 666, alt: "MD Supply" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    formatDetection: { telephone: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("Common");

  return (
    <html lang={locale} suppressHydrationWarning className={`${manrope.variable} ${display.variable}`}>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <Providers>
            <LeadProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-red focus:px-4 focus:py-2 focus:text-white"
              >
                {t("skipToContent")}
              </a>
              <Header />
              <main id="main">{children}</main>
              <Footer />
              <BackToTop />
              <CookieBanner />
            </LeadProvider>
          </Providers>
          <OrganizationJsonLd />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
