<template>
  <vxe-toolbar perfect>
    <template #buttons>
      <el-button style="margin-left: 10px" @click="handleAppend">新增</el-button>
      <el-button @click="handleDelete">删除</el-button>
    </template>
  </vxe-toolbar>
  <vxe-table ref="xTable" :data="data" border="full" header-align="center">
    <vxe-table-column type="checkbox" width="40px" align="center"></vxe-table-column>
    <vxe-table-column title="文件名" width="400px">
      <template #default="{ row }">
        <CellInput v-model="row.file" />
      </template>
    </vxe-table-column>
    <vxe-table-column title="起始ID" width="100px" align="center">
      <template #default="{ row }">
        <CellInput v-model="row.start" />
      </template>
    </vxe-table-column>
    <vxe-table-column title="截止ID" width="100px" align="center">
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { readFileText, writeFileText } from '@/utils';
import { RowInfo, Table } from 'vxe-table';
import path from 'path';
import _ from 'lodash';
import electronStore from '@/electron-store';
import CellInput from '@/components/CellInput.vue';

const _path = path.resolve(electronStore.get('configFolder') as string, 'app_config', 'file-manage.json');

export default defineComponent({
  components: {
    CellInput,
  },

  setup() {
    //
  },

  methods: {
    readFile() {
      const data = readFileText(_path);
      return data;
    },

    refreshData() {
      this.data = this.readFile();
      (this.$refs.xTable as Table).syncData();
    },

    handleSave() {
      const { fullData } = (this.$refs.xTable as Table).getTableData();
      const data = _.cloneDeep<RowInfo[]>(fullData);

      data.forEach((row) => delete row['_XID']);

      writeFileText(_path, data);
    },

    handleAppend() {
      this.data.push({ file: '', start: '', end: '', desc: '' });
    },

    handleDelete() {
      (this.$refs.xTable as Table).removeCheckboxRow();
    },
  },
});
</script>

<!--<script lang="ts">
import Vue from 'vue';



export default Vue.extend({

  data() {
    return {
      data: [] as Array<Record<string, any>>,
    };
  },

  mounted() {
    this.refreshData();
  },

});
</script>-->
