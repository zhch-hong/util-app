import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Element Plus
import installElementPlus from './plugins/element';
// vxe-table
import installVXETable from './plugins/vxe-table';
// iconfont
import '@/assets/iconfont/iconfont.css';
// global css
import './main.scss';
// DOMContentLoaded
import './dom-content-loaded';

const app = createApp(App);
installElementPlus(app);
installVXETable(app);
app
  .use(store)
  .use(router)
  .mount('#app');
