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
  name: 'CellInput',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue', 'enter'],

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
      this.$emit('enter');
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
  border-bottom: 1px solid #bfbfbf;
  display: block;
  width: 100%;
}

div.text {
  height: 24px;
  line-height: 24px;
  color: black;
  font-size: 14px;
}
</style>
