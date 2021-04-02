import customElectronTitlebar from './custom-electron-titlebar';
import hotkeyGlobal from './hotkey-global';

window.addEventListener('DOMContentLoaded', () => {
  customElectronTitlebar();
  hotkeyGlobal();
});
