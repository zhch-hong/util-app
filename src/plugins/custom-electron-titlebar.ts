import { Color, Titlebar } from 'custom-electron-titlebar';
import menu from '@/menu';

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    backgroundColor: Color.fromHex('#24292E'),
    itemBackgroundColor: Color.fromHex('#384047'),
    icon: './icon_36.png',
    menu,
  }).updateTitle('任务配置工具');
});
