import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Boxes,
  LineChart,
  Store,
  Handshake,
  ShieldCheck,
  Clock,
  Award,
  MapPin,
  Building2,
  Users,
} from "lucide-react";

export const serviceSlugs = ["distribution", "assortment"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  distribution: Truck,
  assortment: Boxes,
};

// Порядок иконок соответствует порядку элементов в messages (Home.*.items / Common.trustBand.items).
export const advantageIcons: LucideIcon[] = [ShieldCheck, MapPin, Boxes, Clock, LineChart, Award];
export const trustFactIcons: LucideIcon[] = [MapPin, Store, Handshake, ShieldCheck];
export const brandChannelIcons: LucideIcon[] = [Building2, Users];
