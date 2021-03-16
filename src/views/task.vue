<template>
  <h2>{{ xxx }}</h2>
  <el-button size="mini">element plus</el-button>
  <el-button size="mini" type="primary" @click="onclick">升级</el-button>
  <Task1 />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Task1 from './task1.vue';

export default defineComponent({
  components: {
    Task1,
  },

  data() {
    return {
      xxx: '---',
    };
  },

  provide() {
    return {
      name: ref(this.xxx),
    };
  },

  methods: {
    onclick() {
      this.xxx += 'zzz';
    },
  },
});
</script>
