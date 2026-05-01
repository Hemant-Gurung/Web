"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";
import { LocaleLink } from "./LocaleLink";
import styles from "./CheckoutForm.module.css";
import type { CartItem } from "./CartProvider";
import { ShoppingBag, UtensilsCrossed, Truck, CreditCard, Loader2 } from "lucide-react";

export interface OrderData {
  type: "takeaway" | "eat-in" | "delivery";
  tableNumber?: string;
  pickupTime?: string;
  deliveryStreet?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  deliveryInstructions?: string;
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

function getPickupSlots(): string[] {
  const slots: string[] = [];
  const now = new Date();
  // Round up to next 15 min, start 15 min from now
  const start = new Date(now);
  start.setMinutes(Math.ceil((now.getMinutes() + 15) / 15) * 15, 0, 0);
  for (let i = 0; i < 8; i++) {
    const t = new Date(start.getTime() + i * 15 * 60 * 1000);
    slots.push(t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }
  return slots;
}

export function CheckoutForm({ orderType, onSubmit }: Props) {
  const t = useTranslations("Checkout");
  const { items, total, clearCart, hydrated } = useCart();
  const [type, setType] = useState<"takeaway" | "eat-in" | "delivery">(
    orderType === "eat-in" ? "eat-in" : "takeaway"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("asap");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pickupSlots = useMemo(() => getPickupSlots(), []);

  if (!hydrated) return <div className={styles.page} />;

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
      const { url } = await onSubmit({
        type,
        name,
        phone,
        email,
        tableNumber,
        pickupTime: type === "takeaway" ? pickupTime : undefined,
        deliveryStreet: type === "delivery" ? deliveryStreet : undefined,
        deliveryCity: type === "delivery" ? deliveryCity : undefined,
        deliveryPostalCode: type === "delivery" ? deliveryPostalCode : undefined,
        deliveryInstructions: type === "delivery" ? deliveryInstructions : undefined,
        notes,
        items,
      });
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
          {(orderType === "both" || orderType === "takeaway") && (
            <div className={styles.typeToggle}>
              <button
                type="button"
                className={`${styles.typeBtn} ${type === "takeaway" ? styles.typeActive : ""}`}
                onClick={() => setType("takeaway")}
              >
                <ShoppingBag size={15} style={{marginRight: "0.35rem"}} />{t("takeaway")}
              </button>
              {orderType === "both" ? (
                <button
                  type="button"
                  className={`${styles.typeBtn} ${type === "eat-in" ? styles.typeActive : ""}`}
                  onClick={() => setType("eat-in")}
                >
                  <UtensilsCrossed size={15} style={{marginRight: "0.35rem"}} />{t("eatIn")}
                </button>
              ) : (
                <button
                  type="button"
                  className={`${styles.typeBtn} ${type === "delivery" ? styles.typeActive : ""}`}
                  onClick={() => setType("delivery")}
                >
                  <Truck size={15} style={{marginRight: "0.35rem"}} />{t("delivery")}
                </button>
              )}
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

          {type === "takeaway" && (
            <div className={styles.field}>
              <label>{t("pickupTime")}</label>
              <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                <option value="asap">{t("pickupAsap")}</option>
                {pickupSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          )}

          {type === "delivery" && (
            <>
              <div className={styles.field}>
                <label>{t("deliveryStreet")}</label>
                <input
                  required
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                  placeholder={t("deliveryStreetPlaceholder")}
                />
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>{t("deliveryPostalCode")}</label>
                  <input
                    required
                    value={deliveryPostalCode}
                    onChange={(e) => setDeliveryPostalCode(e.target.value)}
                    placeholder={t("deliveryPostalCodePlaceholder")}
                  />
                </div>
                <div className={styles.field}>
                  <label>{t("deliveryCity")}</label>
                  <input
                    required
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder={t("deliveryCityPlaceholder")}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>{t("deliveryInstructions")}</label>
                <input
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder={t("deliveryInstructionsPlaceholder")}
                />
              </div>
            </>
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
            {loading ? <><Loader2 size={15} style={{marginRight: "0.4rem", animation: "spin 1s linear infinite"}} />{t("redirecting")}</> : <><CreditCard size={15} style={{marginRight: "0.4rem"}} />{t("pay", { amount: `$${total.toFixed(2)}` })}</>}
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
