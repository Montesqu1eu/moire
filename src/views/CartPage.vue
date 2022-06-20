<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Корзина </span>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ products.length }} товара </span>
      </div>
    </div>

    <section class="cart">
      <form action="#" class="cart__form form" method="POST" @click.prevent>
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="(product, index) in products"
              :key="index"
              :item="product"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ formatNumber(total) }} ₽</span>
          </p>

          <router-link
            :to="{ name: 'order' }"
            class="cart__button button button--primery"
            type="submit"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from "@/components/cart/CartItem";
import { mapGetters } from "vuex";
import formatNumber from "@/mixins/formatNumber";

export default {
  name: "CartPage",
  components: {
    CartItem,
  },
  mixins: [formatNumber],
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      total: "cartTotalPrice",
    }),
  },
};
</script>

<style scoped></style>
