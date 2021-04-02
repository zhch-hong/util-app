import { remote } from 'electron';
import { KeyboardModule } from '@/store/modules/keyboard';

export default function() {
  // 忽略缓存重新加载页面
  KeyboardModule.registerKeyboard({
    key: 'Ctrl+R',
    handler: () => {
      remote.getCurrentWebContents().reloadIgnoringCache();
    },
    action: 'keydown',
  });

  // 退出程序
  KeyboardModule.registerKeyboard({
    key: 'command+shift+q',
    handler: () => {
      console.log('quit');

      remote.app.quit();
    },
    action: 'keydown',
  });
}
