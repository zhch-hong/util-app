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
    <el-tree
      ref="elTree"
      node-key="nodeKey"
      style="user-select: none"
      :data="treeData"
      :highlight-current="false"
      :default-expand-all="false"
    >
      <template #default="{ node }">
        <NodeItem :node="node" @contextmenu="contextmenu" />
      </template>
    </el-tree>
  </el-dialog>
  <UpdateNode @submit="updateTree" />
</template>
<script lang="ts">
import _ from 'lodash';
import { defineComponent } from 'vue';
import { v4 } from 'uuid';

import visible, { activeNode, generateNodekey, handlerMode, updateData, updateVisible } from '.';
import pathMap from '@/app/config-files';
import { readFileText, writeFileText } from '@/utils';
import { SourceManageOption } from '@/declare';

import NodeItem from './components/NodeItem.vue';
import UpdateNode from './components/UpdateNode.vue';
import NewSource from './components/NewSource.vue';
import TreeStore from 'node_modules/element-plus/lib/el-tree/src/model/tree-store';
import { TreeNodeData } from 'node_modules/element-plus/lib/el-tree/src/tree.type';

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
      writeFileText(pathMap.sourceManagePath, this.treeData);
    },

    updateTree() {
      if (handlerMode.value === 'append') {
        debugger;
        if (updateData.type === 'source') {
          const data: TreeNodeData = _.cloneDeep(updateData);
          data['nodeKey'] = v4();
          if (activeNode.value) {
            (this.$refs.elTree as TreeStore).append(data, activeNode.value);
          }
        }
        //  else {
        //   const nodeData = activeNode.value?.data as Record<string, unknown>;
        //   if (nodeData.children instanceof Array) {
        //     nodeData.children.push(_.cloneDeep(updateData));
        //   } else {
        //     Object.assign(nodeData, { children: [_.cloneDeep(updateData)] });
        //   }
        // }
        // this.writeFile()
      }

      if (handlerMode.value === 'update') {
        console.log(activeNode.value);

        const nodeData = _.cloneDeep(activeNode.value?.data) as Record<string, unknown>;
        console.log(nodeData);
        debugger;
        nodeData.label = updateData.label;
        nodeData.value = updateData.value;
        console.log(nodeData);

        Object.assign(activeNode.value, { data: nodeData });
        console.log(activeNode.value?.data);

        this.writeFile();
      }
    },

    contextmenu(payload: Record<string, string>) {
      const { type, key } = payload;
      const node = (this.$refs.elTree as TreeStore).getNode(key);

      if (handlerMode.value === 'append') {
        updateData.label = '';
        updateData.value = '';
        if (type === 'source') updateData.type = 'condition';
        if (type === 'condition') updateData.type = 'value';
        activeNode.value = node;

        updateVisible.value = true;
      } else if (handlerMode.value === 'update') {
        updateData.type = type;
        updateData.label = node.data.label;
        updateData.value = node.data.value;
        activeNode.value = node;

        updateVisible.value = true;
      } else {
        (this.$refs.elTree as TreeStore).remove(node);
        this.writeFile();
      }
    },
  },
});
</script>
