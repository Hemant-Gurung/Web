"use client";

import { useState } from "react";
import type { MenuCategory } from "@/types";
import styles from "./MenuPageClient.module.css";

interface Props {
  categories: MenuCategory[];
}

export default function MenuPageClient({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allLabel = "All";
  const tabs = [allLabel, ...categories.map((c) => c.category)];

  const visibleCategories =
    activeCategory === allLabel
      ? categories
      : categories.filter((c) => c.category === activeCategory);

  return (
    <div className={styles.menuPage}>
      <h1 className={styles.title}>Our Menu</h1>

      {/* Category tabs */}
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeCategory === tab}
            className={`${styles.tab} ${activeCategory === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category sections */}
      <div className={styles.sections}>
        {visibleCategories.map((category) => (
          <section key={category.category} className={styles.section}>
            {activeCategory === allLabel && (
              <h2 className={styles.sectionTitle}>{category.category}</h2>
            )}
            <div className={styles.grid}>
              {category.items.map((item) => (
                <div key={item.name} className={styles.card}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                    <button className={styles.orderBtn} aria-label={`Order ${item.name}`}>
                      Order
                    </button>
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
