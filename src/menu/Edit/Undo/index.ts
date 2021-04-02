import { KeyboardModule } from '@/store/modules/keyboard';

export function undo() {
  KeyboardModule.keyboardKeypress('ctrl+z');
}
