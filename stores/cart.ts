import { create } from 'zustand';
import { isStockLimited } from '@/lib/utils/products';
// import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { AddCartLineMutationOptions, Cart, CartFragFragment, useGetCartQuery } from 'generated/graphql'
import client from '@/lib/apollo/client';
import GetCart from '@/graphql/queries/getCart.gql'
import AddCartLineItem from '@/graphql/mutations/addCartLineItem.gql'
import CreateCart from '@/graphql/mutations/createCart.gql'

interface CartState {
  cart: CartFragFragment | null;
  cartId: string,
  visible: boolean;
  showCart: () => void;
  hideCart: () => void;
  getCart: (cartId: string) => Promise<void>;
  addToCart: (merchandiseId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, input: any) => Promise<void>; //changed input to type any, was previously SwellCartItemInput 
}

interface LineItemInput {
  merchandiseId: string,
  quantity: number,
  cartId: string,
}

const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  cartId: 'null',
  setCartId: (newId: string) => set(state => ({ ...state, cartId: newId })),
  visible: false,
  showCart: () => set((state) => ({ ...state, visible: true })),
  hideCart: () => set((state) => ({ ...state, visible: false })),
  getCart: async (cartId) => {
    try {
      if (cartId != 'null') {
        const { data } = await client.query({ query: GetCart, variables: { cartId } })
        set(state => ({ ...state, cart: data.cart }))
      }
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (merchandiseId: string, quantity: number) => {
    try {
      if (!merchandiseId || quantity <= 0) return;
      const cartId = get().cartId
      console.log(cartId)
      console.log(merchandiseId)
      console.log(quantity)
      if (cartId != "null") {
        const { data } = await client.mutate({ mutation: AddCartLineItem, variables: { cartId, merchandiseId, quantity } })
        set(state => ({ ...state, cart: data.cartCreate.cart }))
      } else {
        const { data } = await client.mutate({ mutation: CreateCart, variables: { quantity, merchandiseId } })
        console.log(data)
        const newCartId = data.cartCreate.cart.id
        console.log(newCartId)
        set(state => ({ ...state, cart: data.cartCreate.cart, id: data.cartCreate.cart.id }))
      }

      // if (
      // doesnt have enough stock to purchase requested quantity 
      // ) {
      //   // const send = useNotificationStore.getState().send;

      //   // const stockMessage = i18n('products.stock.not_enough', {
      //   //   quantity: quantity.toString(),
      //   // });
      //   // send({
      //   //   message: stockMessage,
      //   //   type: NOTIFICATION_TYPE.ERROR,
      //   // });
      //   throw new Error('Not enough stock');
      // }

      // convert to graphql mutation 
      // may have to write ADD_TO_CART first 

    } catch (error) {
      console.error(error);
    }
  },
  removeItem: async (itemId) => {
    // try {
    //   const res = await fetch(API_ROUTES.CART_ITEMS, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ itemId }),
    //   });

    //   const cart = (await res.json()) as CartData;

    //   set((state) => ({
    //     cart: {
    //       ...state.cart,
    //       total: cart.data.total,
    //       items: cart.data.items,
    //       checkoutUrl: cart.data.checkoutUrl,
    //       empty: !cart.data.items.length,
    //     },
    //   }));
    // } catch (error) {
    //   console.error(error);
    // }
  },
  updateItem: async (itemId, input) => {
    // try {
    //   const res = await fetch(API_ROUTES.CART_ITEMS, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ itemId, input }),
    //   });

    //   const cart = (await res.json()) as CartData;

    //   set((state) => ({
    //     cart: {
    //       ...state.cart,
    //       total: cart.data.total,
    //       items: cart.data.items,
    //       checkoutUrl: cart.data.checkoutUrl,
    //       empty: !cart.data.items.length,
    //     },
    //   }));
    // } catch (error) {
    //   console.error(error);
    // }
  },
}));

export default useCartStore;