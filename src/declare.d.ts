/**
 * mousetrap键盘触发动作
 */
export type MousetrapAction = 'keypress' | 'keydown' | 'keyup';

/**
 * 文件管理数据
 */
export type FileManageOption = {
  /**
   * 文件名称
   */
  file: string;

  /**
   * 起始ID
   */
  start: number;

  /**
   * 截止ID
   */
  end: number;

  /**
   * 描述 备注
   */
  desc: string;
};

/**
 * 来源管理节点数据
 */
export type SourceManageOption = {
  key: string;
  title: string;
  type: 'source' | 'condition' | 'value';
  uuid?: string;
  children?: SourceManageOption[];
};
