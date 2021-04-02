import { KeyboardModule } from '@/store/modules/keyboard';

export function findPrev() {
  KeyboardModule.keyboardKeypress('shift+f3');
}
