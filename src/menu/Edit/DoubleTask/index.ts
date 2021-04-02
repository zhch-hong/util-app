import router from '@/router';
import { KeyboardModule } from '@/store/modules/keyboard';

export function doubleTask() {
  if (router.currentRoute.path !== '/edit-file') return;

  KeyboardModule.keyboardKeypress('ctrl+d');
}
