<template>
  <div @contextmenu.prevent.stop="contextmenu">{{ label }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { updateData, updateVisible, handlerMode, activeNode } from '..';
import electron from 'electron';

export default defineComponent({
  name: 'NodeItem',

  props: {
    node: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { label, value, type } = props.node.data as Record<string, string>;

    return {
      label,
      value,
      type,
    };
  },

  methods: {
    contextmenu() {
      const { Menu } = electron.remote;
      const menu = new Menu();

      if (this.type === 'source') {
        const u = this.generateMenuItem('编辑来源', 'update', 'source');
        const d = this.generateMenuItem('删除来源', 'remove', 'source');
        const c = this.generateMenuItem('添加条件', 'append', 'source');
        menu.append(u);
        menu.append(d);
        menu.append(c);
      } else if (this.type === 'condition') {
        const u = this.generateMenuItem('编辑条件', 'update', 'condition');
        const d = this.generateMenuItem('删除条件', 'remove', 'condition');
        const c = this.generateMenuItem('添加条件值', 'append', 'condition');
        menu.append(u);
        menu.append(d);
        menu.append(c);
      } else if (this.type === 'value') {
        const u = this.generateMenuItem('编辑条件值', 'update', 'value');
        const d = this.generateMenuItem('删除条件值', 'remove', 'value');
        menu.append(u);
        menu.append(d);
      }

      menu.popup();
    },

    generateMenuItem(label: string, handle: 'update' | 'append' | 'remove', type: 'source' | 'condition' | 'value') {
      const { MenuItem } = electron.remote;
      return new MenuItem({
        label,
        click: () => {
          activeNode.value = this.node;
          if (handle !== 'remove') {
            handlerMode.value = handle;
            updateVisible.value = true;
            if (handle === 'update') {
              updateData.type = type;
              updateData.label = this.label;
              updateData.value = this.value;
            } else {
              updateData.label = '';
              updateData.value = '';
              if (type === 'source') updateData.type = 'condition';
              if (type === 'condition') updateData.type = 'value';
            }
          }
        },
      });
    },
  },
});
</script>
