"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export function HomeOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isHome = pathname === `/${locale}` || pathname === "/";
  if (!isHome) return null;
  return <>{children}</>;
}
