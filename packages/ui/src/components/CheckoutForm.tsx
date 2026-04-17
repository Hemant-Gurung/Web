"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
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
  onSubmit: (data: OrderData) => Promise<void>;
}

export function CheckoutForm({ orderType, onSubmit }: Props) {
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>Your cart is empty. <a href="/menu">Back to menu</a></p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.confirmation}>
          <div className={styles.confirmIcon}>✓</div>
          <h1>Order placed!</h1>
          <p>We&apos;ve received your order and will start preparing it shortly.</p>
          <a href="/menu" className={styles.backBtn}>Order more</a>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit({ type, name, phone, email, tableNumber, notes, items });
      clearCart();
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.layout}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {orderType === "both" && (
            <div className={styles.typeToggle}>
              <button
                type="button"
                className={`${styles.typeBtn} ${type === "takeaway" ? styles.typeActive : ""}`}
                onClick={() => setType("takeaway")}
              >
                Takeaway
              </button>
              <button
                type="button"
                className={`${styles.typeBtn} ${type === "eat-in" ? styles.typeActive : ""}`}
                onClick={() => setType("eat-in")}
              >
                Eat In
              </button>
            </div>
          )}

          {type === "eat-in" && (
            <div className={styles.field}>
              <label>Table Number</label>
              <input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 5"
              />
            </div>
          )}

          <div className={styles.field}>
            <label>Name *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className={styles.field}>
            <label>Phone *</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className={styles.field}>
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, special requests…"
              rows={3}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Placing order…" : `Place Order · $${total.toFixed(2)}`}
          </button>
        </form>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <ul className={styles.summaryList}>
            {items.map((item) => (
              <li key={item.name} className={styles.summaryItem}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
