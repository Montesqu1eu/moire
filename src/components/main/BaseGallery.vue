<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img :src="mainImg" alt="Название товара" height="570" width="570" />
    </div>
    <ul class="pics__list">
      <li v-for="(item, index) in imgList" :key="index" class="pics__item">
        <!--        :class="{-->
        <!--        'pics__link&#45;&#45;current': item.id == productInfo.colorObj.id,-->
        <!--        }"-->
        <!--        @click.prevent="productInfo.color = item"-->
        <a
          :data-id="item.id"
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
    mainImg: {
      type: String,
      default: require("@/assets/img/error.png"),
    },
    imgPicker: {
      type: Boolean,
      default: false,
    },
    imgList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeImg(event) {
      console.log(event.target.src);
    },
  },
};
</script>

<style scoped></style>
