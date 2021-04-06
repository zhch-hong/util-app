import store from '..';
import mousetrap from 'mousetrap';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { MousetrapAction } from '@/declare';

@Module({ name: 'keyboard', store, dynamic: true })
class Keyboard extends VuexModule {
  @Mutation
  private REGISTER_KEYBOARD(payload: { key: string; handler: () => void; action?: MousetrapAction }): void {
    const { key, handler, action } = payload;
    mousetrap.bind(key, handler, action);
  }

  @Mutation
  private UNREGISTER_KEYBOARD(payload: { key: string; action?: MousetrapAction }): void {
    const { key, action } = payload;
    mousetrap.unbind(key, action);
  }

  @Action({ rawError: true })
  public registerKeyboard(payload: { key: string; handler: () => void; action?: MousetrapAction }): void {
    this.REGISTER_KEYBOARD(payload);
  }

  @Action
  public unregisterKeyboard(payload: { key: string; action?: MousetrapAction }): void {
    this.UNREGISTER_KEYBOARD(payload);
  }
}

export const KeyboardModule = getModule(Keyboard);
