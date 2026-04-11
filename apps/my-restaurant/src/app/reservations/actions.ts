"use server";

import type { ReservationData } from "@repo/ui";

export async function submitReservation(data: ReservationData): Promise<void> {
  const cmsUrl = process.env.CMS_URL ?? "http://localhost:3002";
  const apiKey = process.env.CMS_API_KEY;

  if (!apiKey) {
    throw new Error("CMS_API_KEY is not configured");
  }

  // Combine "2026-04-15" + "7:00 PM" into a full ISO timestamp for Payload
  const dateTime = new Date(`${data.date} ${data.time}`).toISOString();

  const res = await fetch(`${cmsUrl}/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${apiKey}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: dateTime,
      partySize: data.partySize,
      notes: data.notes || undefined,
      // restaurant is auto-stamped by the CMS beforeChange hook via the API key
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? "Failed to submit reservation");
  }
}
