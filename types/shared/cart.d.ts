import { MandatoryImageProps } from "../global";

export interface CartProps {
    visible: boolean;
    setVisible?: (visible: boolean) => void;
    total: number;
    items: CartItemProps[];
    empty: boolean;
    checkoutUrl: string;
}

export interface CartItemProps {
    id: string;
    image: MandatoryImageProps;
    title: string;
    price: number;
    priceTotal: number;
    quantity: number;
    minQuantity: number;
    purchaseOption: string;
    href: string;
    productId: string;
    productOptions: any[];
    isMembership?: boolean;
    stockTracking?: string;
    stockPurchasable?: boolean;
    stockLevel?: string;
    variantName?: string;
}

export interface CartData {
    data: {
        total: number;
        items: CartItemProps[];
        checkoutUrl: string;
    };
}

export type CartItemInputOption =
    | {
        id: string;
        valueId: string;
    }
    | {
        id: string;
        value: string;
    };

export interface CartItemInput {
    productId: string;
    quantity: number;
    options?: CartItemInputOption[];
    purchaseOption?: any;
}