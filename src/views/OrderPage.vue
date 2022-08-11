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

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form
        action="#"
        class="cart__form form"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormInput
              v-model="formData.name"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
            />

            <BaseFormInput
              v-model="formData.address"
              :error="formError.address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
            />

            <BaseFormInput
              v-model="formData.phone"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
            />

            <BaseFormInput
              v-model="formData.email"
              :error="formError.email"
              placeholder="Введите ваш email"
              title="Email"
            />

            <BaseFormTextarea
              v-model="formData.comment"
              :error="formError.comment"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
            />
          </div>

          <div class="cart__options">
            <h3 v-if="deliveryData" class="cart__title">Доставка</h3>
            <ul v-if="deliveryData" class="cart__options options">
              <li
                v-for="(item, index) in deliveryData"
                :key="index"
                class="options__item"
              >
                <label class="options__label">
                  <input
                    v-model="formData.deliveryTypeId"
                    :checked="index === 0"
                    :value="item.id"
                    class="options__radio sr-only"
                    name="delivery"
                    type="radio"
                  />
                  <span class="options__value">
                    {{ item.title }} <b>{{ item.price }} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul v-if="paymentData" class="cart__options options">
              <li
                v-for="(item, index) in paymentData"
                :key="index"
                class="options__item"
              >
                <label class="options__label">
                  <input
                    v-model="formData.paymentTypeId"
                    :checked="index === 0"
                    :value="item.id"
                    class="options__radio sr-only"
                    name="pay"
                    type="radio"
                  />
                  <span class="options__value"> {{ item.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              v-for="(item, index) in products"
              :key="index"
              class="cart__order"
            >
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }} ₽</b>
              <div style="color: gray; font-size: 12px">
                <div>Размер: {{ item.size.title }}</div>
                <div>Цвет: {{ item.product.colors.color.title }}</div>
                <div>Артикул: {{ item.product.id }}</div>
              </div>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>
              Итого: <b>{{ products.length }}</b> товара на сумму
              <b>{{ formatNumber(totalPrice) }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import formatNumber from "@/mixins/formatNumber";
import BaseFormInput from "@/components/text/BaseFormInput";
import BaseFormTextarea from "@/components/text/BaseFormTextarea";
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  name: "OrderPage",
  components: { BaseFormInput, BaseFormTextarea },
  mixins: [formatNumber],
  data() {
    return {
      formData: {
        deliveryTypeId: null,
        paymentTypeId: null,
      },
      formError: {},
      formErrorMessage: "",
      deliveryData: 0,
      paymentData: 0,
    };
  },
  methods: {
    async loadDelivery() {
      await axios
        .get(API_BASE_URL + "/api/deliveries")
        .then((response) => {
          this.deliveryData = response.data;
          this.formData.deliveryTypeId = this.deliveryData[0].id;
        })
        .catch(() => {
          this.deliveryData = 0;
        });
    },
    async paymentType() {
      await axios
        .get(API_BASE_URL + "/api/payments", {
          params: {
            deliveryTypeId: this.formData.deliveryTypeId,
          },
        })
        .then((response) => {
          this.paymentData = response.data;
          this.formData.paymentTypeId = this.paymentData[0].id;
        })
        .catch((error) => {
          this.formData.deliveryTypeId = 1;
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
          // setTimeout(() => this.$store.commit("setError", ""), 2000);
        });
    },
    order() {
      this.formError = {};
      this.formErrorMessage = "";

      axios
        .post(
          API_BASE_URL + "/api/orders",
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          this.$store.commit("resetCart");
          this.$store.commit("updateOrderInfo", response.data);
          this.$router.push({
            name: "orderInfo",
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.$store.commit("showNotification", {
            title: "Error",
            message: error.message,
            type: "error",
          });
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
  },
  created() {
    this.loadDelivery();
  },
  watch: {
    "formData.deliveryTypeId"() {
      this.paymentType();
    },
    // eslint-disable-next-line
  }
  // eslint-disable-next-line
};
</script>

<style scoped></style>
