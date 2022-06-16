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
  <main v-else-if="!productLoading" class="content container">
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
      <BaseGallery
        :img-list="productData.colors"
        img-picker
        @color="pickedImg"
      />
      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">{{ productData.title }}</h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <BaseCounter @update="updateQuantity" />
              <b class="item__price">
                {{ formatNumber(productData.price) }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li
                    v-for="(item, index) in productData.colors"
                    :key="index"
                    class="colors__item"
                  >
                    <label class="colors__label">
                      <input
                        v-model="productInfo.colorId"
                        :checked="index === 0"
                        :name="item.id"
                        :value="item.color.id"
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
              <BaseSelect :data-list="productData.sizes" @select="getSize" />
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
import { mapActions } from "vuex";

import BaseSelect from "@/components/main/BaseSelect";
import BaseCounter from "@/components/main/BaseCounter";
import BaseGallery from "@/components/main/BaseGallery";

export default {
  name: "ProductPage",
  mixins: [formatNumber],
  components: {
    BaseGallery,
    BaseCounter,
    BaseSelect,
  },
  data() {
    return {
      productData: null,

      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,

      productInfo: {},
    };
  },
  methods: {
    ...mapActions(["addProductToCart", "updateCartProductAmountAction"]),
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
        .then((response) => {
          this.productData = response.data;

          this.productInfo = {
            productId: this.productData.id,
            sizeId: this.productData.sizes[0].id,
            sizeName: this.productData.sizes,
            quantity: 1,
            colorId: this.productData.colors[0].color.id,
            sizes: this.productData.sizes,
          };
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.push({ name: "error", params: {} });
          } else {
            this.productLoadingFailed = true;
          }
        })
        .finally(() => (this.productLoading = false));
    },
    getSize(size) {
      this.productInfo.sizeId = size.id;
    },
    updateQuantity(quantity) {
      this.productInfo.quantity = quantity;
    },
    pickedImg(id) {
      this.productInfo.colorId = id;
    },
    ...mapActions(["addProductToCart", "updateCartProductAmountAction"]),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.productInfo.productId,
        colorId: this.productInfo.colorId,
        sizeId: this.productInfo.sizeId,
        quantity: this.productInfo.quantity,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        })
        .catch((error) => {
          console.log(error);
        });
      // } else {
      //   this.updateCartProductAmountAction({
      //     basketItemId: this.productInfo.productId,
      //     quantity: this.productInfo.quantity,
      //   }).then(() => {
      //     this.productAdded = true;
      //     this.productAddSending = false;
      //   });
      // }
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        if (!this.$route.params.id) return;
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
