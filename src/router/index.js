import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/MainPage.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/CartPage.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/OrderPage.vue"),
  },
  {
    path: "/order/:id",
    name: "orderInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/OrderInfo.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ProductPage.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ErrorPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "error",
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "error") next();
  else if (to.name !== "orderInfo") next();
  else if (store.state.orderInfo && store.state.orderInfo.id === to.params.id)
    next();
  else {
    store
      .dispatch("loadOrderInfo", to.params.id)
      .then(() => next())
      .catch(() => {
        next({ name: "error" });
      });
  }
});

export default router;
