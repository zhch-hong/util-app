import fs from 'fs';
import path from 'path';
import configFolder from './config-folder';

const pathMap = {
  fileManagePath: '',
  inputManagePath: '',
  sourceManagePath: '',
  templateManagePath: '',
};

Object.defineProperties(pathMap, {
  fileManagePath: {
    get(): string {
      return path.resolve(configFolder, 'app_config', 'file-manage.json');
    },
  },
  inputManagePath: {
    get(): string {
      return path.resolve(configFolder, 'app_config', 'input-manage.json');
    },
  },
  sourceManagePath: {
    get(): string {
      return path.resolve(configFolder, 'app_config', 'source-manage.json');
    },
  },
  templateManagePath: {
    get(): string {
      return path.resolve(configFolder, 'app_config', 'template-manage.json');
    },
  },
});

try {
  const stat = fs.statSync(pathMap.fileManagePath);
  if (!stat.isFile()) {
    throw new Error(`create file ${pathMap.fileManagePath}`);
  }
} catch (error) {
  fs.writeFileSync(pathMap.fileManagePath, JSON.stringify([]));
}

try {
  const stat = fs.statSync(pathMap.inputManagePath);
  if (!stat.isFile()) {
    throw new Error(`create file ${pathMap.inputManagePath}`);
  }
} catch (error) {
  fs.writeFileSync(
    pathMap.inputManagePath,
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

try {
  const stat = fs.statSync(pathMap.sourceManagePath);
  if (!stat.isFile()) {
    throw new Error(`create file ${pathMap.sourceManagePath}`);
  }
} catch (error) {
  fs.writeFileSync(
    pathMap.sourceManagePath,
    JSON.stringify([
      {
        id: 'root',
        label: 'Root',
        children: [],
      },
    ])
  );
}

try {
  const stat = fs.statSync(pathMap.templateManagePath);
  if (!stat.isFile()) {
    throw new Error(`create file ${pathMap.templateManagePath}`);
  }
} catch (error) {
  fs.writeFileSync(
    pathMap.templateManagePath,
    JSON.stringify({
      base: [],
      process: [],
      source: [],
    })
  );
}

export default pathMap;
