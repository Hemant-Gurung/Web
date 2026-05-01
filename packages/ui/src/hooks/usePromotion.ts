"use client";

import { useEffect, useState } from "react";
import type { Promotion } from "../components/PromotionPopup";

interface Options {
  restaurantId: string;
  locale: string;
  cmsUrl: string;
}

interface Result {
  promotion: Promotion | null;
  dismiss: () => void;
}

export function usePromotion({ restaurantId, locale, cmsUrl }: Options): Result {
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const url = `${cmsUrl}/api/promotions?restaurant=${restaurantId}&where[active][equals]=true&locale=${locale}&fallback-locale=en&depth=1&limit=1`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const doc: Promotion | undefined = data?.docs?.[0];
        if (!doc) return;

        const now = new Date();
        if (doc.startDate && new Date(doc.startDate) > now) return;
        if (doc.endDate && new Date(doc.endDate) < now) return;

        const key = `promo_dismissed_${restaurantId}_${doc.id}`;
        const until = localStorage.getItem(key);
        if (until && Date.now() < Number(until)) return;

        setPromotion(doc);
      })
      .catch(() => {});
  }, [restaurantId, locale, cmsUrl]);

  function dismiss() {
    if (!promotion) return;
    const key = `promo_dismissed_${restaurantId}_${promotion.id}`;
    const days = promotion.dismissDays ?? 1;
    localStorage.setItem(key, String(Date.now() + days * 24 * 60 * 60 * 1000));
    setPromotion(null);
  }

  return { promotion, dismiss };
}
