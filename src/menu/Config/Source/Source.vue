<template>
  <a-modal v-model:visible="visible" title="来源管理" :destroy-on-close="true" :mask-closable="false" :mask="false">
    <TreeView />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, VNode } from 'vue';
import { Modal } from 'ant-design-vue';
import visible from '.';
import TreeView from './TreeView.vue';

export default defineComponent({
  name: 'Source',

  components: { TreeView },

  setup() {
    return {
      visible,
    };
  },

  methods: {
    onclick() {
      //
    },
  },
});
</script>
