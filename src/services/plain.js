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

const getPlain = (diffList, oldPath) => {
  const path = oldPath ?? [];
  const rawStringList = diffList.map((diffItem) => {
    switch (diffItem.status) {
      case 'nested':
        return `${getPlain(diffItem.children, path.concat(diffItem.key, '.'))}`;
      case 'unchanged':
        break;
      case 'added':
        return `Property '${path.join('')}${diffItem.key}' was added with value: ${printValue(diffItem.value)}`;
      case 'removed':
        return `Property '${path.join('')}${diffItem.key}' was removed`;
      case 'updated': {
        const [beforeValue, afterValue] = diffItem.value;
        return `Property '${path.join('')}${diffItem.key}' was updated. From ${printValue(beforeValue)} to ${printValue(afterValue)}`;
      }
      default:
        break;
    }
  });

  return rawStringList.filter((item) => item).join('\n');
};

export default getPlain;
