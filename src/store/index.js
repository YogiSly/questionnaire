import { createStore } from 'vuex';
import users from './users.js';
import user from './newUser.js';
import common from './common.js';
import questions from './questions.js';
import answers from './answer.js';



const store = createStore({
  modules: {
    users,
    user,
    common,
    questions,
    answers
  }

});
export default store;