<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#"> Носки </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Носки с принтом мороженое </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            alt="Название товара"
            height="570"
            src="img/product-square-1.jpg"
            srcset="img/product-square-1@2x.jpg 2x"
            width="570"
          />
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a class="pics__link pics__link--current" href="">
              <img
                alt="Название товара"
                height="98"
                src="img/product-square-2.jpg"
                srcset="img/product-square-2@2x.jpg 2x"
                width="98"
              />
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="">
              <img
                alt="Название товара"
                height="98"
                src="img/product-square-3.jpg"
                srcset="img/product-square-3@2x.jpg 2x"
                width="98"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">Смартфон Xiaomi Mi Mix 3 6/128GB</h2>
        <div class="item__form">
          <form action="#" class="form" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button aria-label="Убрать один товар" type="button">
                  <svg fill="currentColor" height="12" width="12">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input name="count" type="text" value="1" />

                <button aria-label="Добавить один товар" type="button">
                  <svg fill="currentColor" height="12" width="12">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> 18 990 ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        checked=""
                        class="colors__radio sr-only"
                        name="color-item"
                        type="radio"
                        value="blue"
                      />
                      <span
                        class="colors__value"
                        style="background-color: #73b6ea"
                      >
                      </span>
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        name="color-item"
                        type="radio"
                        value="yellow"
                      />
                      <span
                        class="colors__value"
                        style="background-color: #ffbe15"
                      >
                      </span>
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        name="color-item"
                        type="radio"
                        value="gray" />
                      <span
                        class="colors__value"
                        style="background-color: #939393"
                      >
                      </span
                    ></label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <select class="form__select" name="category" type="text">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  name: "ProductPage",
  data() {
    return {
      productAmount: 1,
      productData: null,

      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  methods: {
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
        .then((response) => (this.productData = response.data))
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.push({ name: "notfound" });
          } else {
            this.productLoadingFailed = true;
          }
        })
        .finally(() => (this.productLoading = false));
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
