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

  emits: ['submit'],

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
            this.$emit('submit');
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
