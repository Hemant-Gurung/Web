"use client";

import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";
import { LocaleLink } from "./LocaleLink";
import styles from "./CartDrawer.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: Props) {
  const { items, total, updateQuantity, removeItem, itemCount } = useCart();
  const t = useTranslations("Cart");

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label={t("close")}>✕</button>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>{t("empty")}</p>
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
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <LocaleLink href="/checkout" className={styles.checkoutBtn} onClick={onClose}>
                {t("checkout", { count: itemCount })}
              </LocaleLink>
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
