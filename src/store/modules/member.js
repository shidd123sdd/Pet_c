import request from "../../utils/request";

const state = {
  memberList: [],
  autoId: "",
  editRecord: null
};

const actions = {
  async getMemberList({ commit }) {
    const res = await request({
      url: "/api/member/getMemberList",
      method: "get"
    });
    commit("setMemberList", res.data);
  },
  async getAutoId({ commit }) {
    const res = await request({
      url: "/api/member/getAutoId",
      method: "get"
    });
    commit("setAutoId", res.data);
  },
  editMember({ commit }, { editRecord }) {
    commit("setEditMember", editRecord);
  },
  async addMember({ commit }, { memberInfoVo, petList }) {
    const memberInfo = { memberInfoVo, petList };
    const res = await request({
      url: "/api/member/addMember",
      method: "post",
      data: memberInfo
    });
    if (res.state === 1) {
      actions.getMemberList({ commit });
    }
  },
  async updateMember({ commit }, { memberInfoVo, petList }) {
    const memberInfo = { memberInfoVo, petList };
    const res = await request({
      url: "/api/member/updateMember",
      method: "post",
      data: memberInfo
    });
    if (res.state === 1) {
      actions.getMemberList({ commit });
    }
  }
};

const mutations = {
  setMemberList(state, res) {
    state.memberList = res;
  },
  setAutoId(state, res) {
    state.autoId = res;
  },
  setEditMember(state, res) {
    state.editRecord = res;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
