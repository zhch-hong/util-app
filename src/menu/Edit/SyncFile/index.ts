import Vue from 'vue';
import router from '@/router';
import { Button, Dialog } from 'element-ui';
import { SyncFileModule } from '@/store/modules/sync-file';

import SyncFileList from './SyncFileList.vue';

const obser = Vue.observable({ visible: false, loading: false, syncText: '开始同步', disabled: false });
const ComponentClass = Vue.extend({
  render(h) {
    return h(
      Dialog,
      {
        props: {
          title: '同步文件',
          visible: obser.visible,
          modal: false,
          'close-on-click-modal': false,
          'close-on-press-escape': false,
          'custom-class': 'el-dialog__custom-class',
        },

        on: {
          'update:visible': (visible: boolean) => {
            obser.visible = visible;
          },

          close: () => {
            obser.visible = false;
          },
        },
      },
      [
        h(SyncFileList, {
          ref: 'SyncFileList',
        }),
        h('template', { slot: 'footer' }, [
          h(Button, {
            props: { size: 'small' },
            domProps: { innerText: '取消' },
            on: {
              click: () => {
                obser.visible = false;
              },
            },
          }),
          h(Button, {
            props: {
              icon: 'el-icon-refresh',
              size: 'small',
              loading: obser.loading,
              type: 'primary',
              disabled: obser.disabled,
            },
            domProps: { innerText: obser.syncText },

            on: {
              click: () => {
                obser.syncText = '正在同步...';
                obser.disabled = true;
                Vue.nextTick(() => {
                  const pathList: string[] = (instance.$refs.SyncFileList as any).submit();
                  if (pathList.length === 0) {
                    obser.syncText = '开始同步';
                    obser.disabled = false;
                    return;
                  }
                  SyncFileModule.setPathList(pathList);
                });
              },
            },
          }),
        ]),
      ]
    );
  },
});

const instance = new ComponentClass();
const div = document.createElement('div');
document.body.append(div);
instance.$mount(div);

export function syncFile() {
  if (router.currentRoute.path !== '/sync-file') return;

  obser.visible = true;
}

export function closeSync() {
  obser.visible = false;
  obser.syncText = '开始同步';
  obser.disabled = false;
}
