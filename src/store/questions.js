import axios from 'axios';

const questions = {
  state: {
    questions: []
  },

  mutations: {
    LOAD_QUESTIONS(state, data) {
      state.questions = data;
      state.questions.forEach((quest, index) => {
        index == 0 ? quest.isActive = true : quest.isActive = false;
        quest.done = false;
      });
    },
    SET_QUESTION: (state, data) => {
      //    console.log(data);
      state.questions.forEach((quest) => {
        quest.id == data ? quest.isActive = true : quest.isActive = false;
      });
    },
    SET_DONE(state, data) {
      state.questions.forEach(quest => {
        if (quest.id == data) {
          quest.done = true
        }
      });
    },
  },
  actions: {
    LOAD_QUESTIONS({ commit }, data) {
      axios.get('http://localhost:3000/questions')
        .then((data) => { commit('LOAD_QUESTIONS', data.data); }
        );
      return data;
    },
    SET_QUESTION({ commit }, data) {
      commit("SET_QUESTION", data);
    },
    SET_DONE({ commit }, data) {
      commit("SET_DONE", data);
    }
  },
  getters: {
    GET_QUESTIONS(state) {
      return state.questions;
    },
  }
};
export default questions;