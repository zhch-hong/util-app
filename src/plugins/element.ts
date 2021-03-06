import 'element-plus/lib/theme-chalk/index.css';
import { App } from 'vue';
import { ElButton, ElDialog, ElForm, ElFormItem, ElTree, ElInput } from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';

export default (app: App<Element>) => {
  locale.use(lang);
  app.use(ElButton);
  app.use(ElDialog);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElTree);
  app.use(ElInput);
};
