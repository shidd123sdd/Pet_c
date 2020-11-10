import request from "../../utils/request";

const state = {
  navList: []
};
// const url = "http://localhost:8082";

// const url = "http://39.100.106.43:9000";
const actions = {
  async initNav({ commit }) {
    const res = await request({
      url: "/api/nav/getNavList",
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
