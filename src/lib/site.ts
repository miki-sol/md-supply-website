// Единый источник данных о компании. Все контакты/реквизиты меняются здесь.
export const site = {
  name: "MD Supply",
  legalName: 'ООО «МД Сапплай»',
  tagline: "Дистрибуция и поставки широкого ассортимента товаров",
  description:
    "MD Supply (ООО «МД Сапплай») — торговая компания из Минска: оптовые поставки, дистрибуция и логистика по странам СНГ.",
  url: "https://mdsupply.by",
  locale: "ru_RU",
  city: "Минск",
  country: "Республика Беларусь",
  email: "hello@mdsupply.by",
  phone: {
    display: "+375 (25) 773-21-91",
    href: "tel:+375257732191",
  },
  address: "220019, г. Минск, ул. Сухаревская, д. 16, пом. 71",
  addressShort: "г. Минск, ул. Сухаревская, 16",
  geo: { lat: 53.9388, lng: 27.4716 },
  socials: {
    telegram: "https://t.me/mlifefor",
    viber: "viber://chat?number=%2B375257732191",
    whatsapp: "https://wa.me/375257732191",
  },
  requisites: {
    fullName: 'Общество с ограниченной ответственностью «МД Сапплай»',
    unp: "194005274",
    address: "220019, г. Минск, ул. Сухаревская, д. 16, пом. 71",
    account: "BY67 PJCB 3012 0917 1110 0000 0093 3",
    bank: 'ОАО «Приорбанк», 220002, г. Минск, ул. Кропоткина, 91',
    bik: "PJCBBY2X",
  },
} as const;
