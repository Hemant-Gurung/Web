"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./MenuPageClient.module.css";
import { useCart } from "./CartProvider";
import { Tabs } from "./Tabs";

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface Props {
  categories: MenuCategory[];
  orderingEnabled?: boolean;
}

export function MenuPageClient({ categories, orderingEnabled = false }: Props) {
  const t = useTranslations("Menu");
  const [activeCategory, setActiveCategory] = useState<string>(t("all"));
  const { items: cartItems, addItem, updateQuantity } = useCart();

  const nonEmptyCategories = categories.filter((c) => c.items.length > 0);
  const allLabel = t("all");
  const tabs = [allLabel, ...nonEmptyCategories.map((c) => c.category)];

  const visibleCategories =
    activeCategory === allLabel
      ? nonEmptyCategories
      : nonEmptyCategories.filter((c) => c.category === activeCategory);

  return (
    <div className={styles.menuPage}>
      <h1 className={styles.title}>{t("title")}</h1>

      <Tabs tabs={tabs} active={activeCategory} onChange={setActiveCategory} />

      <div className={styles.sections}>
        {visibleCategories.map((category, i) => (
          <section key={`${category.category}-${i}`} className={styles.section}>
            {activeCategory === allLabel && (
              <h2 className={styles.sectionTitle}>{category.category}</h2>
            )}
            <div className={styles.grid}>
              {category.items.map((item) => {
                const cartItem = cartItems.find((c) => c.name === item.name);
                return (
                  <div key={item.name} className={styles.card}>
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cardImage}
                      />
                    )}
                    <div className={styles.cardBody}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemDesc}>{item.description}</p>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.price}>${item.price.toFixed(2)}</span>
                      {orderingEnabled && (cartItem ? (
                        <div className={styles.qty}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.name, cartItem.quantity - 1)}
                          >
                            −
                          </button>
                          <span className={styles.qtyCount}>{cartItem.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.name, cartItem.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.orderBtn}
                          onClick={() => addItem({ name: item.name, price: item.price, image: item.image })}
                        >
                          {t("add")}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
