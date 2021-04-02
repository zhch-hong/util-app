import { KeyboardModule } from '@/store/modules/keyboard';

export function find() {
  KeyboardModule.keyboardKeypress('ctrl+f');
}
