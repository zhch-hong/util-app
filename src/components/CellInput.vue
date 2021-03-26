<template>
  <div v-if="edit">
    <input
      v-model.trim="valuesync"
      v-focus
      ref="input"
      class="inline-input"
      type="text"
      @keydown.enter="submit"
      @keydown.esc.stop="edit = false"
      @blur="edit = false"
    />
  </div>
  <div v-else class="text" @click="edit = true">{{ modelValue }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  directives: {
    focus: {
      mounted(element: HTMLElement) {
        element.focus();
      },
    },
  },

  setup(props) {
    const currentValue = ref(props.modelValue);
    const valuesync = computed({
      get: () => props.modelValue,
      set: (_value) => {
        currentValue.value = _value;
      },
    });

    return {
      currentValue,
      valuesync,
    };
  },

  data() {
    return {
      edit: false,
    };
  },

  methods: {
    submit(): void {
      this.$emit('update:modelValue', this.currentValue);
      this.edit = false;
    },
  },
});
</script>

<style lang="scss" scoped>
input.inline-input {
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid #e0e0e0;
  display: block;
  width: 100%;
}

div.text {
  height: 24px;
  line-height: 24px;
}
</style>
