// export { about } from './Help/About';
// export { options } from './File/Options';
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
// export { fileManage } from './Config/File';
// export { sourceManage } from './Config/Source';
// export { receive, enumerate, asset } from './Config/Input';
// export { taskBase, taskProcess, taskSource } from './Config/Template';
import { MenuItemConstructorOptions, remote } from 'electron';

import { task } from './Route/Task';
import { sync } from './Route/Sync';

const { app, ipcMain, Menu } = remote;

// function setApplicationMenu() {
const template: MenuItemConstructorOptions[] = [
  {
    label: '文件',
    submenu: [
      {
        label: '选项',
        submenu: [
          {
            label: 'xxx',
          },
          {
            label: 'xxx===',
          },
        ],
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        click: () => app.quit(),
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
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
// }
