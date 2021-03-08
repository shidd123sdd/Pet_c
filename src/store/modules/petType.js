import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  petTypeList: []
};

const actions = {
  async getPetTypeInfo({ commit }) {
    const res = await request({
      url: baseUrl + "/api/petType/getPetTypeInfo",
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
