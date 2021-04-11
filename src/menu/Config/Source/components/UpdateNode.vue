<template>
  <teleport to="body">
    <el-dialog
      v-model="updateVisible"
      :close-on-click-modal="false"
      :title="title"
      :modal="false"
      :destroy-on-close="true"
      custom-class="el-dialog__custom-class"
      width="25vw"
      @closed="closed"
    >
      <el-form ref="ruleForm" :model="updateData" :rules="rules" size="small" label-width="80px">
        <el-form-item label="字段值" prop="value">
          <el-input v-model="updateData.value"></el-input>
        </el-form-item>
        <el-form-item label="字段说明" prop="label">
          <el-input v-model="updateData.label"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="updateVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </teleport>
</template>
<script lang="ts">
import _ from 'lodash';
import { computed, defineComponent } from 'vue';
import { updateVisible, updateData, handlerMode, activeNode } from '..';

export default defineComponent({
  name: 'UpdateNode',

  emits: ['write'],

  setup() {
    const title = computed(() => (handlerMode.value === 'append' ? '新增字段' : '更新字段'));

    return {
      updateData,
      title,
      updateVisible,
    };
  },

  data() {
    return {
      rules: {
        value: [{ required: true, trigger: 'none' }],
        label: [{ required: true, trigger: 'none' }],
      },
    };
  },

  methods: {
    submit() {
      (this.$refs.ruleForm as Record<string, () => Promise<boolean>>)
        .validate()
        .then((value) => {
          if (value) {
            console.log(handlerMode.value, updateData);

            if (handlerMode.value === 'append') {
              const nodeData = activeNode.value.data as Record<string, unknown>;
              if (nodeData.children instanceof Array) {
                nodeData.children.push(_.cloneDeep(updateData));
              } else {
                Object.assign(nodeData, { children: [_.cloneDeep(updateData)] });
              }
            }

            if (handlerMode.value === 'update') {
              const nodeData = activeNode.value.data as Record<string, unknown>;
              nodeData.label = updateData.label;
              nodeData.value = updateData.value;
            }

            this.$emit('write');

            updateVisible.value = false;
          }
        })
        .catch(() => {
          //
        });
    },

    closed(): void {
      (this.$refs.ruleForm as Record<string, () => void>).resetFields();
    },
  },
});
</script>
