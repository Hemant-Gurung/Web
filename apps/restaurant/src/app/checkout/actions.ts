"use server";

import type { OrderData } from "@repo/ui";

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const CMS_API_KEY = process.env.CMS_API_KEY;
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

export async function submitOrder(data: OrderData): Promise<void> {
  const total = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const res = await fetch(`${CMS_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CMS_API_KEY && { Authorization: `admins API-Key ${CMS_API_KEY}` }),
    },
    body: JSON.stringify({
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
      total,
      tableNumber: data.tableNumber || undefined,
      notes: data.notes || undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[checkout] CMS error:", res.status, body);
    const message = (() => {
      try { return JSON.parse(body).message; } catch { return null; }
    })();
    throw new Error(message ?? "Failed to place order");
  }
}
