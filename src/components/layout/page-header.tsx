import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "@/components/ui/container";

export function PageHeader({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <div className="relative overflow-hidden border-b border-border-subtle bg-ink text-white">
        <div className="absolute inset-0 grid-lines opacity-[0.07]" aria-hidden />
        <div
          className="absolute -right-24 top-0 h-full w-[55%] accent-bar opacity-90"
          style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
        <Container>
          <div className="relative max-w-3xl py-12 sm:py-16 lg:py-20">
            <h1 className="text-[2rem] font-extrabold leading-[1.08] sm:text-4xl lg:text-5xl">{title}</h1>
            {description && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:mt-5 sm:text-lg">{description}</p>
            )}
            {children && <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">{children}</div>}
          </div>
        </Container>
      </div>
    </>
  );
}
