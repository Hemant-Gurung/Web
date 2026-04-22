"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./LanguageSelector.module.css";

const LABELS: Record<string, string> = {
  en: "EN",
  nl: "NL",
  fr: "FR",
};

interface Props {
  locales: string[];
  currentLocale: string;
}

export function LanguageSelector({ locales, currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  if (locales.length <= 1) return null;

  function switchLocale(next: string) {
    // pathname is e.g. /en/menu — replace the locale segment
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className={styles.selector}>
      {locales.map((locale) => (
        <button
          key={locale}
          className={`${styles.btn} ${locale === currentLocale ? styles.active : ""}`}
          onClick={() => switchLocale(locale)}
          aria-label={`Switch to ${locale}`}
        >
          {LABELS[locale] ?? locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
