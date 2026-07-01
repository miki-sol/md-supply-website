import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/privacy"),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <>
      <PageHeader
        title={t("header.title")}
        description={t("header.description")}
        crumbs={[{ title: t("crumb") }]}
      />

      <Section>
        <div className="prose-legal mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-fg-muted">
          <Block n="1" title={t("s1.title")}>
            <p>{t("s1.p1", { operator: site.requisites.fullName, unp: site.requisites.unp, url: site.url })}</p>
            <p>{t("s1.p2")}</p>
          </Block>

          <Block n="2" title={t("s2.title")}>
            <p>{t("s2.intro")}</p>
            <ul>
              <li>{t("s2.i1")}</li>
              <li>{t("s2.i2")}</li>
              <li>{t("s2.i3")}</li>
              <li>{t("s2.i4")}</li>
            </ul>
          </Block>

          <Block n="3" title={t("s3.title")}>
            <ul>
              <li>{t("s3.i1")}</li>
              <li>{t("s3.i2")}</li>
              <li>{t("s3.i3")}</li>
              <li>{t("s3.i4")}</li>
            </ul>
          </Block>

          <Block n="4" title={t("s4.title")}>
            <p>{t("s4.p1")}</p>
          </Block>

          <Block n="5" title={t("s5.title")}>
            <p>{t("s5.p1")}</p>
          </Block>

          <Block n="6" title={t("s6.title")}>
            <p>{t("s6.p1")}</p>
          </Block>

          <Block n="7" title={t("s7.title")}>
            <p>{t("s7.p1")}</p>
          </Block>

          <Block n="8" title={t("s8.title")}>
            <p>{t("s8.p1")}</p>
            <ul>
              <li>
                {t("s8.emailLabel")}{" "}
                <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
                  {site.email}
                </a>
              </li>
              <li>
                {t("s8.phoneLabel")}{" "}
                <a href={site.phone.href} className="text-accent underline underline-offset-2">
                  {site.phone.display}
                </a>
              </li>
              <li>{t("s8.addressLabel")} {site.address}</li>
            </ul>
          </Block>
        </div>
      </Section>
    </>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-fg">
        <span className="text-accent">{n}.</span> {title}
      </h2>
      <div className="space-y-3 [&_a]:font-medium [&_li]:ml-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
