import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Element Plus
import installElementPlus from './plugins/element';
// 菜单栏
import './menu';
// iconfont
import '@/assets/iconfont/iconfont.css';
// global css
import './main.scss';

const app = createApp(App);
installElementPlus(app);
app
  .use(store)
  .use(router)
  .mount('#body');
