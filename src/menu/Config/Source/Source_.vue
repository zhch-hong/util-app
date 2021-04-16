<template>
  <el-dialog
    v-model="visible"
    title="来源管理"
    custom-class="el-dialog__custom-class"
    :modal="false"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <NewSource />
    <el-tree ref="elTree" node-key="nodeKey" style="user-select: none" :data="treeData">
      <template #default="{ node }">
        <NodeItem :node="node" @contextmenu="contextmenu" />
      </template>
    </el-tree>
  </el-dialog>
  <UpdateNode @update-node="updateTree" />
</template>
<script lang="ts">
import _ from 'lodash';
import { defineComponent } from 'vue';
import { v4 } from 'uuid';

import visible, { activeNodekey, generateNodekey, handlerMode, removeNodekey, updateData, updateVisible } from '.';
import pathMap from '@/app/config-files';
import { readFileText, writeFileText } from '@/utils';
import { SourceManageOption } from '@/declare';

import NodeItem from './components/NodeItem.vue';
import UpdateNode from './components/UpdateNode.vue';
import NewSource from './components/NewSource.vue';
import TreeStore from 'node_modules/element-plus/lib/el-tree/src/model/tree-store';
import { TreeData, TreeNodeData } from 'node_modules/element-plus/lib/el-tree/src/tree.type';

function readFile(): Array<SourceManageOption> {
  return readFileText(pathMap.sourceManagePath);
}

export default defineComponent({
  name: 'Source',

  components: {
    NodeItem,
    UpdateNode,
    NewSource,
  },

  setup() {
    return {
      visible,
    };
  },

  data() {
    return {
      treeData: generateNodekey(readFile()),
    };
  },

  methods: {
    writeFile() {
      const clone = _.cloneDeep(this.treeData);
      writeFileText(pathMap.sourceManagePath, removeNodekey(clone));
    },

    updateTree() {
      const activeNode = (this.$refs.elTree as TreeStore).getNode(activeNodekey.value);

      if (handlerMode.value === 'append') {
        const data: TreeNodeData = _.cloneDeep(updateData);
        data['nodeKey'] = v4();

        if (updateData.type === 'source') {
          // 添加来源
          (this.$refs.elTree as TreeStore).append(data, (this.$refs.elTree as TreeStore).root);
        } else {
          (this.$refs.elTree as TreeStore).append(data, activeNode);
        }
      }

      if (handlerMode.value === 'update') {
        let array: any[] = [];
        let index = -1;

        const findNode = (params: TreeData) => {
          return params.find((node, i) => {
            console.log(node.nodeKey, activeNodekey.value);

            if (node.nodeKey === activeNodekey.value) {
              array = params;
              index = i;

              return true;
            } else {
              if (node.children) {
                findNode(node.children);
              }
            }
          });
        };

        findNode(this.treeData);
        const clone = _.cloneDeep(array[index]);
        clone.label = updateData.label;
        clone.value = updateData.value;
        array.splice(index, 1, clone);
        console.log(this.treeData);

        setTimeout(() => {
          this.treeData = _.cloneDeep(this.treeData);
        }, 1000);
      }

      this.writeFile();

      updateVisible.value = false;
    },

    contextmenu(type: string) {
      const node = (this.$refs.elTree as TreeStore).getNode(activeNodekey.value);

      if (handlerMode.value === 'append') {
        updateData.label = '';
        updateData.value = '';
        if (type === 'source') updateData.type = 'condition';
        if (type === 'condition') updateData.type = 'value';
        updateVisible.value = true;
      } else if (handlerMode.value === 'update') {
        updateData.type = type;
        updateData.label = node.data.label;
        updateData.value = node.data.value;
        updateVisible.value = true;
      } else {
        (this.$refs.elTree as TreeStore).remove(node);
        this.writeFile();
      }
    },
  },
});
</script>
