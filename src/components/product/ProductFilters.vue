<template>
  <aside class="filter">
    <form action="#" class="filter__form form" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentFilters.priceFrom"
            class="form__input"
            name="min-price"
            type="text"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentFilters.priceTo"
            class="form__input"
            name="max-price"
            type="text"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            v-model.number="currentFilters.categoryId"
            class="form__select"
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

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li
            v-for="(material, index) in materialsData"
            :key="index"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                v-model.number="currentFilters.materialIds"
                :value="material.id"
                class="check-list__check sr-only"
                name="material"
                type="checkbox"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li
            v-for="(season, index) in seasonsData"
            :key="index"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                v-model.number="currentFilters.seasonIds"
                :value="season.id"
                class="check-list__check sr-only"
                name="season"
                type="checkbox"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        @click.prevent="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  name: "ProductFilters",
  data() {
    return {
      filters: {
        materialsData: "/api/materials/",
        colorsData: "/api/colors/",
        seasonsData: "/api/seasons/",
        categoriesData: "/api/productCategories/",
      },
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
    },
    reset() {
      this.$emit("priceFrom", 0);
      this.$emit("priceTo", 0);
      this.$emit("categoryId", 0);
      this.$emit("materialIds", null);
      this.$emit("seasonIds", null);
      this.currentFilters = {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        materialIds: [],
        seasonIds: [],
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

<style scoped></style>
