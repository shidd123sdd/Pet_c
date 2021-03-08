import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  columns: []
};

const actions = {
  async getColumnMeta({ commit }, { id }) {
    const res = await request({
      url: baseUrl + "/api/columnMeta/getColumnMeta?columnId=" + id,
      method: "get"
    });
    commit("setColumnMeta", res.data);
  }
};

const mutations = {
  setColumnMeta(state, res) {
    state.columns = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
