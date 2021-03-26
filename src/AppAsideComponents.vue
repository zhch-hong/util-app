<template>
  <Options />
  <About />
  <FileManage />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// 文件-设置
import Options from '@/menu/File/Options/Options.vue';
// 帮助-关于
import About from '@/menu/Help/About/About.vue';
// 配置-文件管理
import FileManage from '@/menu/Config/File/File.vue';

export default defineComponent({
  components: {
    Options,
    About,
    FileManage,
  },
});
</script>
