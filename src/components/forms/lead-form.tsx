"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LeadKind = "callback" | "quote" | "contact" | "vacancy";

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  contact: z.string().min(5, "Укажите телефон или e-mail"),
  company: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, { message: "Необходимо согласие" }),
  website: z.string().max(0).optional(),
});

type FormValues = z.input<typeof schema>;

const config: Record<
  LeadKind,
  { contactLabel: string; showCompany: boolean; showMessage: boolean; messageLabel: string; submit: string }
> = {
  callback: {
    contactLabel: "Телефон",
    showCompany: false,
    showMessage: false,
    messageLabel: "",
    submit: "Жду звонка",
  },
  quote: {
    contactLabel: "Телефон или e-mail",
    showCompany: true,
    showMessage: true,
    messageLabel: "Что вас интересует",
    submit: "Запросить КП",
  },
  contact: {
    contactLabel: "Телефон или e-mail",
    showCompany: false,
    showMessage: true,
    messageLabel: "Сообщение",
    submit: "Отправить заявку",
  },
  vacancy: {
    contactLabel: "Телефон или e-mail",
    showCompany: false,
    showMessage: true,
    messageLabel: "Сопроводительное сообщение / ссылка на резюме",
    submit: "Откликнуться",
  },
};

const fieldCls =
  "w-full rounded-xl border border-border-subtle bg-bg px-4 py-3 text-fg outline-none transition-colors placeholder:text-ash focus:border-red";

export function LeadForm({
  kind,
  onSuccess,
  className,
}: {
  kind: LeadKind;
  onSuccess?: () => void;
  className?: string;
}) {
  const cfg = config[kind];
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      onSuccess?.();
    } catch {
      setServerError("Не удалось отправить заявку. Попробуйте позвонить нам.");
    }
  }

  if (done) {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-8 text-center", className)}>
        <CheckCircle2 className="h-12 w-12 text-red" />
        <h3 className="text-xl font-bold text-fg">Заявка отправлена</h3>
        <p className="max-w-sm text-fg-muted">
          Спасибо! Менеджер MD Supply свяжется с вами в ближайшее рабочее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)} noValidate>
      <div className="hidden" aria-hidden>
        <label>
          Не заполняйте это поле
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label="Ваше имя" error={errors.name?.message}>
        <input className={fieldCls} placeholder="Иван Иванов" autoComplete="name" {...register("name")} />
      </Field>

      <Field label={cfg.contactLabel} error={errors.contact?.message}>
        <input
          className={fieldCls}
          placeholder={kind === "callback" ? "+375 (29) 000-00-00" : "+375 (29) 000-00-00 или e-mail"}
          autoComplete="tel"
          {...register("contact")}
        />
      </Field>

      {cfg.showCompany && (
        <Field label="Компания" optional>
          <input className={fieldCls} placeholder="Название организации" autoComplete="organization" {...register("company")} />
        </Field>
      )}

      {cfg.showMessage && (
        <Field label={cfg.messageLabel} optional>
          <textarea rows={4} className={cn(fieldCls, "resize-none")} placeholder="Кратко опишите запрос" {...register("message")} />
        </Field>
      )}

      <label className="flex items-start gap-3 text-sm text-fg-muted">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-red"
          {...register("consent")}
        />
        <span>
          Я согласен на обработку{" "}
          <Link href="/privacy" className="text-red underline-offset-2 hover:underline" target="_blank">
            персональных данных
          </Link>
          .
        </span>
      </label>
      {errors.consent && <p className="-mt-2 text-sm text-red">{errors.consent.message}</p>}

      {serverError && (
        <p className="rounded-lg bg-red/10 px-3 py-2 text-sm text-red">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Отправка…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {cfg.submit}
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-ash">необязательно</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-red">{error}</span>}
    </label>
  );
}
