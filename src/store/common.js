
const common = {
  state: {
    common: {
      nameTrue: false,
      active: 1
    }

  },
  getters: {
    GET_AUTH_SHOW(state) {
      return state.common.nameTrue;
    },
    GET_ACTIVE(state) {
      return state.common.active;
    }
  },
  mutations: {
    SET_AUTH_HIDE: (state) => {
      state.common.nameTrue = !state.common.nameTrue;
    },
    SET_ACTIVE: (state, data) => {
      state.common.active = data;
    },
  },
  actions: {
    SET_AUTH_HIDE({ commit }) {
      commit("SET_AUTH_HIDE")
    },
    SET_ACTIVE({ commit }, data) {
      commit("SET_ACTIVE", data);
    }
  }
};
export default common;