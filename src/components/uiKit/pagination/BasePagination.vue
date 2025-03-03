<template>
  <ul class="pagination">
    <li class="pagination__item">
      <BaseButton
        type="secondary"
        :class="{ 'pagination__link--disabled': page == 1 }"
        :disabled="page === 1"
        aria-label="Предыдущая страница"
        class="pagination__link pagination__link--arrow"
        @click="paginate(page - 1)"
      >
        <svg
          fill="none"
          height="12"
          viewBox="0 0 7 12"
          width="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.3186 11.0343L1.3186 6.0343L6.3186 1.0343"
            stroke="#222222"
          />
        </svg>
      </BaseButton>
    </li>
    <li v-for="pageNumber in pages" :key="pageNumber" class="pagination__item">
      <a
        :class="{ 'pagination__link--current': pageNumber === page }"
        class="pagination__link"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <BaseButton
        type="secondary"
        :class="{ 'pagination__link--disabled': page == pages }"
        :disabled="page === pages"
        aria-label="Следующая страница"
        class="pagination__link pagination__link--arrow"
        @click="paginate(page + 1)"
      >
        <svg
          fill="none"
          height="12"
          viewBox="0 0 7 12"
          width="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.25 11.0343L6.25 6.0343L1.25 1.0343" stroke="#222222" />
        </svg>
      </BaseButton>
    </li>
  </ul>
</template>

<script>
import BaseButton from "@/components/uiKit/button/BaseButton";

export default {
  name: "BasePagination",
  components: {
    BaseButton,
  },
  props: ["pageNum", "count", "perPage"],
  data() {
    return {
      page: this.pageNum,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.page = page;
      this.$emit("paginate", page);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./base-pagination.scss";
</style>
