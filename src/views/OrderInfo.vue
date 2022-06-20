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
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Оформление заказа </span>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form action="#" class="cart__form form" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ order.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ order.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> {{ order.paymentType }} </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              v-for="(item, index) in order.basket.items"
              :key="index"
              class="cart__order"
            >
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
              <span>Цвет: {{ item.color.color.title }}</span>
              <span>Размер: {{ item.size.title }}</span>
              <span>Кол-вл: {{ item.quantity }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b>{{ order.deliveryType.title }}</b>
            </p>
            <p>
              Итого: <b>{{ order.basket.items.length }}</b> товара на сумму
              <b>{{ formatNumber(order.totalPrice) }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import formatNumber from "@/mixins/formatNumber";

export default {
  name: "OrderInfo",
  mixins: [formatNumber],
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
  },
  watch: {
    "$route.params.id": {
      handler() {
        // if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) return;
        this.$store
          .dispatch("loadOrderInfo", this.$route.params.id)
          .catch(() => this.$router.push({ name: "notfound" }));
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
