
//Axios config
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "vue-trix";
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
