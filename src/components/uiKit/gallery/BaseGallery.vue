<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img :src="mainImg" alt="Название товара" height="570" width="570" />
    </div>
    <ul class="pics__list">
      <li v-for="(item, index) in imgList" :key="index" class="pics__item">
        <a
          :class="{
            'pics__link--current': item.gallery[0].file.url == mainImg,
          }"
          class="pics__link"
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

<style scoped></style>
