import { App } from 'vue';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

VXETable.setup({
  size: 'mini',
});

export default (app: App) => {
  app.use(VXETable);
};
