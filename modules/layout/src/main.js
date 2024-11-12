import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import axios from 'axios';

import App from "./App.vue";
import router from "./router";
import loading from "./plugins/loading";

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/base.css';
import '@/assets/custom.css';

//axios.defaults.baseURL = 'http://10.1.122.100:8183';
axios.defaults.baseURL = 'http://10.1.122.100:9090';

axios.defaults.headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin" : "*"
};

axios.interceptors.request.use(config => {
  const access_token = localStorage.getItem('access_token'); // Assuming the token is stored in localStorage
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
    router, // Add router to the Single-SPA lifecycle
  },
  handleInstance(app) {
    app.use(router);
    app.use(loading);
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    });
    app.use(ToastService);
    app.use(ConfirmationService);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
