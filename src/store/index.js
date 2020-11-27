import Vue from "vue";
import Vuex from "vuex";
import nav from "./modules/nav";
import member from "./modules/member";
import columnMeta from "./modules/columnMeta";
import petType from "./modules/petType";
import products from "./modules/products";
import forward from "./modules/forward";
import foster from "./modules/foster";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { nav, member, columnMeta, petType, products, forward, foster }
});
