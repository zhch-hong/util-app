<template>
  <CellInput v-model="value" />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import CellInput from '@/components/CellInput.vue';

export default defineComponent({
  components: { CellInput },

  setup() {
    const refCount = ref('xxx');

    const value = computed({
      get: () => refCount.value,
      set: (value: string) => {
        refCount.value = value;
      },
    });

    return {
      value,
    };
  },
});
</script>
