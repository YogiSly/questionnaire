const answers = {
  state: {
    answers: []
  },
  getters: {
    GET_ANSWER(state) {
      return state.answers
    }

  },
  mutations: {
    SET_ANSWER(state, data) {
      if (state.answers.length == 0) {
        state.answers.push(data)
      } else {
        let item = state.answers.find(el => el.id == data.id);
        if (item == undefined) {
          state.answers.push(data)
        } else {
          state.answers = state.answers.map(ans => ans.id == data.id ? { id: +data.id, answer: data.answer } : ans);
        }
      }
    },
  },
  actions: {
    SET_ANSWER({ commit }, data) {
      commit("SET_ANSWER", data);
    }
  }
};
export default answers;