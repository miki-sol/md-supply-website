"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LeadKind = "callback" | "quote" | "contact" | "vacancy";

const contactTypes = ["phone", "email", "telegram"] as const;
type ContactType = (typeof contactTypes)[number];

const CONTACT_META: {
  value: ContactType;
  inputMode: "tel" | "email" | "text";
  autoComplete: string;
}[] = [
  { value: "phone", inputMode: "tel", autoComplete: "tel" },
  { value: "email", inputMode: "email", autoComplete: "email" },
  { value: "telegram", inputMode: "text", autoComplete: "off" },
];

function isContactValid(type: ContactType, raw: string): boolean {
  const v = raw.trim();
  if (type === "phone") {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }
  if (type === "email") return z.string().email().safeParse(v).success;
  return /^@?[a-zA-Z0-9_]{5,32}$/.test(v);
}

function makeSchema(t: (key: string) => string) {
  return z
    .object({
      name: z.string().min(2, t("validation.name")),
      contactType: z.enum(contactTypes),
      contact: z.string().min(1, t("validation.contactRequired")),
      company: z.string().optional(),
      message: z.string().optional(),
      consent: z.literal(true, { message: t("validation.consent") }),
      website: z.string().max(0).optional(),
    })
    .superRefine((val, ctx) => {
      if (!isContactValid(val.contactType, val.contact)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contact"],
          message: t(`validation.${val.contactType}`),
        });
      }
    });
}

type FormValues = z.input<ReturnType<typeof makeSchema>>;

const KIND_CONFIG: Record<LeadKind, { showCompany: boolean; showMessage: boolean }> = {
  callback: { showCompany: false, showMessage: false },
  quote: { showCompany: true, showMessage: true },
  contact: { showCompany: false, showMessage: true },
  vacancy: { showCompany: false, showMessage: true },
};

const fieldCls =
  "w-full rounded-xl border border-border-subtle bg-bg px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-red";

export function LeadForm({
  kind,
  onSuccess,
  className,
}: {
  kind: LeadKind;
  onSuccess?: () => void;
  className?: string;
}) {
  const t = useTranslations("Forms");
  const cfg = KIND_CONFIG[kind];
  const schema = useMemo(() => makeSchema(t), [t]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { contactType: "phone" } });

  const contactType = (watch("contactType") ?? "phone") as ContactType;
  const activeContact = CONTACT_META.find((c) => c.value === contactType)!;

  function selectContactType(type: ContactType) {
    setValue("contactType", type);
    setValue("contact", "");
    clearErrors("contact");
  }

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
      setServerError(t("serverFail"));
    }
  }

  if (done) {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-8 text-center", className)}>
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h3 className="text-xl font-bold text-fg">{t("success.title")}</h3>
        <p className="max-w-sm text-fg-muted">{t("success.text")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)} noValidate>
      <div className="hidden" aria-hidden>
        <label>
          {t("labels.name")}
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label={t("labels.name")} error={errors.name?.message}>
        <input className={fieldCls} placeholder={t("labels.namePlaceholder")} autoComplete="name" {...register("name")} />
      </Field>

      <div>
        <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-fg">
          {t("labels.contactHeading")}
        </span>
        <div className="mb-2.5 flex gap-1 rounded-xl border border-border-subtle bg-bg p-1">
          {CONTACT_META.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => selectContactType(c.value)}
              aria-pressed={contactType === c.value}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                contactType === c.value ? "bg-red text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {t(`contactTypes.${c.value}`)}
            </button>
          ))}
        </div>
        <input type="hidden" {...register("contactType")} />
        <input
          className={fieldCls}
          placeholder={t(`placeholders.${contactType}`)}
          inputMode={activeContact.inputMode}
          autoComplete={activeContact.autoComplete}
          {...register("contact")}
        />
        {errors.contact?.message && (
          <span className="mt-1 block text-sm text-accent">{errors.contact.message}</span>
        )}
      </div>

      {cfg.showCompany && (
        <Field label={t("labels.company")} optional optionalLabel={t("labels.optional")}>
          <input className={fieldCls} placeholder={t("labels.companyPlaceholder")} autoComplete="organization" {...register("company")} />
        </Field>
      )}

      {cfg.showMessage && (
        <Field label={t(`kinds.${kind}.messageLabel`)} optional optionalLabel={t("labels.optional")}>
          <textarea rows={4} className={cn(fieldCls, "resize-none")} placeholder={t("labels.messagePlaceholder")} {...register("message")} />
        </Field>
      )}

      <label className="flex items-start gap-3 text-sm text-fg-muted">
        <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-red" {...register("consent")} />
        <span>
          {t.rich("labels.consent", {
            link: (chunks) => (
              <Link href="/privacy" className="text-accent underline underline-offset-2" target="_blank">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {errors.consent && <p className="-mt-2 text-sm text-accent">{errors.consent.message}</p>}

      {serverError && (
        <p className="rounded-lg bg-red/10 px-3 py-2 text-sm text-accent">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {t(`kinds.${kind}.submit`)}
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
  optionalLabel,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-fg-muted">{optionalLabel}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-accent">{error}</span>}
    </label>
  );
}
