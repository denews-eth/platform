
//Axios config
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

//css
import './assets/css/bootstrap-reboot.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/select2.min.css';
import './assets/css/main.css';

//Scripts

// import "./assets/js/jquery-3.5.1.min.js"
// import "./assets/js/bootstrap.bundle.min.js"
// import "./assets/js/owl.carousel.min.js"
// import "./assets/js/jquery.magnific-popup.min.js"
// import "./assets/js/select2.min.js"
// import "./assets/js/smooth-scrollbar.js"
// import "./assets/js/jquery.countdown.min.js"
// import "./assets/js/main.js"


createApp(App).use(router).mount('#app')
