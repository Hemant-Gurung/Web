"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale();
  const localizedHref =
    typeof href === "string" && !href.startsWith("http")
      ? `/${locale}${href.startsWith("/") ? href : `/${href}`}`
      : href;
  return <Link href={localizedHref} {...props} />;
}
