import { CheckoutForm } from "@repo/ui";
import type { OrderData } from "@repo/ui";
import { submitOrder } from "./actions";
import { restaurantConfig } from "@/config/restaurant";
import { notFound } from "next/navigation";

export const metadata = {
  title: `Checkout | ${restaurantConfig.name}`,
};

export default function CheckoutPage() {
  if (!restaurantConfig.features.ordering) notFound();

  async function handleSubmit(data: OrderData) {
    "use server";
    return submitOrder(data);
  }

  return (
    <CheckoutForm
      orderType={restaurantConfig.orderType ?? "both"}
      onSubmit={handleSubmit}
    />
  );
}
