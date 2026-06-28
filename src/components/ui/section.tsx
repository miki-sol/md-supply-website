import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  className,
  children,
  full = false,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  full?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20 lg:py-28", className)}>
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red">
          <span className="h-px w-6 bg-red" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-[1.625rem] font-extrabold leading-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
