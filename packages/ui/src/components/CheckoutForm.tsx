"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";
import { LocaleLink } from "./LocaleLink";
import styles from "./CheckoutForm.module.css";
import type { CartItem } from "./CartProvider";

export interface OrderData {
  type: "takeaway" | "eat-in";
  tableNumber?: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  items: CartItem[];
}

interface Props {
  orderType: "takeaway" | "eat-in" | "both";
  onSubmit: (data: OrderData) => Promise<{ url: string }>;
}

export function CheckoutForm({ orderType, onSubmit }: Props) {
  const t = useTranslations("Checkout");
  const { items, total, clearCart } = useCart();
  const [type, setType] = useState<"takeaway" | "eat-in">(
    orderType === "eat-in" ? "eat-in" : "takeaway"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>
          {t("cartEmpty")} <LocaleLink href="/menu">{t("backToMenu")}</LocaleLink>
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { url } = await onSubmit({ type, name, phone, email, tableNumber, notes, items });
      clearCart();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.layout}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {orderType === "both" && (
            <div className={styles.typeToggle}>
              <button
                type="button"
                className={`${styles.typeBtn} ${type === "takeaway" ? styles.typeActive : ""}`}
                onClick={() => setType("takeaway")}
              >
                {t("takeaway")}
              </button>
              <button
                type="button"
                className={`${styles.typeBtn} ${type === "eat-in" ? styles.typeActive : ""}`}
                onClick={() => setType("eat-in")}
              >
                {t("eatIn")}
              </button>
            </div>
          )}

          {type === "eat-in" && (
            <div className={styles.field}>
              <label>{t("tableNumber")}</label>
              <input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder={t("tableNumberPlaceholder")}
              />
            </div>
          )}

          <div className={styles.field}>
            <label>{t("name")}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
            />
          </div>

          <div className={styles.field}>
            <label>{t("phone")}</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
            />
          </div>

          <div className={styles.field}>
            <label>{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
            />
          </div>

          <div className={styles.field}>
            <label>{t("notes")}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("notesPlaceholder")}
              rows={3}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? t("redirecting") : t("pay", { amount: `$${total.toFixed(2)}` })}
          </button>
        </form>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>{t("summary")}</h2>
          <ul className={styles.summaryList}>
            {items.map((item) => (
              <li key={item.name} className={styles.summaryItem}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.summaryTotal}>
            <span>{t("total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
