import Vue, { defineComponent, h, reactive } from 'vue';

// import ConfigFolder from './components/ConfigFolder.vue';
// import WorkFolder from './components/WorkFolder.vue';

const obser = reactive({ visible: false });
const VNode = h(
  'el-dialog',
  {
    props: {
      title: '选项',
      visible: obser.visible,
      modal: false,
      'close-on-click-modal': false,
      'close-on-press-escape': false,
      'custom-class': 'el-dialog__custom-class',
    },

    on: {
      'update:visible': (visible: boolean) => {
        obser.visible = visible;
      },

      close: () => {
        obser.visible = false;
      },
    },
  },
  ['ooo', 'xxx']
  // [h(ConfigFolder), h(WorkFolder)]
);

const Component = defineComponent({
  render() {
    return h('teleport', { props: { to: document.body } }, [VNode]);
  },
});

Vue;

new Component();

export function options() {
  obser.visible = true;
}
