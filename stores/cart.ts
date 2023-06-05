"use client"
import { create } from 'zustand';
import { isStockLimited } from '@/lib/utils/products';
// import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { AddCartLineMutationOptions, Cart, CartFragFragment, useGetCartQuery, useCreateCartMutation, useRemoveCartLineItemMutation, useUpdateCartLineItemMutation, useAddCartLineMutation } from 'generated/graphql'
import client from '@/lib/apollo/client';
// import GetCart from '@/graphql/queries/getCart.gql'
// import AddCartLineItem from '@/graphql/mutations/addCartLineItem.gql'
// import CreateCart from '@/graphql/mutations/createCart.gql'
// import DeleteCartLineItem from "@/graphql/mutations/deleteCartLineItem.gql"
// import UpdateCartLineItem from "@/graphql/mutations/updateCartLineItem.gql"

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
        const { data } = useGetCartQuery({ variables: { cartId } })
        if (data) {
          set(state => ({ ...state, cart: data.cart }))
        }
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
      if (cartId != "null" && typeof cartId === 'string') {
        const [addCartLine] = useAddCartLineMutation({ variables: { cartId, merchandiseId, quantity } })
        const { data } = await addCartLine()
        if (data?.cartLinesAdd != undefined) {
          //@ts-ignore
          set(state => ({ ...state, cart: data.cartLinesAdd.cart }))
        }

      } else {
        const [createCart] = useCreateCartMutation({variables: { quantity, merchandiseId}})
        const { data } = await createCart()
        //@ts-ignore
        const newCartId = data?.cartCreate?.cart.id
        console.log(newCartId)
        //@ts-ignore
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
      //@ts-ignore
      const [deleteCartLineItem] = useRemoveCartLineItemMutation({variables: { cartId, lineId } })
      const {data} = await deleteCartLineItem()
      //@ts-ignore
      set(state => ({ ...state, cart: data.cartLinesRemove.cart }))
    } catch (error) {
      console.error(error);
    }
  },
  updateItem: async (lineId, quantity) => {
    try {
      const cartId = get().cart?.id
      //@ts-ignore
      const [updateCartLineItem] = useUpdateCartLineItemMutation({variables: { cartId, lineId, quantity }})
      const { data, errors } = await updateCartLineItem()
      console.log(errors)
      //@ts-ignore
      set(state => ({ ...state, cart: data.cartLinesUpdate.cart }))
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCartStore;