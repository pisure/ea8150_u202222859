import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button, Card, InputNumber, Select, Toolbar } from 'primevue';
import router from "@/router.js";
import pinia from "@/pinia.js";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

createApp(App)
    .use(i18n)
    .use(PrimeVue, {theme: { preset: Material}, ripple: true, license: primeUiLicenseKey})
    .component('pv-button',         Button)
    .component('pv-card',           Card)
    .component('pv-select',         Select)
    .component('pv-input-number',   InputNumber)
    .component('pv-toolbar',        Toolbar)
    .use(router)
    .use(pinia)
    .mount('#app')