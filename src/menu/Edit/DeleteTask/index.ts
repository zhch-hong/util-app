import router from '@/router';
import { KeyboardModule } from '@/store/modules/keyboard';

export function deleteTask() {
  if (router.currentRoute.path !== '/edit-file') return;

  KeyboardModule.keyboardKeypress('ctrl+r');
}
