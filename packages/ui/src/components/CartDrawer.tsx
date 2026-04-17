"use client";

import { useCart } from "./CartProvider";
import styles from "./CartDrawer.module.css";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: Props) {
  const { items, total, updateQuantity, removeItem, itemCount } = useCart();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Order</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className={styles.itemControls}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.name, item.quantity - 1)}>−</button>
                    <span className={styles.qtyCount}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                    <button className={styles.removeBtn} onClick={() => removeItem(item.name)}>✕</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className={styles.checkoutBtn} onClick={onClose}>
                Checkout ({itemCount})
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function CartButton({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart();

  return (
    <button className={styles.cartButton} onClick={onClick} aria-label="Open cart">
      🛒
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  );
}
