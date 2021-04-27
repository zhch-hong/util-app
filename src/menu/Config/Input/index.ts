import pathMap from '@/app/config-files';
import { readFileText, writeFileText } from '@/utils';
import { ref, watch } from 'vue';
import { v4 } from 'uuid';
import _ from 'lodash';

const visible = ref(false);
const active = ref<'type' | 'enum' | 'asset'>('type');
const data = ref<Record<string, string>[]>([]);

function readFile(): Record<string, Record<string, string>[]> {
  const result: Record<string, Record<string, string>[]> = readFileText(pathMap.inputManagePath);
  for (const key in result) {
    const element = result[key];
    element.forEach((e) => (e['uuid'] = v4()));
  }
  return result;
}

function writeFile() {
  const object = readFile();
  object[active.value] = data.value;
  const clone = _.cloneDeep(object);
  for (const key in clone) {
    const element = clone[key];
    element.forEach((e) => delete e.uuid);
  }
  writeFileText(pathMap.inputManagePath, clone);
}

watch(
  active,
  (v) => {
    data.value = readFile()[v];
  },
  {
    immediate: true,
  }
);

/**
 * 获得类型
 */
function inputReceive() {
  active.value = 'type';
  visible.value = true;
}

/**
 * 枚举类型
 */
function inputEnumerate() {
  active.value = 'enum';
  visible.value = true;
}

/**
 * 财富类型
 */
function inputAsset() {
  active.value = 'asset';
  visible.value = true;
}

export default visible;
export { inputReceive, inputEnumerate, inputAsset };
export { active, data, writeFile };
