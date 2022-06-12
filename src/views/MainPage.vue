<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>
    <div class="content__catalog">
      <ProductFilters />
      <section class="catalog">
        <div v-if="productsLoading" class="preloader preloader-catalog">
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <ProductList v-else :products="products" />
        <BasePagination
          :count="countProducts"
          :page-num="1"
          :per-page="productsPerPage"
          @paginate="changePage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/product/ProductList";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import ProductFilters from "@/components/product/ProductFilters";
import BasePagination from "@/components/main/BasePagination";

export default {
  name: "MainPage",
  components: { BasePagination, ProductFilters, ProductList },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + "/api/products", {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              // colorId: this.filterColorId,
              // categoryId: this.filterCategoryId,
              // minPrice: this.filterPriceFrom,
              // maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, 0);
    },
    changePage(page) {
      this.page = page;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped></style>
