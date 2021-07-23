
//Axios config
require('dotenv').config()
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "vue-trix";
Vue.config.productionTip = false


import './assets/css/bootstrap-reboot.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/select2.min.css';
import './assets/css/main.css';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
