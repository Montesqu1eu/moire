export default {
  methods: {
    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
