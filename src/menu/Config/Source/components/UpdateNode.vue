<template>
  <el-dialog
    v-model="visiblesync"
    :close-on-click-modal="false"
    :title="title"
    :modal="false"
    :destroy-on-close="true"
    custom-class="el-dialog__custom-class"
    width="25vw"
    append-to-body
    @closed="closed"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="字段值" prop="value">
        <el-input v-model="form.value"></el-input>
      </el-form-item>
      <el-form-item label="字段说明" prop="label">
        <el-input v-model="form.label"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="visiblesync = false">取消</el-button>
      <el-button size="small" type="primary" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UpdateNode',

  props: ['model', 'node', 'visible'],

  emits: ['update:visible', 'submit'],

  data() {
    return {
      form: {
        value: '',
        label: '',
      } as Record<string, string>,
      rules: {
        value: [{ required: true, trigger: 'none' }],
        label: [{ required: true, trigger: 'none' }],
      },
    };
  },

  computed: {
    title(): string {
      return this.model === 'append' ? '添加字段' : '修改字段';
    },

    visiblesync: {
      get(): boolean {
        return this.visible;
      },

      set(value: boolean) {
        this.$emit('update:visible', value);
      },
    },
  },

  watch: {
    mode() {
      this.refreshForm();
    },

    node() {
      this.refreshForm();
    },
  },

  methods: {
    async submit(): Promise<void> {
      try {
        await (this.$refs.ruleForm as any).validate();
      } catch (error) {
        return;
      }

      this.$emit('submit', this.form);
      this.visiblesync = false;
    },

    refreshForm(): void {
      const value = this.model;
      if (value === 'update') {
        this.form.value = this.node.value;
        this.form.label = this.node.label;
      } else {
        this.form.value = '';
        this.form.label = '';
      }
    },

    closed(): void {
      (this.$refs.ruleForm as any).resetFields();
    },
  },
});
</script>
