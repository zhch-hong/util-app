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
    <el-tree ref="elTree" node-key="value" :data="treeData" :highlight-current="false" :default-expand-all="false">
      <template #default="{ node }">
        <NodeItem :node="node" />
      </template>
    </el-tree>
  </el-dialog>
  <UpdateNode @write="writeFile" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import visible from '.';
import pathMap from '@/app/config-files';
import { readFileText, writeFileText } from '@/utils';
import { SourceManageOption } from '@/declare';

import NodeItem from './components/NodeItem.vue';
import UpdateNode from './components/UpdateNode.vue';
import NewSource from './components/NewSource.vue';

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
      treeData: readFile(),
    };
  },

  methods: {
    writeFile() {
      console.log(this.treeData);

      writeFileText(pathMap.sourceManagePath, this.treeData);
    },
  },
});
</script>
