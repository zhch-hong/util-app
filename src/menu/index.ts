import { MenuItemConstructorOptions, remote } from 'electron';
import about from './Help/About';
import options from './File/Options';
import file from './Config/File';
// export { syncFile } from './Edit/SyncFile';
// export { undo } from './Edit/Undo';
// export { redo } from './Edit/Redo';
// export { createTask } from './Edit/CreateTask';
// export { deleteTask } from './Edit/DeleteTask';
// export { copyTask } from './Edit/CopyTask';
// export { pasteTask } from './Edit/Paste';
// export { doubleTask } from './Edit/DoubleTask';
// export { find } from './Edit/Find';
// export { findNext } from './Edit/FindNext';
// export { findPrev } from './Edit/FindPrev';
// export { sourceManage } from './Config/Source';
// export { receive, enumerate, asset } from './Config/Input';
// export { taskBase, taskProcess, taskSource } from './Config/Template';

import { task } from './Route/Task';
import { sync } from './Route/Sync';

const template: MenuItemConstructorOptions[] = [
  {
    label: '文件',
    submenu: [
      {
        label: '重新加载',
        accelerator: 'F5',
        click: () => {
          console.log('fs');
        },
      },
      {
        type: 'separator',
      },
      {
        label: '选项',
        click: () => (options.value = true),
      },
    ],
  },
  {
    label: '配置',
    submenu: [
      {
        label: '文件管理',
        click: () => (file.value = true),
      },
    ],
  },
  {
    label: '视图',
    submenu: [
      {
        label: '任务管理',
        click: task,
      },
      {
        label: 'Excel同步',
        click: sync,
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: () => (about.value = true),
      },
    ],
  },
];

export default remote.Menu.buildFromTemplate(template);
