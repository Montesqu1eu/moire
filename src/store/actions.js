import axios from "axios";
import { API_BASE_URL } from "@/config";

export async function loadCart(context) {
  await axios
    .get(API_BASE_URL + "/api/baskets", {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
    .then((response) => {
      if (!context.state.userAccessKey) {
        localStorage.setItem("userAccessKey", response.data.user.accessKey);
        context.commit("updateUserAccessKey", response.data.user.accessKey);
      }
      context.commit("updateCartProductsData", response.data.items);
      context.commit("syncCartProducts");
    });
}

export async function addProductToCart(
  context,
  { productId, colorId, sizeId, quantity }
) {
  return await axios
    .post(
      API_BASE_URL + "/api/baskets/products",
      {
        productId: productId,
        colorId: colorId,
        sizeId: sizeId,
        quantity: quantity,
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }
    )
    .then((response) => {
      context.commit("updateCartProductsData", response.data.items);
      context.commit("syncCartProducts");
    });
}

export async function updateCartProductAmountAction(
  context,
  { basketItemId, quantity }
) {
  context.commit("updateCartProductAmount", {
    //updateCartProductAmount из мутаций
    basketItemId,
    quantity,
  });

  if (quantity < 1) return;

  return await axios
    .put(
      API_BASE_URL + "/api/baskets/products",
      {
        basketItemId: basketItemId,
        quantity: quantity,
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }
    )
    .then((response) => {
      context.commit("updateCartProductsData", response.data.items);
    })
    .catch(() => {
      context.commit("syncCartProducts");
    });
}

export async function deleteCartProductItem(context, productId) {
  context.state.cartProducts = context.state.cartProducts.filter(
    (item) => item.basketItemId !== productId
  );

  await axios
    .delete(API_BASE_URL + "/api/baskets/products", {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        basketItemId: productId,
      },
    })
    .catch((error) => {
      context.commit("updateCartProductsData", error.data.items);
    });
}

export function loadOrderInfo(context, orderId) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + "/api/orders/" + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
      .then((response) => {
        resolve(response);
        context.commit("updateOrderInfo", response.data);
      })
      .catch((error) => reject(error));
  });
}
