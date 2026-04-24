"use client";

import { useEffect, useState } from "react";
import styles from "./PromotionPopup.module.css";

export interface Promotion {
  id: number | string;
  title: string;
  message: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  image?: { url: string } | null;
  dismissDays?: number | null;
  startDate?: string | null;
  endDate?: string | null;
}

interface Props {
  restaurantId: string;
  locale: string;
  cmsUrl: string;
}

export function PromotionPopup({ restaurantId, locale, cmsUrl }: Props) {
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const url = `${cmsUrl}/api/promotions?restaurant=${restaurantId}&where[active][equals]=true&locale=${locale}&fallback-locale=en&limit=1`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        console.log("🚀 ~ PromotionPopup ~ data:", data);
        const doc: Promotion | undefined = data?.docs?.[0];
        if (!doc) return;

        // Client-side date window check
        const now = new Date();
        if (doc.startDate && new Date(doc.startDate) > now) return;
        if (doc.endDate && new Date(doc.endDate) < now) return;

        // Client-side dismiss check
        const key = `promo_dismissed_${restaurantId}_${doc.id}`;
        const until = localStorage.getItem(key);
        if (until && Date.now() < Number(until)) return;

        console.log("🚀 ~ PromotionPopup ~ doc:", doc);
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

  if (!promotion) return null;

  return (
    <div className={styles.backdrop} onClick={dismiss} role="dialog" aria-modal="true">
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={dismiss} aria-label="Close">✕</button>

        {promotion.image?.url && (
          <img src={promotion.image.url} alt={promotion.title} className={styles.image} />
        )}

        <div className={styles.body}>
          <h2 className={styles.title}>{promotion.title}</h2>
          <p className={styles.message}>{promotion.message}</p>

          {promotion.ctaLabel && promotion.ctaUrl && (
            <a href={promotion.ctaUrl} className={styles.cta} onClick={dismiss}>
              {promotion.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
