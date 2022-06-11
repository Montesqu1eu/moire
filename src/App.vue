<template>
  <HeaderRegion />
  <router-view />
  <FooterRegion />
</template>

<style lang="scss">
@import "~@/scss/style.scss";
</style>
<script>
import HeaderRegion from "@/components/HeaderRegion";
import FooterRegion from "@/components/FooterRegion";

export default {
  components: { FooterRegion, HeaderRegion },
};
</script>
