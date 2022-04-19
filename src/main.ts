import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import NaiveUI from 'naive-ui';
import './assets/scss/index.scss';

createApp(App).use(store).use(router).use(NaiveUI).mount('#app');
