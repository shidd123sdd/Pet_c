import request from "../../utils/request";
const baseUrl = "";
const state = {
  fosterList: [],
  payTypeOptions: []
};

const actions = {
  async getFosterList({ commit }) {
    const res = await request({
      url: baseUrl + "/api/foster/getFosterList",
      method: "get"
    });
    commit("setFosterList", res.data);
  },
  async getPayType({ commit }) {
    const res = await request({
      url: baseUrl + "/api/foster/getPayType",
      method: "get"
    });
    commit("setPayType", res.data);
  },
  async addFoster({ commit }, { fosterInfo }) {
    const res = await request({
      url: baseUrl + "/api/foster/addFoster",
      method: "post",
      data: fosterInfo
    });
    if (res.state === 1) {
      actions.getFosterList({ commit });
    }
  },
  async updateFoster({ commit }, { fosterInfo }) {
    const res = await request({
      url: baseUrl + "/api/foster/updateFoster",
      method: "post",
      data: fosterInfo
    });
    if (res.state === 1) {
      actions.getFosterList({ commit });
    }
  },
  async deleteFoster({ commit }, { id }) {
    const res = await request({
      url: baseUrl + "/api/foster/deleteFoster?id=" + id,
      method: "get"
    });
    if (res.state === 1) {
      actions.getFosterList({ commit });
    }
  },
  async fosterAccount({ commit }, { consumeInfo }) {
    const res = await request({
      url: baseUrl + "/api/foster/fosterAccount",
      method: "post",
      data: consumeInfo
    });
    if (res.state === 1) {
      actions.getFosterList({ commit });
    }
  }
};

const mutations = {
  setFosterList(state, res) {
    state.fosterList = res;
  },
  setPayType(state, res) {
    state.payTypeOptions = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
