import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import NaiveUI from 'naive-ui';
import './assets/scss/index.scss';

const app = createApp(App).use(store).use(router).use(NaiveUI);

// set global components
import { IGlobalComponent, globalComponents } from './globalComponents';
globalComponents.map((component: IGlobalComponent) => {
  app.component(component.name, component.SFC);
});
app.mount('#app');
