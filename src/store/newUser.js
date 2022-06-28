const user = {
  state: {
    user: {},
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
  },
  mutations: {
    ADD_USER: (state, data) => {
      state.user = data;
    },
  },
  actions: {
    ADD_USER({ commit }, data) {
      commit("ADD_USER", data)
    },
  }
};
export default user;