"use client";

import { usePromotion } from "../hooks/usePromotion";
import styles from "./PromotionPopup.module.css";

export interface Promotion {
  id: number | string;
  title: string;
  message?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  image?: { url?: string | null } | null;
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
  const { promotion, dismiss } = usePromotion({ restaurantId, locale, cmsUrl });

  if (!promotion) return null;

  return (
    <div className={styles.backdrop} onClick={dismiss} role="dialog" aria-modal="true">
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={dismiss} aria-label="Close">✕</button>

        {promotion.image?.url && (
          <img src={promotion.image.url ?? undefined} alt={promotion.title} className={styles.image} />
        )}

        <div className={styles.body}>
          <h2 className={styles.title}>{promotion.title}</h2>
          {promotion.message && <p className={styles.message}>{promotion.message}</p>}

          {promotion.ctaUrl && (
            <a href={promotion.ctaUrl} className={styles.cta} onClick={dismiss}>
              {promotion.ctaLabel ?? promotion.ctaUrl}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
