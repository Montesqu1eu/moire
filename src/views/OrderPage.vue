<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form action="#" class="cart__form form" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormInput
              v-model="formData.name"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
            />

            <label class="form__label">
              <input
                class="form__input"
                name="address"
                placeholder="Введите ваш адрес"
                type="text"
              />
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                name="phone"
                placeholder="Введите ваш телефон"
                type="tel"
              />
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                name="email"
                placeholder="Введи ваш Email"
                type="email"
              />
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                name="comments"
                placeholder="Ваши пожелания"
              ></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    checked=""
                    class="options__radio sr-only"
                    name="delivery"
                    type="radio"
                    value="0"
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    name="delivery"
                    type="radio"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>290 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    checked=""
                    class="options__radio sr-only"
                    name="pay"
                    type="radio"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    name="pay"
                    type="radio"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
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
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или
            перезагрузите страницу.
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

export default {
  name: "OrderPage",
  components: { BaseFormInput },
  mixins: [formatNumber],
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: "",
    };
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
  },
};
</script>

<style scoped></style>
