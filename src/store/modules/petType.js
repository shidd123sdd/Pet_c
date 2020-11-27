import request from "../../utils/request";

const state = {
  petTypeList: []
};
// const url = "http://localhost:8082";

// const url = "http://39.100.106.43:9000";
const actions = {
  async getPetTypeInfo({ commit }) {
    const res = await request({
      url: "/api/petType/getPetTypeInfo",
      method: "get"
    });
    commit("setPetTypeList", res.data);
  }
};

const mutations = {
  setPetTypeList(state, res) {
    state.petTypeList = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
