<template>
  <Options />
  <About />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Options from '@/menu/File/Options/Options.vue';
import About from '@/menu/Help/About/About.vue';

export default defineComponent({
  components: {
    Options,
    About,
  },
});
</script>
