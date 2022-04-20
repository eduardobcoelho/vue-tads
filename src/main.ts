import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import NaiveUI from 'naive-ui';
import './assets/scss/index.scss';
import globalComponents from './globalComponents';

const app = createApp(App).use(store).use(router).use(NaiveUI);

// set global components
globalComponents.map((component) => {
  app.component(component.name, component.SFC);
});
app.mount('#app');
