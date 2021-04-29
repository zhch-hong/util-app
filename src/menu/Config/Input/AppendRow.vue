<template>
  <a-button type="link" @click="visible = true">添加字段</a-button>
  <a-modal
    v-model:visible="visible"
    title="添加字段"
    :mask-closable="false"
    :mask="false"
    @ok="handleOK"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 4 }">
      <a-form-item label="字段值">
        <a-input v-model:value="value" />
      </a-form-item>
      <a-form-item label="字段说明">
        <a-input v-model:value="name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';

export default defineComponent({
  name: 'AppendRow',

  emits: ['ok'],

  setup() {
    const visible = ref(false);

    return {
      visible,
    };
  },

  data() {
    return {
      value: '',
      name: '',
    };
  },

  methods: {
    async handleOK() {
      this.$emit('ok', { value: this.value, name: this.name });
      this.visible = false;
      await nextTick();
      this.value = '';
      this.name = '';
    },

    handleCancel() {
      this.value = '';
      this.name = '';
      this.visible = false;
    },
  },
});
</script>
