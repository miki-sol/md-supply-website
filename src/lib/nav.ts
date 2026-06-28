export type NavChild = { title: string; href: string; desc?: string };
export type NavItem = { title: string; href: string; children?: NavChild[] };

export const services: NavChild[] = [
  {
    title: "Дистрибуция",
    href: "/services/distribution",
    desc: "Эксклюзивная и официальная дистрибуция брендов на территории РБ",
  },
  {
    title: "Ассортимент и закупки",
    href: "/services/assortment",
    desc: "Формирование товарной матрицы под канал продаж",
  },
  {
    title: "Мерчандайзинг",
    href: "/services/merchandising",
    desc: "Выкладка, POS-материалы и контроль полки в торговых точках",
  },
  {
    title: "Логистика и склад",
    href: "/services/logistics",
    desc: "Хранение, комплектация и доставка по всей Беларуси",
  },
  {
    title: "Маркетинговые услуги",
    href: "/services/marketing",
    desc: "Трейд-маркетинг, промо-акции и поддержка продаж",
  },
];

export const mainNav: NavItem[] = [
  { title: "О компании", href: "/about" },
  { title: "Услуги", href: "/services", children: services },
  { title: "Сотрудничество", href: "/cooperation" },
  { title: "Контакты", href: "/contacts" },
];

export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Компания",
    links: [
      { title: "О компании", href: "/about" },
      { title: "Вакансии", href: "/careers" },
      { title: "Контакты", href: "/contacts" },
    ],
  },
  {
    title: "Клиентам",
    links: [
      { title: "Каталог / Ассортимент", href: "/catalog" },
      { title: "Сотрудничество", href: "/cooperation" },
      { title: "Доставка и оплата", href: "/delivery" },
      { title: "Вопросы и ответы", href: "/faq" },
    ],
  },
  {
    title: "Услуги",
    links: services,
  },
];
