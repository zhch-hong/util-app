import { KeyboardModule } from '@/store/modules/keyboard';

export function redo() {
  KeyboardModule.keyboardKeypress('ctrl+y');
}
