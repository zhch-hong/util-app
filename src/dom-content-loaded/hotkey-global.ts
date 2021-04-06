import { remote } from 'electron';
import { KeyboardModule } from '@/store/modules/keyboard';

export default function() {
  // 忽略缓存重新加载页面
  KeyboardModule.registerKeyboard({
    key: 'ctrl+shift+r',
    handler: () => remote.getCurrentWebContents().reloadIgnoringCache(),
  });

  // 退出程序
  KeyboardModule.registerKeyboard({
    key: 'ctrl+shift+q',
    handler: () => remote.app.quit(),
  });
}
