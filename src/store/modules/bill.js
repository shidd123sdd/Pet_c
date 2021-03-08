import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  billList: []
};

const actions = {
  async getBillList({ commit }) {
    const res = await request({
      url: baseUrl + "/api/bill/getBillList",
      method: "get"
    });
    commit("setBillList", res.data);
  }
};

const mutations = {
  setColumnMeta(state, res) {
    state.billList = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
