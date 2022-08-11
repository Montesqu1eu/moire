<template>
  <div class="body-wrapper">
    <HeaderRegion />
    <router-view />
    <FooterRegion />
    <BaseNotification :time="4000" />
  </div>
</template>

<style lang="scss">
@import "~@/scss/style.scss";
</style>
<script>
import HeaderRegion from "@/components/HeaderRegion";
import FooterRegion from "@/components/FooterRegion";
import BaseNotification from "@/components/main/BaseNotification";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { FooterRegion, HeaderRegion, BaseNotification },
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
