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
    let result;

    switch (diffItem.status) {
      case 'nested':
        result = `${getPlain(diffItem.children, path.concat(diffItem.key, '.'))}`;
        break;
      case 'unchanged':
        break;
      case 'added':
        result = `Property '${resultPath}' was added with value: ${printValue(diffItem.value)}`;
        break;
      case 'removed':
        result = `Property '${resultPath}' was removed`;
        break;
      case 'updated': {
        const [beforeValue, afterValue] = diffItem.value;
        result = `Property '${resultPath}' was updated. From ${
          printValue(beforeValue)
        } to ${
          printValue(afterValue)
        }`;
        break;
      }
      default:
        break;
    }

    return result;
  });

  return rawStringList.filter((item) => item).join('\n');
};

export default getPlain;
