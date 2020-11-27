import request from "../../utils/request";

const state = {
  columns: []
};

const actions = {
  async getColumnMeta({ commit }, { id }) {
    const res = await request({
      url: "/api/columnMeta/getColumnMeta?columnId=" + id,
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
