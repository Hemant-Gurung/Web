import { redirect } from "next/navigation";

const defaultLocale = (process.env.NEXT_PUBLIC_LOCALES ?? "en").split(",")[0];

export default function ReservationsPage() {
  redirect(`/${defaultLocale}/reservations`);
}
