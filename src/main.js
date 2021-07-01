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



createApp(App).use(router).mount('#app')
