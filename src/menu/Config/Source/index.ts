import { SourceManageOption } from '@/declare';
import { reactive, ref } from 'vue';
import { v4 } from 'uuid';
import { TreeKey } from 'element-plus/lib/el-tree/src/tree.type';

export function generateNodekey(params: SourceManageOption[]) {
  params.forEach((node) => {
    node.key = `${node.key}[${v4()}]`;
    if (node.children) {
      generateNodekey(node.children);
    }
  });

  return params;
}

export function removeNodekey(params: SourceManageOption[]) {
  params.forEach((node) => {
    node.key = node.key.slice(0, -38);
    if (node.children) {
      removeNodekey(node.children);
    }
  });

  return params;
}

/**
 * 来源管理对话框的隐藏/显示
 */
export default ref(false);

/**
 * 当前操作的树节点，引用传递
 */
export const activeNodekey = ref<TreeKey>('');

/**
 * 更新节点字段的对话框
 */
export const updateVisible = ref(false);

/**
 * 更新的节点数据
 */
export const updateData = reactive({ label: '', value: '', type: '', nodeKey: '' });

/**
 * 添加节点还是更新节点
 */
export const handlerMode = ref<'append' | 'update' | 'remove'>('append');
