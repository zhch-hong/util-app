/**
 * App用户自定义配置数据（任务来源，财富类型等等）的存储目录
 *
 */

import Electron from 'electron';
import electronStore from '@/electron-store';

let folder = '';
const storeFolder = electronStore.get('configFolder');
if (typeof storeFolder === 'string') {
  folder = storeFolder;
}

const openConfigDirectory = (defaultPath?: string): string | undefined => {
  const response = Electron.dialog.showOpenDialogSync({
    title: '请选择配置存储目录',
    properties: ['openDirectory'],
    defaultPath: defaultPath,
  });

  if (typeof response !== 'undefined') {
    return response[0];
  }
};

const getConfigFolder = () => {
  if (folder !== '') {
    return folder;
  } else {
    const _folder = openConfigDirectory();
    if (_folder) {
      folder = _folder;
      electronStore.set('configFolder', folder);

      return folder;
    } else {
      // 必须要选择工作目录
      Electron.app.quit();
    }
  }
};

export { openConfigDirectory };
export default getConfigFolder;
