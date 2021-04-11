<template>
  <el-button type="text" @click="appendSource">添加来源</el-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { updateVisible, updateData, handlerMode } from '..';

export default defineComponent({
  name: 'NewSource',

  setup() {
    return {
      updateData,
    };
  },

  methods: {
    appendSource() {
      updateVisible.value = true;
      handlerMode.value = 'append';
      this.updateData.label = '';
      this.updateData.value = '';
      this.updateData.type = 'source';
    },
  },
});
</script>
