import { CartContext } from "@/contexts/cart-context";
import { useContext } from "react";

export function useCart() {
  const { cart, setCart } = useContext(CartContext);

  return { cart, setCart };
}
