import { IProduct } from "@/interfaces/IProduct";
import { createContext, useState } from "react";

interface ICart {
  product: IProduct;
}

export const CartContext = createContext<{
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
}>({
  cart: [],
  setCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
