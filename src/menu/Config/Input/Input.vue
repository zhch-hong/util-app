<template>
  <a-modal v-model:visible="visible" :title="title" :mask-closable="false" :mask="false" :footer="null">
    <append-row @ok="appendRow" />
    <draggable
      v-model="data"
      v-bind="dragOptions"
      group="people"
      item-key="uuid"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <div class="row-item">
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
        </div>
      </template>
    </draggable>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import _ from 'lodash';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { v4 } from 'uuid';
import visible, { active, data, writeFile } from '.';

import CellInput from '@/components/CellInput.vue';
import AppendRow from './AppendRow.vue';

export default defineComponent({
  name: 'Input',

  components: {
    draggable,
    CellInput,
    DeleteOutlined,
    AppendRow,
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

    appendRow(params: Record<string, string>) {
      const clone = _.cloneDeep(params);
      clone.uuid = v4();
      this.data.push(clone);
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

div.row-item {
  background-color: #f1f1f1;
  margin: 8px 0;
  padding-left: 14px;
  border-radius: 2px;
}
</style>
