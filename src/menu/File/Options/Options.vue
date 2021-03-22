<template>
  <teleport to="#app">
    <el-dialog
      v-model="visible"
      title="选项"
      custom-class="el-dialog__custom-class"
      :modal="false"
      :close-on-click-modal="false"
    >
      <ConfigFolder />
      <WorkFolder />
    </el-dialog>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import visibility from '.';

import ConfigFolder from './components/ConfigFolder.vue';
import WorkFolder from './components/WorkFolder.vue';

export default defineComponent({
  components: {
    ConfigFolder,
    WorkFolder,
  },

  setup() {
    return {
      visible: visibility,
    };
  },

  watch: {
    visible(value: boolean) {
      // console.log(value);
    },
  },
});
</script>
