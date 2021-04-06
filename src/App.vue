<template>
  <router-view />
  <!-- 独立的组件 -->
  <teleport to="#app">
    <AppAsideComponents />
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import AppAsideComponents from './AppAsideComponents.vue';

export default defineComponent({
  components: {
    AppAsideComponents,
  },
});
</script>
