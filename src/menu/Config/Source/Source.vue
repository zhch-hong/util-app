<template>
  <el-dialog
    v-model="visible"
    title="来源管理"
    custom-class="el-dialog__custom-class"
    :modal="false"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <el-tree
      ref="elTree"
      draggable
      node-key="value"
      :data="treeData"
      :highlight-current="false"
      :default-expand-all="false"
      @node-drop="nodeDrop"
    >
      <template #default="{ node, data }">
        <NodeItem
          :tree-node="node"
          :tree-data="data"
          @append="append(node, data)"
          @update="update(node, data)"
          @remove="remove(node, data)"
        >
          <!-- 来源 -->
          <span v-if="data.type === 'source'">
            <i class="el-icon-menu" style="margin-right: 2px"></i>
            {{ node.label }}
          </span>
          <!-- 条件 -->
          <span v-else-if="data.type === 'condition'">
            <i class="el-icon-s-operation" style="margin-right: 2px"></i>
            {{ node.label }}
          </span>
          <!-- 条件值 -->
          <span v-else>
            <i class="el-icon-tickets" style="margin-right: 2px"></i>
            {{ node.label }}
          </span>
        </NodeItem>
      </template>
    </el-tree>

    <UpdateNode
      :model="model"
      :visible="updateNode"
      :node="updateTreeData"
      @update:visible="(v) => (updateNode = v)"
      @submit="submit"
    />
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import _ from 'lodash';

import visible from '.';
import pathMap from '@/app/config-files';
import { readFileText, writeFileText } from '@/utils';
import { SourceManageOption } from '@/declare';

import NodeItem from './components/NodeItem.vue';
import UpdateNode from './components/UpdateNode.vue';

function readFile(): Array<SourceManageOption> {
  return readFileText(pathMap.sourceManagePath);
}

export default defineComponent({
  name: 'Source',

  components: {
    NodeItem,
    UpdateNode,
  },

  setup() {
    return {
      visible,
    };
  },

  data() {
    return {
      treeData: readFile(),
      model: 'append' as 'update' | 'append',
      updateNode: false,
      updateTreeNode: null as Record<string, unknown> | null,
      updateTreeData: null as Record<string, unknown> | null,
    };
  },

  methods: {
    nodeDrop(
      before: Record<string, unknown>,
      after: Record<string, unknown>,
      position: 'before' | 'after' | 'inner'
    ): void {
      console.log(before, after, position);

      // if (before.level === 1 || after.level === 1) {
      //   this.treeData = readFile();
      // }
    },

    append(node: Record<string, unknown>, data: Record<string, unknown>): void {
      this.model = 'append';
      this.updateTreeNode = node;
      this.updateTreeData = data;
      this.updateNode = true;
    },

    update(node: Record<string, unknown>, data: Record<string, unknown>): void {
      console.log(node);

      this.model = 'update';
      this.updateTreeNode = node;
      this.updateTreeData = data;
      this.updateNode = true;
    },

    remove(node: Record<string, unknown>, data: Record<string, unknown>): void {
      const parent = node.parent as Record<string, unknown> | undefined;
      if (!parent) return;

      const nodeData = parent.data as Record<string, unknown>;
      const children = nodeData.children || parent.data;
      if (!Array.isArray(children)) return;

      const index = children.findIndex((d) => d.value === data.value);
      children.splice(index, 1);

      const _data = this.clear(this.treeData);

      writeFileText(pathMap.sourceManagePath, _data);
    },

    submit(node: Record<string, string>): void {
      if (this.model === 'append') {
        if (this.updateTreeData) {
          (this.updateTreeData.children as Record<string, unknown>[]).push(node);
        }
      } else {
        if (this.updateTreeNode) {
          // this.updateTreeNode.data = node; // 这样写不会生效
          Object.assign(this.updateTreeNode.data, node);
        }
      }

      const _data = this.clear(this.treeData);

      writeFileText(pathMap.sourceManagePath, _data);
    },

    clear(_data: Record<string, unknown>[]) {
      const data = _.cloneDeep(_data);
      data.forEach((item) => {
        if (item.uuid) delete item.uuid;
        if (item.children) {
          if ((item.children as Record<string, unknown>[]).length === 0) {
            delete item.children;
          } else {
            this.clear(item.children as Record<string, unknown>[]);
          }
        }
      });

      return data;
    },
  },
});
</script>
