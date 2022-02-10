/**
 * Get typed stringed value.
 * @param value{{}}
 * @return {string|*}
 */
const printValue = (value) => {
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
 * Get plain styled output.
 * @param diffList{[{}]}
 * @return {*}
 */
const getPlain = (diffList) => {
  const iter = (currentDiff, rootPath = []) => {
    const rawStringList = currentDiff.map((diffItem) => {
      const {
        key, value, status, children,
      } = diffItem;
      const resultPath = `${rootPath.join('')}${key}`;

      const getStringWhich = {
        unchanged: () => '',
        added: () => `Property '${resultPath}' was added with value: ${printValue(value)}`,
        removed: () => `Property '${resultPath}' was removed`,
        nested: () => `${iter(children, rootPath.concat(key, '.'))}`,
        updated: () => {
          const [beforeValue, afterValue] = value;

          return `Property '${resultPath}' was updated. From ${
            printValue(beforeValue)
          } to ${
            printValue(afterValue)
          }`;
        },
      };

      return getStringWhich[status]();
    });

    return rawStringList.filter((item) => item).join('\n');
  };

  return iter(diffList);
};

export default getPlain;
