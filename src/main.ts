import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

//@ts-ignore
import VueViewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

library.add(fab, fas, far);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.directive('v-viewer');
app.use(VueViewer);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
