<template>
  <span>task1</span>
  <Task2 />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Task2 from './task2.vue';

export default defineComponent({
  components: {
    Task2,
  },
});
</script>
