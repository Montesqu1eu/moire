export function updateUserAccessKey(state, accessKey) {
  state.userAccessKey = accessKey;
}

export function updateCartProductAmount(state, { productId, quantity }) {
  const item = state.cartProducts.find((item) => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
}

export function updateCartProductsData(state, items) {
  state.cartProductsData = items;
}

export function syncCartProducts(state) {
  state.cartProducts = state.cartProductsData.map((item) => {
    return {
      productId: item.product.id,
      quantity: item.quantity,
      colorId: item.color.color.id,
      sizeId: item.size.id,
      basketItemId: item.id,
    };
  });
}

export function deleteCartProduct(state, productId) {
  state.cartProducts = state.cartProducts.filter(
    (item) => item.productId !== productId
  );
}

export function resetCart(state) {
  state.cartProducts = [];
  state.cartProductsData = [];
}

export function updateOrderInfo(state, orderInfo) {
  state.orderInfo = orderInfo;
}
