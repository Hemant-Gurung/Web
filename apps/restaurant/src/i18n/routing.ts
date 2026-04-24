import { defineRouting } from "next-intl/routing";

const locales = (process.env.NEXT_PUBLIC_LOCALES ?? "en")
  .split(",")
  .map((l) => l.trim())
  .filter(Boolean);

export const routing = defineRouting({
  locales: locales as [string, ...string[]],
  defaultLocale: locales[0],
});
