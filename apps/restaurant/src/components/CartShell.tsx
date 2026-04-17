"use client";

import { useState } from "react";
import { CartProvider, CartButton, CartDrawer } from "@repo/ui";

export function CartShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {children}
      <CartButton onClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}
