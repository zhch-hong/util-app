<template>
  <span>task2{{ name.value }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inject: ['name'],
});
</script>
