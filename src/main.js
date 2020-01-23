import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import '../src/scss/variables.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
