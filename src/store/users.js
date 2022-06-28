import axios from 'axios';

const users = {
  state: {
    users: []
  },
  getters: {
    GET_USERS(state) {
      return state.users;
    },
  },
  mutations: {
    LOAD_USERS(state, data) {
      state.users = data;
    },
    ADD_USER_ANSWER: (state, data) => {
      state.users.push(data);
    },
  },
  actions: {
    LOAD_USERS({ commit }, data) {
      axios.get('http://localhost:3000/users')
        .then((data) => { commit('LOAD_USERS', data.data); }
        );
      return data;
    },
    ADD_USER_ANSWER: async ({ commit }, data) => {
      axios.post('http://localhost:3000/users', data)
        .then((data) => {
          commit('ADD_USER_ANSWER', data.data);
          return data.data;
        })
    }
  }
};
export default users;