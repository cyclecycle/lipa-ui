import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import Vue from 'vue';
import App from './App.vue';

Vue.use(KeenUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
