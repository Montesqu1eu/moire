import { createStore } from "vuex";
import state from "@/store/state";
import * as mutations from "@/store/mutations";
import * as actions from "@/store/actions";

export default createStore({
  state,
  mutations,
  actions,
  modules: {},
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;
        return {
          ...item,
          product: {
            ...product,
            colors: product.colors.find(
              (color) => color.color.id === item.colorId
            ),
            gallery: product.colors.find(
              (color) => color.color.id === item.colorId
            ).gallery[0].file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.quantity + acc,
        0
      );
    },
  },
});
