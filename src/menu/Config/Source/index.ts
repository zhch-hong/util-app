import { SourceManageOption } from '@/declare';
import { reactive, ref } from 'vue';
import { v4 } from 'uuid';
import { TreeKey } from 'element-plus/lib/el-tree/src/tree.type';

export function generateuuid(params: SourceManageOption[]): SourceManageOption[] {
  params.forEach((node) => {
    node.uuid = v4();
    if (node.children) {
      generateuuid(node.children);
    }
  });

  return params;
}

export function removeuuid(params: SourceManageOption[]): SourceManageOption[] {
  params.forEach((node) => {
    delete node.uuid;
    if (node.children) {
      removeuuid(node.children);
    }
  });

  return params;
}

/**
 * 来源管理对话框的隐藏/显示
 */
export default ref(false);

/**
 * 更新节点字段的对话框
 */
export const configVisible = ref(false);

/**
 * 更新的节点数据
 */
export const activeNode = ref<SourceManageOption | null>(null);

/**
 * 添加节点还是更新节点
 */
export const handlerMode = ref<'append' | 'update' | 'remove' | null>(null);
