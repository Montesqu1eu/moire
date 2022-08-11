export default () => ({
  cartProducts: [],
  userAccessKey: null,
  cartProductsData: [],
  orderInfo: null,
  notification: {
    title: "",
    message: "",
    type: "", // warn/error/success/info. Default info
    isShow: false,
  },
});
