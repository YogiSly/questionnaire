import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './assets/scss/style.scss';
import axios from 'axios';
import VueAxios from 'vue-axios';


const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(store);
app.use(VueAxios, axios);
