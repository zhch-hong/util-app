import { MenuItemConstructorOptions, remote } from 'electron';
// export { about } from './Help/About';
import options from './File/Options';
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

import { task } from './Route/Task';
import { sync } from './Route/Sync';

export default function() {
  const { app, Menu } = remote;

  const template: MenuItemConstructorOptions[] = [
    {
      label: '文件',
      submenu: [
        {
          label: '重新加载',
          accelerator: 'F5',
          role: 'forceReload',
        },
        {
          type: 'separator',
        },
        {
          label: '选项',
          click: () => (options.value = true),
        },

        {
          type: 'separator',
        },
        {
          label: '退出',
          accelerator: 'Ctrl+Q',
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
}
