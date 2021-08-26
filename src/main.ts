import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import { useElementPlus } from './plugins/element-plus';

import * as echarts from 'echarts';

import i18n from './i18n';

import axios from './utils/axios';

const app = createApp(App);

app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios = axios;

useElementPlus(app);

app.use(router).use(store).use(i18n)
  .mount('#app');
