<template>
  <div class="base-gallery">
    <div class="base-gallery__wrapper">
      <img :src="mainImg" alt="Название товара" height="570" width="570" />
    </div>
    <ul class="base-gallery__list">
      <li
        v-for="(item, index) in imgList"
        :key="index"
        class="base-gallery__item"
      >
        <a
          :class="{
            'base-gallery__link--current': item.gallery[0].file.url == mainImg,
          }"
          class="base-gallery__link"
          @click.prevent="changeImg($event)"
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
</template>

<script>
export default {
  name: "BaseGallery",
  props: {
    imgPicker: {
      type: Boolean,
      default: false,
    },
    imgList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mainImg:
        this.imgList[0].gallery[0].file.url ??
        require("@/assets/img/error.png"),
      pickedItem: null,
    };
  },
  methods: {
    changeImg(event) {
      this.mainImg = event.target.src ?? require("@/assets/img/error.png");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/components/uiKit/baseGallery/styles/baseGallery/base-gallery.scss";
</style>
