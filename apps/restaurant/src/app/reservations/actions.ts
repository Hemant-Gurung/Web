"use server";

import type { ReservationData } from "@repo/ui";

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const CMS_API_KEY = process.env.CMS_API_KEY;
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

export async function submitReservation(data: ReservationData): Promise<void> {
  const dateTime = new Date(`${data.date} ${data.time}`).toISOString();

  const res = await fetch(`${CMS_URL}/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CMS_API_KEY && { Authorization: `admins API-Key ${CMS_API_KEY}` }),
    },
    body: JSON.stringify({
      type: "general",
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: dateTime,
      partySize: data.partySize,
      notes: data.notes || undefined,
      restaurant: RESTAURANT_ID,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
const message = (() => {
      try { return JSON.parse(body).message; } catch { return null; }
    })();
    throw new Error(message ?? "Failed to submit reservation");
  }
}
