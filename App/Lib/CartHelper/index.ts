export const getCartProductPayload = (cartId: string, item: any, count: number) => {
  const cartPayload = {
    cartId: cartId,
    productDetail: {
      quantity: count,
      product: {
        code: item.SKU ?? item?.product?.code,
      },
    },
  };
  return cartPayload;
};

export const updateCartProductPayload = (cartId: string, item: any, count: number, entryNumber) => {
  const cartPayload = {
    cartId: cartId,
    entryNumber: entryNumber,
    productDetail: {
      quantity: count,
      product: {
        code: item.SKU ?? item?.product?.code,
      },
    },
  };
  return cartPayload;
};

export const removeItemFromCartPayload = (cartId: string, entryNumber: number) => {
  const cartPayload = {
    cartId: cartId,
    entryNumber: entryNumber,
  };
  return cartPayload;
};
