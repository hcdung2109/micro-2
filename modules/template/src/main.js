import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";
import router from "./router";
import loading from "./plugins/loading";

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/base.css';
import '@/assets/custom.css';

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
