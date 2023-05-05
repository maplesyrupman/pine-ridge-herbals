export const isStockLimited = (
    stockTracking: string,
    stockPurchaseable: boolean = false,
  ): boolean => !!stockTracking && !stockPurchaseable;