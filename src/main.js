import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vue from 'vue';
import App from './App.vue';
import router from './router'

Vue.use(KeenUI);
Vue.use(Buefy)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
