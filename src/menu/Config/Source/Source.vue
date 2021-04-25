<template>
  <a-modal
    v-model:visible="visible"
    title="来源管理"
    :destroy-on-close="true"
    :mask-closable="false"
    :mask="false"
    :footer="null"
  >
    <TreeView />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import visible from '.';
import TreeView from './components/TreeView.vue';

export default defineComponent({
  name: 'Source',

  components: { TreeView },

  setup() {
    return {
      visible,
    };
  },
});
</script>
