import { setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@repo/ui";
import type { OrderData } from "@repo/ui";
import { notFound } from "next/navigation";
import { submitOrder } from "../../checkout/actions";
import { restaurantConfig } from "@/config/restaurant";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `Checkout | ${restaurantConfig.name}` };
}

type Props = { params: Promise<{ locale: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!restaurantConfig.features.ordering) notFound();

  async function handleSubmit(data: OrderData) {
    "use server";
    return submitOrder(data);
  }

  return <CheckoutForm orderType={restaurantConfig.orderType ?? "both"} onSubmit={handleSubmit} />;
}
