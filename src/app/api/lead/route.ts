import { NextResponse } from "next/server";
import { z } from "zod";

const contactTypes = ["phone", "email", "telegram"] as const;

function validateContact(type: (typeof contactTypes)[number], raw: string): boolean {
  const v = raw.trim();
  if (type === "phone") {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }
  if (type === "email") return z.string().email().safeParse(v).success;
  return /^@?[a-zA-Z0-9_]{5,32}$/.test(v);
}

const leadSchema = z
  .object({
    kind: z.enum(["callback", "quote", "contact", "vacancy"]),
    name: z.string().min(2).max(80),
    contactType: z.enum(contactTypes),
    contact: z.string().min(1).max(120),
    company: z.string().max(120).optional().or(z.literal("")),
    message: z.string().max(2000).optional().or(z.literal("")),
    consent: z.literal(true),
    // honeypot — у реального пользователя пустое; заполненное значение проверяем в обработчике
    website: z.string().optional(),
  })
  .refine((val) => validateContact(val.contactType, val.contact), {
    path: ["contact"],
    message: "Некорректный контакт",
  });

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Неверный формат запроса" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Проверьте корректность заполнения полей" },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    // Антиспам: бот заполнил скрытое поле — тихо «принимаем».
    return NextResponse.json({ ok: true });
  }

  // Точка интеграции: здесь отправляется e-mail Заказчику и (опционально) в Telegram.
  // Реальная доставка подключается на этапе запуска (SMTP / Telegram Bot API).
  console.info("[lead]", JSON.stringify(parsed.data));

  return NextResponse.json({ ok: true });
}
