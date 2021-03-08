import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  accountList: []
};

const actions = {
  async getAccountList({ commit }) {
    const res = await request({
      url: baseUrl + "/api/account/getAccountList",
      method: "get"
    });
    commit("setAccountList", res.data);
  },
  async checkoutAccount ({ commit }, { itemInfo }) {  // eslint-disable-line
    const sellService = itemInfo;
    const res = await request({
      url: baseUrl + "/api/account/checkoutAccount",
      method: "post",
      data: sellService
    });
    return res;
  }
};

const mutations = {
  setAccountList(state, res) {
    state.accountList = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
