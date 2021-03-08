import request from "../../utils/request";
// const baseUrl = "http://39.100.106.43:9000/pet";
const baseUrl = "";
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
      url: baseUrl + "/api/forward/getForwardList?forwardDate=" + forwardDate,
      method: "get"
    });

    commit("setForwardList", res.data);
  },
  async initItems({ commit }) {
    const res = await request({
      url: baseUrl + "/api/forward/initItems",
      method: "get"
    });
    commit("setInitItems", res.data);
  },
  async forwardAccount({ commit }, { consumeInfo }) {
    const forwardDate = consumeInfo.forwardDate;
    const res = await request({
      url: baseUrl + "/api/forward/forwardAccount",
      method: "post",
      data: consumeInfo
    });
    if (res.state === 1) {
      actions.getForwardList({ commit }, { forwardDate });
    }
  },
  async deleteRecord({ commit }, { id, forwardDate }) {
    await request({
      url: baseUrl + "/api/forward/deleteRecord?id=" + id,
      method: "get"
    });
    actions.getForwardList({ commit }, { forwardDate });
  },
  async addForward({ commit }, { forwardInfo, forwardDate }) {
    const res = await request({
      url: baseUrl + "/api/forward/addForward",
      method: "post",
      data: forwardInfo
    });
    if (res.state === 1) {
      actions.getForwardList({ commit }, { forwardDate });
    }
  },
  async updateForward({ commit }, { forwardInfo, forwardDate }) {
    // let d = new Date(currDate);
    // let nowStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // const forwardDate = nowStr;
    const res = await request({
      url: baseUrl + "/api/forward/updateForward",
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
