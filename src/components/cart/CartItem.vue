<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.gallery"
        alt="Название товара"
        height="120"
        width="120"
      />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ 'background-color': item.product.colors.color.code }"></i>
        {{ item.product.colors.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <BaseCounter :default-num="quantity" @update="changeQuantity" />

    <b class="product__price"> {{ formatNumber(item.product.price) }} ₽ </b>

    <button
      aria-label="Удалить товар из корзины"
      class="product__del button-del"
      type="button"
      @click.prevent="deleteProduct(item.basketItemId)"
    >
      <svg
        fill="none"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17 1L1 17" stroke="#9D9D9D" stroke-width="0.8" />
        <path d="M17 17L1 0.999999" stroke="#9D9D9D" stroke-width="0.8" />
      </svg>
    </button>
  </li>
</template>

<script>
import formatNumber from "@/mixins/formatNumber";
import BaseCounter from "@/components/main/BaseCounter";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "CartItem",
  components: { BaseCounter },
  data() {
    return {
      quantity: null,
    };
  },
  beforeMount() {
    this.quantity = this.item.quantity;
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [formatNumber],
  methods: {
    ...mapMutations({
      deleteCartProduct: "deleteCartProduct",
      updateCartProductAmount: "updateCartProductAmount",
    }),
    ...mapActions(["deleteCartProductItem"]),
    deleteProduct(productId) {
      this.deleteCartProduct(productId);
      this.deleteCartProductItem(productId);
    },
    changeQuantity(quantity) {
      this.quantity = quantity;
      this.updateCartProductAmount({
        productId: this.item.product.id,
        quantity: this.quantity,
      });
      this.$store.dispatch("updateCartProductAmountAction", {
        basketItemId: this.item.basketItemId,
        quantity: this.quantity,
      });
    },
  },
};
</script>

<style scoped></style>
