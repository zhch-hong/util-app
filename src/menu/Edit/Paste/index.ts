import router from '@/router';
import { KeyboardModule } from '@/store/modules/keyboard';

export function pasteTask() {
  if (router.currentRoute.path !== '/edit-file') return;

  KeyboardModule.keyboardKeypress('ctrl+v');
}
