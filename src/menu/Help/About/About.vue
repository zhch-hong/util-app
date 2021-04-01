<template>
  <teleport to="#app">
    <el-dialog
      v-model="visible"
      title="任务配置工具"
      custom-class="el-dialog__custom-class"
      width="30%"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-form v-once class="about" label-width="100px" size="small" labe>
        <el-form-item>
          <template #label>
            <span class="label">Version:</span>
          </template>
          <span>{{ version }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">Vue:</span>
          </template>
          <span>{{ vue }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">Electron:</span>
          </template>
          <span>{{ electron }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">Chrome:</span>
          </template>
          <span>{{ chrome }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">Node:</span>
          </template>
          <span>{{ node }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">V8:</span>
          </template>
          <span>{{ v8 }}</span>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="label">OS:</span>
          </template>
          <span>{{ os }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, version } from 'vue';
import { remote } from 'electron';
import os from 'os';
import about from '.';

export default defineComponent({
  setup() {
    return {
      visible: about,
    };
  },
  data() {
    const { app } = remote;
    const { electron, chrome, node, v8 } = process.versions;
    return {
      version: app.getVersion(),
      vue: version,
      electron,
      chrome,
      node,
      v8,
      os: os.type() + '_' + os.arch() + '_' + os.release(),
    };
  },
});
</script>
<style scoped>
span {
  font-size: 14px;
  font-weight: 600;
  color: #595959;
}
span.label {
  font-size: 16px;
  color: #595959;
}
form.about .el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
