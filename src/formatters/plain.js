/**
 * Get typed stringed value.
 * @param value{{}}
 * @return {string|*}
 */
const stringify = (value) => {
  const valueType = value === null ? 'null' : typeof value;

  switch (valueType) {
    case 'null':
      return 'null';
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

/**
 * Get stringify path.
 * @param rootPath{string}
 * @param key{string}
 * @return {`${string}${string}`}
 */
const getPath = (rootPath, key) => `${rootPath}${key}`;

/**
 * Get styled string.
 * @type {
 *   {
 *     unchanged: (function(): string),
 *     removed: (function(resultPath: string): string),
 *     added: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}): string),
 *     nested: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}, iter: function): string),
 *     updated: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}): string)
 *   }
 * }
 */
const mapping = {
  unchanged: () => '',
  added: (resultPath, item) => (
    `Property '${resultPath}' was added with value: ${stringify(item.value)}`
  ),
  removed: (resultPath) => `Property '${resultPath}' was removed`,
  nested: (resultPath, item, iter) => `${iter(item.children, resultPath.concat('.'))}`,
  updated: (resultPath, item) => {
    const [beforeValue, afterValue] = item.value;

    return `Property '${resultPath}' was updated. From ${
      stringify(beforeValue)
    } to ${
      stringify(afterValue)
    }`;
  },
};

/**
 * Get plain styled output.
 * @param data{[{}]}
 * @return {string}
 */
const getPlain = (data) => {
  const iter = (currentDiff, rootPath = '') => {
    const rawStringList = currentDiff.map((dataItem) => {
      const resultPath = getPath(rootPath, dataItem.key);
      return mapping[dataItem.status](resultPath, dataItem, iter);
    });

    return rawStringList.filter((item) => item).join('\n');
  };

  return iter(data);
};

export default getPlain;
