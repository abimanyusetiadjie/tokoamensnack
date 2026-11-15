import React from "react";
import {
  Coffee,
  Cookie,
  Fish,
  Flame,
  Sparkles,
  Utensils,
} from "lucide-react";
import type { CategoryIconName } from "@/payload/seed-data";

const ICON_MAP: Record<CategoryIconName, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  cookie: Cookie,
  fish: Fish,
  sparkles: Sparkles,
  utensils: Utensils,
  coffee: Coffee,
};

/**
 * Renders the matching Lucide icon for a Bangka snack product category.
 */
export function CategoryIcon({
  name,
  className = "w-6 h-6",
}: {
  name: CategoryIconName;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} aria-hidden="true" />;
}
