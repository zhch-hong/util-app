<template>
  <el-dialog
    v-model="visible"
    title="文件管理"
    custom-class="el-dialog__custom-class"
    :modal="false"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @closed="closed"
  >
    <vxe-toolbar perfect>
      <template #buttons>
        <el-button size="small" style="margin-left: 10px" @click="handleAppend">新增</el-button>
        <el-button size="small" @click="handleDelete">删除</el-button>
      </template>
    </vxe-toolbar>
    <vxe-table ref="xTable" :data="tableData" border="full" header-align="center">
      <vxe-table-column type="checkbox" width="40px" align="center"></vxe-table-column>
      <vxe-table-column title="文件名" width="400px">
        <template #default="{ row }">
          <CellInput v-model="row.file" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="起始ID" width="100px">
        <template #default="{ row }">
          <CellInput v-model="row.start" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="截止ID" width="100px">
        <template #default="{ row }">
          <CellInput v-model="row.end" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="备注">
        <template #default="{ row }">
          <CellInput v-model="row.desc" />
        </template>
      </vxe-table-column>
    </vxe-table>
    <template #footer>
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave">应用</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { readFileText, writeFileText } from '@/utils';
import { VxeTableInstance } from 'vxe-table';
import pathMap from '@/app/config-files';
import { FileManageOption } from '@/declare';
import visible from '.';
import _ from 'lodash';
import CellInput from '@/components/CellInput.vue';

function readFile(): Array<FileManageOption> {
  return readFileText(pathMap.fileManagePath);
}

export default defineComponent({
  name: 'File',

  components: {
    CellInput,
  },

  setup() {
    return {
      visible,
    };
  },

  data() {
    return {
      tableData: readFile(),
    };
  },

  methods: {
    closed() {
      this.tableData = readFile();
    },

    handleSave() {
      // 这里不能使用this.tableData，要使用api调用获取到的数据
      const { fullData } = (this.$refs.xTable as VxeTableInstance).getTableData();
      const data = _.cloneDeep<Record<string, unknown>[]>(fullData);

      data.forEach((row) => delete row['_XID']);
      writeFileText(pathMap.fileManagePath, data);
      this.visible = false;
    },

    handleAppend() {
      (this.$refs.xTable as VxeTableInstance).insert({ file: '', start: '', end: '', desc: '' });
    },

    handleDelete() {
      (this.$refs.xTable as VxeTableInstance).removeCheckboxRow();
    },
  },
});
</script>
