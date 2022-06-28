// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from "vue-router";
import ListView from '../views/ListView.vue';
import InterView from '../views/InterView.vue';

const routes = [
  { path: '/', component: ListView, meta: { name: 'List of respondents' } },
  { path: '/interview/', component: InterView, meta: { name: 'Interview' } },
];

const router = createRouter({

  history: createWebHistory(),
  routes, // short for `routes: routes`
});
export default router;
