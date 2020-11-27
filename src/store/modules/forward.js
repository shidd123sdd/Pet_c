import request from "../../utils/request";

const state = {
  afternoon: [],
  morning: [],
  petInfoSelects: [],
  timeInfoSelects: [],
  serviceSelects: []
};

const actions = {
  async getForwardList({ commit }, { forwardDate }) {
    const res = await request({
      url: "/api/forward/getForwardList?forwardDate=" + forwardDate,
      method: "get"
    });
    commit("setForwardList", res.data);
  },
  async initItems({ commit }) {
    const res = await request({
      url: "/api/forward/initItems",
      method: "get"
    });
    commit("setInitItems", res.data);
  },
  async addForward({ commit }, { forwardInfo, currDate }) {
    let d = new Date(currDate);
    let nowStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const forwardDate = nowStr;
    const res = await request({
      url: "/api/forward/addForward",
      method: "post",
      data: forwardInfo
    });
    if (res.state === 1) {
      actions.getForwardList({ commit }, { forwardDate });
    }
  },
  async updateForward({ commit }, { forwardInfo, currDate }) {
    let d = new Date(currDate);
    let nowStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const forwardDate = nowStr;
    const res = await request({
      url: "/api/forward/updateForward",
      method: "post",
      data: forwardInfo
    });
    if (res.state === 1) {
      actions.getForwardList({ commit }, { forwardDate });
    }
  }
};

const mutations = {
  setForwardList(state, res) {
    state.afternoon = res["afternoon"];
    state.morning = res["morning"];
  },
  setInitItems(state, res) {
    state.petInfoSelects = res["petInfoSelects"];
    state.timeInfoSelects = res["timeInfoSelects"];
    state.serviceSelects = res["serviceSelects"];
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
