import {create} from 'zustand';
import { isStockLimited } from '@/lib/utils/products';
// import { NOTIFICATION_TYPE } from 'types/shared/notification';
// import { API_ROUTES } from 'types/shared/api';
import type { CartProps, CartItemProps, CartData, CartItemInput } from '@/types/shared/cart';
// import { getI18n } from 'hooks/useI18n';

export interface AddToCartConfig {
  showCartAfter?: boolean;
  data?: {
    variant?: {
      name: string;
    };
  };
}

interface CartState {
  cart: CartProps;
  showCart: () => void;
  hideCart: () => void;
  getCart: () => Promise<void>;
  addToCart: (input: CartItemInput, config?: AddToCartConfig) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, input: any) => Promise<void>; //changed input to type any, was previously SwellCartItemInput 
}

const useCartStore = create<CartState>((set, get) => ({
  cart: {
    total: 0,
    items: [],
    visible: false,
    empty: true,
    setVisible: (visible: boolean) =>
      set((state) => ({ cart: { ...state.cart, visible } })),
    checkoutUrl: '#',
  },
  showCart: () => set((state) => ({ cart: { ...state.cart, visible: true } })),
  hideCart: () => set((state) => ({ cart: { ...state.cart, visible: false } })),
  getCart: async () => {
    try {
      const res = await fetch(API_ROUTES.CART);

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (input: CartItemInput, config = { showCartAfter: true }) => {
    try {
      const { productId } = input;
      if (!productId) return;
      const quantity = input.quantity ?? 1;
      const { items } = get().cart;
      if (
        !hasSufficientStock(
          productId,
          quantity,
          items,
          config.data?.variant?.name,
        )
      ) {
        // const send = useNotificationStore.getState().send;

        // const stockMessage = i18n('products.stock.not_enough', {
        //   quantity: quantity.toString(),
        // });
        // send({
        //   message: stockMessage,
        //   type: NOTIFICATION_TYPE.ERROR,
        // });
        throw new Error('Not enough stock');
      }

      // convert to graphql mutation 
      // may have to write ADD_TO_CART first 
      const res = await fetch(API_ROUTES.CART, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));

      if (config.showCartAfter) {
        get().showCart();
      }
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: async (itemId) => {
    try {
      const res = await fetch(API_ROUTES.CART_ITEMS, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateItem: async (itemId, input) => {
    try {
      const res = await fetch(API_ROUTES.CART_ITEMS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, input }),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export function hasSufficientStock(
  productId: string,
  quantity: number,
  cartItems: CartItemProps[],
  variantName?: string,
): boolean {
  const itemInCart = cartItems.find(
    (item) =>
      item.productId === productId &&
      (variantName ? item.variantName === variantName : true),
  );
  if (!itemInCart) return true;
  const { stockTracking, stockPurchasable } = itemInCart;
  if (!isStockLimited(stockTracking as string, stockPurchasable)) {//added double bang to stockPurchasable to convert to boolean 
    return true;
  }
  const { quantity: quantityInCart, stockLevel } = itemInCart;
  return quantity + quantityInCart <= (Number(stockLevel) ?? 0); // wrapped stockLevel in Number() 
}

export default useCartStore;