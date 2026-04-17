"use client";

import { useState } from "react";
import styles from "./MenuPageClient.module.css";

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
}

export function MenuPageClient({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const nonEmptyCategories = categories.filter((c) => c.items.length > 0);
  const tabs = ["All", ...nonEmptyCategories.map((c) => c.category)];

  const visibleCategories =
    activeCategory === "All"
      ? nonEmptyCategories
      : nonEmptyCategories.filter((c) => c.category === activeCategory);

  return (
    <div className={styles.menuPage}>
      <h1 className={styles.title}>Our Menu</h1>

      <div className={styles.tabs} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={`${tab}-${i}`}
            role="tab"
            aria-selected={activeCategory === tab}
            className={`${styles.tab} ${activeCategory === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.sections}>
        {visibleCategories.map((category, i) => (
          <section key={`${category.category}-${i}`} className={styles.section}>
              {activeCategory === "All" && (
                <h2 className={styles.sectionTitle}>{category.category}</h2>
              )}
              <div className={styles.grid}>
                {category.items.map((item) => (
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
                      <button className={styles.orderBtn}>Order</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
        ))}
      </div>
    </div>
  );
}
