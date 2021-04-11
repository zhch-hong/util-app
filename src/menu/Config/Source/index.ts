import { reactive, ref } from 'vue';

/**
 * 来源管理对话框的隐藏/显示
 */
export default ref(false);

/**
 * 当前操作的树节点，引用传递
 */
export const activeNode: Record<'value', Record<string, unknown>> = {
  value: {},
};

/**
 * 更新节点字段的对话框
 */
export const updateVisible = ref(false);

/**
 * 更新的节点数据
 */
export const updateData = reactive({ label: '', value: '', type: '' });

/**
 * 添加节点还是更新节点
 */
export const handlerMode = ref<'append' | 'update'>('append');
