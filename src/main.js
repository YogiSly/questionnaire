import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './assets/scss/style.scss';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { VueMaskDirective } from 'v-mask';





const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind
};
const app = createApp(App)
  .directive('mask', vMaskV3);
app.use(router);
app.mount("#app");
app.use(store);
app.use(VueAxios, axios);

