<template>
  <a-tree :tree-data="treeData"> </a-tree>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TreeDataItem, TreeDragEvent, DropEvent } from 'ant-design-vue/es/tree/Tree';
import { SourceManageOption } from '@/declare';
import { readFileText } from '@/utils';
import pathMap from '@/app/config-files';
import { generateNodekey } from '.';

function readFile(): Array<SourceManageOption> {
  return readFileText(pathMap.sourceManagePath);
}

export default defineComponent({
  name: 'TreeView',

  data() {
    return {
      treeData: generateNodekey(readFile()),
    };
  },

  methods: {},
});
</script>
