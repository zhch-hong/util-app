<template>
  <teleport to="body">
    <el-dialog
      v-model="visiblesync"
      :close-on-click-modal="false"
      :title="title"
      :modal="false"
      :destroy-on-close="true"
      custom-class="el-dialog__custom-class"
      width="25vw"
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
  </teleport>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';

export default defineComponent({
  name: 'UpdateNode',

  props: ['model', 'data', 'visible'],

  emits: ['update:visible', 'submit'],

  setup(props, { emit }) {
    const form = reactive({ label: '', value: '' });
    const setForm = () => {
      if (props.model === 'append') {
        form.label = '';
        form.value = '';
      } else {
        form.label = props.data.label;
        form.value = props.data.value;
      }
    };
    watch([() => props.model, () => props.data], setForm, { deep: true, immediate: true });

    const title = computed(() => (props.model === 'append' ? '新增字段' : '更新字段'));

    const visiblesync = computed({
      get(): boolean {
        return props.visible;
      },

      set(value: boolean) {
        emit('update:visible', value);
      },
    });

    return {
      form,
      title,
      visiblesync,
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
            this.$emit('submit', this.form);
            this.visiblesync = false;
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
