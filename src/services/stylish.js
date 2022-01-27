const getObjectPlain = (item) => {
  console.log('getObj');
  return [JSON.stringify(item)];
};

const stringMaker = (level) => {
  const indent = '    ';
  const levelIndent = indent.repeat(level);

  return {
    unchanged: (key, value) => `${levelIndent}    ${key}: ${value}`,
    updated: (key, value) => {
      const beforeString = `${levelIndent}  - ${key}: ${value.before}`;
      const afterString = `${levelIndent}  + ${key}: ${value.after}`;

      return `${beforeString}\n${afterString}`;
    },
    removed: (key, value) => `${levelIndent}  - ${key}: ${value}`,
    added: (key, value) => `${levelIndent}  + ${key}: ${value}`,
    nested: (key, value) => `${levelIndent}    ${key}: ${value}`,
  };
};

/**
 * Get styled output
 * @param dataList{[{key: string, value: any, status: 'unchanged' | 'updated' | 'removed' | 'added' | 'nested'}]}
 * @param level{number}
 * @return {string | [string]}
 */
const stylish = (dataList, level = 0) => {
  const result = [];
  const getString = stringMaker(level);

  dataList.forEach((data) => {
    const {
      key, value, children, status,
    } = data;

    if (children) {
      const topString = `${'    '.repeat(level + 1)}${key}: {`;

      result.push(topString);
      result.push(stylish(children, level + 1).join('\n'));
      result.push(`${'    '.repeat(level + 1)}}`);
    } else {
      result.push(getString[status](key, value));
    }
  });

  return level === 0
    ? `{\n${result.join('\n')}\n}`
    : result;
};

export default stylish;
