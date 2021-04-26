<template>
  <a-modal
    v-model:visible="visible"
    :title="modalTitle"
    :destroy-on-close="true"
    :mask-closable="false"
    :mask="false"
    cancelText="取消"
    okText="保存"
    @cancel="visible = false"
    @ok="submit"
  >
    <a-form :label-col="{ span: 4 }">
      <a-form-item label="字段值">
        <a-input v-model:value="localKey" />
      </a-form-item>
      <a-form-item label="字段说明">
        <a-input v-model:value="localTitle" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { configVisible, handlerMode } from '..';

export default defineComponent({
  name: 'NodeConfig',

  props: {
    code: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },
  },

  emits: ['node-config'],

  setup(props) {
    const modalTitle = computed(() => (handlerMode.value === 'append' ? '新增字段' : '更新字段'));
    const { code, title } = toRefs(props);
    const localKey = ref('');
    const localTitle = ref('');

    watch(
      [code, title],
      ([code, title]) => {
        localKey.value = code;
        localTitle.value = title;
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      modalTitle,
      visible: configVisible,
      localKey,
      localTitle,
    };
  },

  methods: {
    submit() {
      this.$emit('node-config', { key: this.localKey, title: this.localTitle });
    },
  },
});
</script>
