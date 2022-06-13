<template>
  <div class="body-wrapper">
    <HeaderRegion />
    <router-view />
    <FooterRegion />
  </div>
</template>

<style lang="scss">
@import "~@/scss/style.scss";
</style>
<script>
import HeaderRegion from "@/components/HeaderRegion";
import FooterRegion from "@/components/FooterRegion";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { FooterRegion, HeaderRegion },
  methods: {
    ...mapActions(["loadCart"]),
    ...mapMutations(["updateUserAccessKey"]),
  },
  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
};
</script>
