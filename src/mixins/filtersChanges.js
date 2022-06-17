export default {
  methods: {
    minPrice(value) {
      this.filter.minPrice = value;
    },
    maxPrice(value) {
      this.filter.maxPrice = value;
    },
    categoryId(value) {
      this.filter.categoryId = value;
    },
    materialIds(value) {
      this.filter.materialIds = value;
    },
    seasonIds(value) {
      this.filter.seasonIds = value;
    },
    colorIds(value) {
      this.filter.colorIds = value;
    },
    limit(value) {
      this.filter.limit = value;
    },
  },
  watch: {
    filter: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },
};
