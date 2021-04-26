<template>
  <!-- 添加来源 -->
  <a-button type="link" @click="appendSource">添加来源</a-button>
  <!-- 节点配置 -->
  <NodeConfig v-bind="configData" @node-config="writeNode" />

  <a-tree :tree-data="treeData" :replaceFields="{ key: 'uuid' }">
    <template #title="{ title, type, dataRef }">
      <a-dropdown :trigger="['contextmenu']">
        <span>{{ title }}</span>
        <template #overlay>
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(menuKey, dataRef)">
            <template v-if="type === 'source'">
              <a-menu-item key="append">添加条件</a-menu-item>
              <a-menu-item key="update">修改来源</a-menu-item>
              <a-menu-item key="remove">移除来源</a-menu-item>
            </template>
            <template v-else-if="type === 'condition'">
              <a-menu-item key="append">添加条件值</a-menu-item>
              <a-menu-item key="update">修改条件</a-menu-item>
              <a-menu-item key="remove">移除条件</a-menu-item>
            </template>
            <template v-else-if="type === 'value'">
              <a-menu-item key="update">修改条件值</a-menu-item>
              <a-menu-item key="remove">移除条件值</a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tree>
</template>
<script lang="ts">
import { defineComponent, unref } from 'vue';
import { v4 } from 'uuid';
import _ from 'lodash';
import { SourceManageOption } from '@/declare';
import { readFileText, writeFileText } from '@/utils';
import { activeNode, configVisible, generateuuid, handlerMode, removeuuid } from '..';
import pathMap from '@/app/config-files';

import NodeConfig from './NodeConfig.vue';

function readFile(): Array<SourceManageOption> {
  return readFileText(pathMap.sourceManagePath);
}

export default defineComponent({
  name: 'TreeView',

  components: {
    NodeConfig,
  },

  data() {
    return {
      treeData: generateuuid(readFile()),
      configData: {
        code: '',
        title: '',
      },
    };
  },

  methods: {
    appendSource() {
      this.configData.code = '';
      this.configData.title = '';
      handlerMode.value = 'append';
      activeNode.value = null;
      configVisible.value = true;
    },

    onContextMenuClick(menuKey: 'append' | 'update' | 'remove', dataRef: SourceManageOption) {
      activeNode.value = dataRef;
      handlerMode.value = menuKey;
      const { key, title, uuid } = unref(dataRef);

      if (menuKey === 'remove') {
        let parent: SourceManageOption[] = [];
        let i = -1;
        const findParent = (list: SourceManageOption[]) => {
          list.findIndex((item, index) => {
            if (item.uuid === uuid) {
              parent = list;
              i = index;
              return true;
            } else if (item.children) {
              return findParent(item.children);
            } else {
              return false;
            }
          });
        };
        findParent(this.treeData as SourceManageOption[]);

        if (i !== -1) {
          parent.splice(i, 1);
        }

        this.writeFile();
      } else if (menuKey === 'append') {
        this.configData.code = '';
        this.configData.title = '';
        configVisible.value = true;
      } else if (menuKey === 'update') {
        this.configData.code = key;
        this.configData.title = title;
        configVisible.value = true;
      }
    },

    writeNode(data: Record<'key' | 'title', string>) {
      if (handlerMode.value === 'append') {
        if (activeNode.value === null) {
          // 添加来源
          const object: SourceManageOption = {
            key: data.key,
            title: data.title,
            type: 'source',
            uuid: v4(),
          };
          this.treeData.push(object);
        } else if (activeNode.value.type === 'source') {
          // 添加条件
          const object: SourceManageOption = {
            key: data.key,
            title: data.title,
            type: 'condition',
            uuid: v4(),
          };
          if (activeNode.value.children) activeNode.value.children.push(object);
          else activeNode.value.children = [object];
        } else if (activeNode.value.type === 'condition') {
          // 添加条件值
          const object: SourceManageOption = {
            key: data.key,
            title: data.title,
            type: 'value',
            uuid: v4(),
          };
          if (activeNode.value.children) activeNode.value.children.push(object);
          else activeNode.value.children = [object];
        }
      } else if (handlerMode.value === 'update') {
        if (activeNode.value) {
          activeNode.value.key = data.key;
          activeNode.value.title = data.title;
        }
      }

      this.writeFile();

      configVisible.value = false;
    },

    writeFile() {
      let copy = _.cloneDeep(this.treeData as SourceManageOption[]);
      copy = removeuuid(copy);
      writeFileText(pathMap.sourceManagePath, copy);
    },
  },
});
</script>
