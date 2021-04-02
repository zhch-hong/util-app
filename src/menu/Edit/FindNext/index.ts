import { KeyboardModule } from '@/store/modules/keyboard';

export function findNext() {
  KeyboardModule.keyboardKeypress('f3');
}
