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
 * @param diffList{{}[]}
 * @param oldPath{null|string[]}
 * @return {*}
 */
const getPlain = (diffList, oldPath = null) => {
  const path = oldPath ?? [];
  const rawStringList = diffList.map((diffItem) => {
    const resultPath = `${path.join('')}${diffItem.key}`;

    switch (diffItem.status) {
      case 'nested':
        return `${getPlain(diffItem.children, path.concat(diffItem.key, '.'))}`;
      case 'unchanged':
        break;
      case 'added':
        return `Property '${resultPath}' was added with value: ${printValue(diffItem.value)}`;
      case 'removed':
        return `Property '${resultPath}' was removed`;
      case 'updated': {
        const [beforeValue, afterValue] = diffItem.value;
        return `Property '${resultPath}' was updated. From ${
          printValue(beforeValue)
        } to ${
          printValue(afterValue)
        }`;
      }
      default:
        break;
    }

    return null;
  });

  return rawStringList.filter((item) => item).join('\n');
};

export default getPlain;
