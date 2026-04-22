"use client";

import { useState } from "react";
import { CartProvider, CartButton, CartDrawer } from "@repo/ui";

export function CartShell({ children, orderingEnabled }: { children: React.ReactNode; orderingEnabled: boolean }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {children}
      {orderingEnabled && (
        <>
          <CartButton onClick={() => setCartOpen(true)} />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
      )}
    </CartProvider>
  );
}
