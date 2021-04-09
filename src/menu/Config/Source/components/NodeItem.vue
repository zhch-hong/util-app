<template>
  <div @contextmenu.prevent.stop="contextmenu">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import electron from 'electron';

export default defineComponent({
  name: 'NodeItem',

  props: ['data'],

  methods: {
    contextmenu() {
      const { Menu } = electron.remote;
      const menu = new Menu();

      if (this.data.type === 'source') {
        const u = this.generateMenuItem('编辑来源', 'update');
        const d = this.generateMenuItem('删除来源', 'remove');
        const c = this.generateMenuItem('添加条件', 'append');
        menu.append(u);
        menu.append(d);
        menu.append(c);
      } else if (this.data.type === 'condition') {
        const u = this.generateMenuItem('编辑条件', 'update');
        const d = this.generateMenuItem('删除条件', 'remove');
        const c = this.generateMenuItem('添加条件值', 'append');
        menu.append(u);
        menu.append(d);
        menu.append(c);
      } else if (this.data.type === 'value') {
        const u = this.generateMenuItem('编辑条件值', 'update');
        const d = this.generateMenuItem('删除条件值', 'remove');
        menu.append(u);
        menu.append(d);
      }

      menu.popup();
    },

    generateMenuItem(label: string, type: string) {
      const { MenuItem } = electron.remote;
      return new MenuItem({
        label,
        click: () => {
          this.$emit(type);
        },
      });
    },
  },
});
</script>
