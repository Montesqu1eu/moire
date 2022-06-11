<template>
  <li class="catalog__item">
    <router-link
      :to="{ name: 'product', params: { id: product.id } }"
      class="catalog__pic"
    >
      <img
        v-if="selectedItem.gallery"
        :src="selectedItem.gallery[0].file.url"
        alt="Название товара"
      />
      <div v-else class="catalog__error">
        <img alt="" src="@/assets/img/error.png" />
        <span>Извините, мы не успели загрузить фото</span>
      </div>
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ formatPrice(product.price) }} ₽ </span>

    <ul class="colors colors--black">
      <li
        v-for="(color, index) in product.colors"
        :key="color"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            v-model="selectedItem"
            :checked="index === 0"
            :name="product.id"
            :value="color"
            class="colors__radio sr-only"
            type="radio"
          />
          <span
            :style="{
              'background-color': color.color.code,
            }"
            class="colors__value"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedItem: this.product.colors[0] ?? null,
    };
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>

<style scoped></style>
