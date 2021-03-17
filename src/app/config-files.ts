import fs from 'fs';
import path from 'path';
import getConfigFolder from './config-folder';

function configFiles() {
  const configFolder = getConfigFolder();

  if (!configFolder) {
    throw new Error('没有配置数据存储目录');
  }

  const folderPath = path.resolve(configFolder, 'app_config');

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filemanage = path.resolve(folderPath, `file-manage.json`);
  try {
    const stat = fs.statSync(filemanage);
    if (!stat.isFile()) {
      throw new Error(`create file ${filemanage}`);
    }
  } catch (error) {
    fs.writeFileSync(filemanage, JSON.stringify([]));
  }

  const inputmanage = path.resolve(folderPath, `input-manage.json`);
  try {
    const stat = fs.statSync(inputmanage);
    if (!stat.isFile()) {
      throw new Error(`create file ${inputmanage}`);
    }
  } catch (error) {
    fs.writeFileSync(
      inputmanage,
      JSON.stringify([
        {
          value: 'type',
          name: '任务获得类型',
          select: [],
        },
        {
          value: 'enum',
          name: '任务枚举类型',
          select: [],
        },
        {
          value: 'asset',
          name: '财富类型',
          select: [],
        },
      ])
    );
  }

  const sourcemanage = path.resolve(folderPath, `source-manage.json`);
  try {
    const stat = fs.statSync(sourcemanage);
    if (!stat.isFile()) {
      throw new Error(`create file ${sourcemanage}`);
    }
  } catch (error) {
    fs.writeFileSync(
      sourcemanage,
      JSON.stringify([
        {
          id: 'root',
          label: 'Root',
          children: [],
        },
      ])
    );
  }

  const templatemanage = path.resolve(folderPath, `template-manage.json`);
  try {
    const stat = fs.statSync(templatemanage);
    if (!stat.isFile()) {
      throw new Error(`create file ${templatemanage}`);
    }
  } catch (error) {
    fs.writeFileSync(
      templatemanage,
      JSON.stringify({
        base: [],
        process: [],
        source: [],
      })
    );
  }
}

export default configFiles;
