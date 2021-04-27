<template>
  <a-modal v-model:visible="visible" :title="title" :mask-closable="false" :mask="false" :footer="null">
    <draggable
      v-model="data"
      v-bind="dragOptions"
      group="people"
      item-key="uuid"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <a-row style="cursor: default" align="middle">
          <a-col :span="10">
            <cell-input v-model:model-value="element.value" @enter="writeFile" />
          </a-col>
          <a-col :span="12">
            <cell-input v-model:model-value="element.name" @enter="writeFile" />
          </a-col>
          <a-col :span="2">
            <a-button type="link" @click="deleteRow(element.uuid)">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-col>
        </a-row>
      </template>
    </draggable>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import { DeleteOutlined } from '@ant-design/icons-vue';
import visible, { active, data, writeFile } from '.';

import CellInput from '@/components/CellInput.vue';

export default defineComponent({
  name: 'Input',

  components: {
    draggable,
    CellInput,
    DeleteOutlined,
  },

  setup() {
    const drag = ref(false);

    watch(drag, (b) => {
      if (!b) writeFile();
    });

    const title = computed(() => {
      if (active.value === 'type') return '获得类型';
      if (active.value === 'enum') return '枚举类型';
      if (active.value === 'asset') return '资产类型';
      return active.value;
    });

    return {
      visible,
      data,
      drag,
      title,
      writeFile,
    };
  },

  data() {
    return {
      dragOptions: {
        animation: 300,
        dragClass: 'drag-class',
      },
    };
  },

  methods: {
    deleteRow(uuid: string) {
      const i = this.data.findIndex((e) => e.uuid === uuid);
      if (i !== -1) {
        this.data.splice(i, 1);
      }
      this.writeFile();
    },
  },
});
</script>
<style lang="scss" scoped>
.drag-class {
  background-color: transparent;
  color: transparent;
  border: none;
}
</style>
