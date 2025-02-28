<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <router-link :to="{ name: 'main' }" class="header__logo">
        <img
          alt="Логотип интернет магазина Moire"
          height="34"
          src="@/assets/img/svg/logo-moire.svg"
          width="116"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <CartIndicator />
    </div>
  </header>
</template>

<script>
import CartIndicator from "@/components/cart/CartIndicator";
export default {
  name: "HeaderRegion",
  components: { CartIndicator },
};
</script>

<style scoped></style>
