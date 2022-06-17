import { createRouter, createWebHashHistory } from "vue-router";

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
    path: "/product/:id",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ProductPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ErrorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
