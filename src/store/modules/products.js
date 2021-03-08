import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  productsInfo: [],
  productsTypeOptions: [],
  weightOptions: [],
  supplierOptions: [],
  paywayOptions: [],
  objectList: []
};

const actions = {
  async getProductsInfo({ commit }) {
    const res = await request({
      url: baseUrl + "/api/products/getProductsInfo",
      method: "get"
    });
    commit("setProductsInfo", res.data);
  },
  async addPurchase({ commit }, { purchaseInfo }) {
    const res = await request({
      url: baseUrl + "/api/products/addPurchase",
      method: "post",
      data: purchaseInfo
    });
    if (res.state === 1) {
      actions.getProductsInfo({ commit });
    }
  },

  async getObjectInfo({ commit }, { key }) {
    let url = "";
    if (key == "1") {
      url = "/api/products/productList";
    } else if (key == "2") {
      url = "/api/products/purchaseList";
    } else {
      url = "/api/products/sellProductsList";
    }
    const res = await request({
      url: baseUrl + url,
      method: "get"
    });
    commit("setObject", res.data);
  }
};

const mutations = {
  setProductsInfo(state, res) {
    let productsInfo = res["productsInfo"];
    for (var i = 0; i < productsInfo.length; i++) {
      productsInfo[i]["countNum"] =
        productsInfo[i]["productNum"] + productsInfo[i]["giftNum"];
    }
    state.productsInfo = productsInfo;
    state.objectList = productsInfo;
    state.productsTypeOptions = res["productsTypeOptions"];
    state.weightOptions = res["weightOptions"];
    state.supplierOptions = res["supplierOptions"];
    state.paywayOptions = res["payWayOptions"];
  },
  setObject(state, res) {
    state.objectList = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
