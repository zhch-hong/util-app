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
 * mousetrap键盘触发动作
 */
export type MousetrapAction = 'keypress' | 'keydown' | 'keyup';
