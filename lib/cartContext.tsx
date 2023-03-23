import React, { createContext, useContext, useState } from "react";

interface CartItem {
    id: string;
    title: string;
}

interface CartContextValue {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
    return useContext(CartContext);
};

export function CartProvider(props: React.PropsWithChildren) {
    const {children} = props
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: CartItem) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const value: CartContextValue = {
        cart,
        addToCart,
        removeFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
