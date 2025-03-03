<template>
  <aside class="product-filters">
    <form class="product-filters__form" method="get" @submit.prevent>
      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Цена</legend>
        <label class="product-filters__label product-filters__label--price">
          <input
            v-model.number="currentFilters.priceFrom"
            class="product-filters__input"
            name="min-price"
            type="text"
          />
          <span class="product-filters__value">От</span>
        </label>
        <label class="product-filters__label product-filters__label--price">
          <input
            v-model.number="currentFilters.priceTo"
            class="product-filters__input"
            name="max-price"
            type="text"
          />
          <span class="product-filters__value">До</span>
        </label>
      </fieldset>

      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Цвет</legend>
        <ul class="product-filters__colors">
          <li
            v-for="(color, index) in colorsData"
            :key="index"
            class="product-filters__colors-item"
          >
            <label class="product-filters__colors-label">
              <input
                v-model="currentFilters.colorIds"
                :name="color.id"
                :value="color.id"
                class="product-filters__colors-input sr-only"
                type="checkbox"
              />
              <span
                :style="{
                  'background-color': color.code,
                }"
                class="product-filters__colors-value"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Категория</legend>
        <label class="product-filters__label product-filters__label--select">
          <select
            v-model.number="currentFilters.categoryId"
            class="product-filters__select"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categoriesData"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Материал</legend>
        <ul class="product-filters__check-list">
          <li
            v-for="(material, index) in materialsData"
            :key="index"
            class="product-filters__check-item"
          >
            <label class="product-filters__check-label">
              <input
                v-model.number="currentFilters.materialIds"
                :value="material.id"
                class="product-filters__check-input sr-only"
                name="material"
                type="checkbox"
              />
              <span class="product-filters__check-desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Коллекция</legend>
        <ul class="product-filters__check-list">
          <li
            v-for="(season, index) in seasonsData"
            :key="index"
            class="product-filters__check-item"
          >
            <label class="product-filters__check-label">
              <input
                v-model.number="currentFilters.seasonIds"
                :value="season.id"
                class="product-filters__check-input sr-only"
                name="season"
                type="checkbox"
              />
              <span class="product-filters__check-desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="product-filters__block">
        <legend class="product-filters__legend">Кол-во товаров</legend>
        <ul class="product-filters__check-list">
          <li
            v-for="(item, index) in productLimit"
            :key="index"
            class="product-filters__check-item"
          >
            <label class="product-filters__check-label">
              <input
                v-model="currentFilters.limit"
                :checked="index === 0"
                :name="item"
                :value="item"
                class="product-filters__check-input sr-only"
                type="radio"
              />
              <span class="product-filters__check-desc">{{ item }}</span>
            </label>
          </li>
        </ul>
      </fieldset>

      <BaseButton class="product-filters__submit" type="primary" @click="submit">
        Применить
      </BaseButton>
      <BaseButton class="product-filters__reset" type="secondary" @click="reset">
        Сбросить
      </BaseButton>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";
import BaseButton from "@/components/uiKit/baseButton/BaseButton";

// const productLimit = [12, 24, 32];

export default {
  name: "ProductFilters",
  components: {
    BaseButton,
  },
  data() {
    return {
      filters: {
        materialsData: "/api/materials/",
        colorsData: "/api/colors/",
        seasonsData: "/api/seasons/",
        categoriesData: "/api/productCategories/",
      },
      productLimit: [12, 24, 32],
      materialsData: [],
      colorsData: [],
      seasonsData: [],
      categoriesData: [],

      currentFilters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        materialIds: [],
        seasonIds: [],
        colorIds: [],
        limit: 12,
      },
    };
  },
  methods: {
    submit() {
      this.$emit("priceFrom", this.currentFilters.priceFrom);
      this.$emit("priceTo", this.currentFilters.priceTo);
      this.$emit("categoryId", this.currentFilters.categoryId);
      this.$emit("materialIds", this.currentFilters.materialIds);
      this.$emit("seasonIds", this.currentFilters.seasonIds);
      this.$emit("colorIds", this.currentFilters.colorIds);
      this.$emit("limit", this.currentFilters.limit);
    },
    reset() {
      this.$emit("priceFrom", 0);
      this.$emit("priceTo", 0);
      this.$emit("categoryId", 0);
      this.$emit("materialIds", null);
      this.$emit("seasonIds", null);
      this.$emit("colorIds", null);
      this.$emit("limit", 12);
      this.currentFilters = {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        materialIds: [],
        seasonIds: [],
        colorIds: [],
        limit: 12,
      };
    },
    async loadFilters(filter, url) {
      try {
        const response = await axios.get(API_BASE_URL + url);
        if (!response.data?.items) return;
        this[filter] = response.data.items;
      } catch (e) {
        this[filter] = [];
      }
    },
  },
  async created() {
    for (let filter in this.filters) {
      await this.loadFilters(filter, this.filters[filter]);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/components/product/styles/productFilters/product-filters.scss";
</style>
