import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/account",
        name: "account",
        component: () =>
          import(/* webpackChunkName: "account" */ "../views/Account.vue")
      },
      {
        path: "/forward",
        name: "forward",
        component: () =>
          import(/* webpackChunkName: "forward" */ "../views/Forward.vue")
      },
      {
        path: "/foster",
        name: "foster",
        component: () =>
          import(/* webpackChunkName: "foster" */ "../views/Foster.vue")
      },
      {
        path: "/member",
        name: "member",
        component: () =>
          import(/* webpackChunkName: "member" */ "../views/Member.vue")
      },
      {
        path: "/product",
        name: "product",
        component: () =>
          import(/* webpackChunkName: "product" */ "../views/Product.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;
