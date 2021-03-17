/**
 * App工作目录
 *
 */

import Electron from 'electron';
import electronStore from '@/electron-store';

let folder = '';
const storeFolder = electronStore.get('workFolder');
if (typeof storeFolder === 'string') {
  folder = storeFolder;
}

const openWorkDirectory = (defaultPath?: string): string | undefined => {
  const response = Electron.dialog.showOpenDialogSync({
    title: '请选择工作目录',
    buttonLabel: '设为工作目录',
    defaultPath: defaultPath,
    properties: ['openDirectory'],
  });

  if (typeof response !== 'undefined') {
    return response[0];
  }
};

const getWorkFolder = () => {
  if (folder !== '') {
    return folder;
  } else {
    const _folder = openWorkDirectory();
    if (_folder) {
      folder = _folder;
      electronStore.set('workFolder', folder);

      return folder;
    } else {
      // 必须要选择工作目录
      Electron.app.quit();
    }
  }
};

export { openWorkDirectory };
export default getWorkFolder;
