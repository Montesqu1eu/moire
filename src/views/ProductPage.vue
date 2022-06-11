<template>
  <div v-if="productLoading" class="preloader preloader-catalog">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <main v-else-if="!productData" class="content container">
    Загрузка не удалась
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            {{ productData.category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ productData.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            :src="selectedColor.gallery[0].file.url"
            alt="Название товара"
            height="570"
            width="570"
          />
        </div>
        <ul class="pics__list">
          <li
            v-for="(item, index) in productData.colors"
            :key="index"
            class="pics__item"
          >
            <a
              :data-id="item.id"
              :class="{ 'pics__link--current': item.id == selectedColor.id }"
              class="pics__link"
              @click.prevent="selectedColor = item"
            >
              <img
                :src="item.gallery[0].file.url"
                alt="Название товара"
                height="98"
                width="98"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">{{ productData.title }}</h2>
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

              <b class="item__price">
                {{ formatNumber(productData.price) }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset v-if="productColors" class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li
                    v-for="(item, index) in productColors"
                    :key="index"
                    class="colors__item"
                  >
                    <label class="colors__label">
                      <input
                        v-model="selectedColor"
                        :checked="index === 0"
                        :name="item.id"
                        :value="item"
                        class="colors__radio sr-only"
                        type="radio"
                      />
                      <span
                        :style="{ 'background-color': item.color.code }"
                        class="colors__value"
                      >
                      </span>
                    </label>
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
import formatNumber from "@/mixins/formatNumber";

export default {
  name: "ProductPage",
  mixins: [formatNumber],
  data() {
    return {
      productAmount: 1,
      productData: null,

      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,

      productColors: null,
      selectedColor: null,
    };
  },
  methods: {
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
        .then((response) => {
          this.productData = response.data;
          this.productColors = this.productData.colors;
          this.selectedColor = this.productColors[0];
        })
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
