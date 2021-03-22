<template>
  <div class="storage-dir">
    <p class="title">配置数据存储路径</p>
    <p>
      配置的来源、模板、货币类型等数据存储的路径，该路径在修改时会自动将原路径下的数据移动至新的路径下，请勿手动操作该文件夹下的文件。<b
        >修改该路径需要重启软件。</b
      >
    </p>
    <div class="items-center">
      <input v-model.trim.lazy="path" class="path-input" type="text" />
      <button class="set" @click="setConfigFolder">选择路径</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { remote } from 'electron';
import { exec } from 'child_process';
import fs from 'fs';
import electronStore from '@/electron-store';

export default defineComponent({
  data() {
    return {
      path: electronStore.get('configFolder') as string,
    };
  },

  watch: {
    path: {
      handler(value: string) {
        const stat = fs.statSync(value);
        if (stat.isDirectory()) {
          this.relaunch();
        } else {
          remote.dialog.showErrorBox('无效路径', '该路径无效，请重新选择');
          this.path = electronStore.get('configFolder') as string;
        }
      },
    },
  },

  methods: {
    setConfigFolder(): void {
      const win = remote.getCurrentWindow();
      win.focus();
      const response = remote.dialog.showOpenDialogSync(win, {
        title: '请选择配置存储路径',
        properties: ['openDirectory'],
        defaultPath: this.path,
      });

      if (typeof response !== 'undefined') {
        const path = response[0];
        this.path = path;
      }
    },

    relaunch(): void {
      const oldFolder = electronStore.get('configFolder') as string;
      exec(`xcopy /e ${oldFolder}\\app_config\\ ${this.path}\\app_config\\`, (error) => {
        if (error) throw error;
        exec(`rmdir /s /q ${oldFolder}\\app_config`, (error2) => {
          if (error2) throw error2;
          const win = remote.getCurrentWindow();
          win.focus();
          remote.dialog.showMessageBoxSync(win, {
            title: '重启软件',
            message: '需要重启软件以生效',
            type: 'info',
          });

          electronStore.set('configFolder', this.path);

          setTimeout(() => {
            remote.app.relaunch();
            remote.app.quit();
          }, 500);
        });
      });
    },
  },
});
</script>

<style lang="scss" scoped>
div.storage-dir {
  cursor: default;
  padding: 2px 20px 20px;
  &:hover {
    background-color: #e6e6e6;
  }
}
p.title {
  font-size: 17px;
  font-weight: 600;
}
div.items-center {
  display: flex;
  align-items: center;
}
input.path-input {
  outline: none;
  border-radius: 0;
  border: 1px solid #b3b3b3;
  width: 500px;
  background: #f2f2f2;
  margin-right: 10px;
  padding: 2px;
}
button.set {
  outline: none;
  border: 1px solid;
  border-radius: 0;
  cursor: pointer;
}
</style>
