import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
const state = {
  navList: []
};

const actions = {
  async initNav({ commit }) {
    const res = await request({
      url: baseUrl + "/api/nav/getNavList",
      method: "get"
    });
    commit("setNavList", res.data);
  }
};

const mutations = {
  setNavList(state, res) {
    sessionStorage.setItem("navList", JSON.stringify(res));
    state.navList = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
