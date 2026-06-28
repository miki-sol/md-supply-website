import { site } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone.display,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Сухаревская, д. 16, пом. 71",
      addressLocality: "Минск",
      postalCode: "220019",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.socials.telegram],
    taxID: site.requisites.unp,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
