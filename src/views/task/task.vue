<template>
  <p>
    在 Vue 2.x 中，应用根容器的 outerHTML 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。Vue 3.x
    现在使用应用容器的 innerHTML，这意味着容器本身不再被视为模板的一部分。
  </p>
  <p>
    The value can also be set to an empty string ('') or a relative path (./) so that all assets are linked using
    relative paths. This allows the built bundle to be deployed under any public path, or used in a file system based
    environment like a Cordova hybrid app.
  </p>
  <button @click="send">应用程序</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    send() {
      //
    },
  },
});
</script>
