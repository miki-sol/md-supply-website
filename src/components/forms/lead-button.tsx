"use client";

import { Button } from "@/components/ui/button";
import { useLead } from "./lead-modal";
import type { LeadKind } from "./lead-form";

type Props = {
  kind: LeadKind;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function LeadButton({ kind, children, variant, size, className }: Props) {
  const { open } = useLead();
  return (
    <Button variant={variant} size={size} className={className} onClick={() => open(kind)}>
      {children}
    </Button>
  );
}
