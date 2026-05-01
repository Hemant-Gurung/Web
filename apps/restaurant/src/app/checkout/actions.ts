"use server";

import { headers } from "next/headers";
import type { OrderData } from "@repo/ui";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3002";
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

export async function submitOrder(data: OrderData): Promise<{ url: string }> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const payload = {
    restaurant: RESTAURANT_ID,
    type: data.type,
    customer: {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
    },
    items: data.items.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
    successUrl: `${baseUrl}/order/success?session={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${baseUrl}/menu`,
    tableNumber: data.tableNumber || undefined,
    pickupTime: data.pickupTime || undefined,
    scheduledFor: data.scheduledFor || undefined,
    delivery: data.type === "delivery" ? {
      street: data.deliveryStreet,
      city: data.deliveryCity,
      postalCode: data.deliveryPostalCode,
      instructions: data.deliveryInstructions || undefined,
    } : undefined,
    notes: data.notes || undefined,
  };
  console.log("[checkout] sending to CMS:", CMS_URL, JSON.stringify(payload));

  const res = await fetch(`${CMS_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[checkout] CMS error status:", res.status);
    console.error("[checkout] CMS error body:", body);
    const message = (() => {
      try { return JSON.parse(body).message; } catch { return null; }
    })();
    throw new Error(message ?? "Failed to create checkout session");
  }

  const { url } = await res.json();
  return { url };
}
