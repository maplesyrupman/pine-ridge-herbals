import { create } from 'zustand';
import { isStockLimited } from '@/lib/utils/products';
// import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { AddCartLineMutationOptions, Cart, CartFragFragment, useGetCartQuery } from 'generated/graphql'
import client from '@/lib/apollo/client';
import { GetCartDocument, AddCartLineDocument, CreateCartDocument, RemoveCartLineItemDocument, UpdateCartLineItemDocument } from 'generated/graphql';

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
        const { data } = await client.query({ query: GetCartDocument, variables: { cartId } })
        set(state => ({ ...state, cart: data.cart }))
      }
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (merchandiseId: string, quantity: number) => {
    try {
      if (!merchandiseId || quantity <= 0) return;
      const cartId = localStorage.getItem('cartId')
      console.log(cartId)
      console.log(merchandiseId)
      console.log(quantity)
      if (cartId != "null") {
        const { data } = await client.mutate({ mutation: AddCartLineDocument, variables: { cartId, merchandiseId, quantity } })
        set(state => ({ ...state, cart: data.cartLinesAdd.cart }))
      } else {
        const { data } = await client.mutate({ mutation: CreateCartDocument, variables: { quantity, merchandiseId } })
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
  removeItem: async (lineId) => {
    try {
      const cartId = get().cart?.id
      const {data} = await client.mutate({mutation: RemoveCartLineItemDocument, variables: {cartId ,lineId}})
      set(state => ({...state, cart: data.cartLinesRemove.cart}))
    } catch (error) {
      console.error(error);
    }
  },
  updateItem: async (lineId, quantity) => {
    try {
      const cartId = get().cart?.id
      const {data, errors} = await client.mutate({mutation: UpdateCartLineItemDocument, variables: {cartId, lineId, quantity}})
      console.log(errors)
      set(state => ({...state, cart: data.cartLinesUpdate.cart}))
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCartStore;