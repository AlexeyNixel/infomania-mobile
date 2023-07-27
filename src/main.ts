import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'viewerjs/dist/viewer.css';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import elementRu from 'element-plus/es/locale/lang/ru';
import 'dayjs/locale/ru.js';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

import './styles/themes/lightTheme.css';
import './styles/themes/darkTheme.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//@ts-ignore
import ru from 'moment/dist/locale/ru';
import moment from 'moment';

//@ts-ignore
import VueViewer from 'v-viewer';

const app = createApp(App);

library.add(fab, fas, far);

moment.updateLocale('ru', ru);

app.use(createPinia());
app.use(router);
app.use(VueViewer);
app.use(ElementPlus, { locale: elementRu });

app.directive('v-viewer');
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
