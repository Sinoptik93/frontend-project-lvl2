import _ from 'lodash';

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
    plain: (key, value) => {
      const rawStringList = [];
      rawStringList.push(`${key}: {`);
      rawStringList.push(`    ${getObjectPlain(value)}`);
      rawStringList.push('}');
      const indentedRawList = rawStringList.map((rawString) => `${levelIndent}${rawString}`);
      const resultString = indentedRawList.join('\n');
      return resultString;
    },
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
    const { key, value, status } = data;
    const isPlainObject = _.isPlainObject(value);

    if (isPlainObject) {
      console.log(`isPlainObject=${isPlainObject}`);
      console.log(JSON.stringify(value));

      const test = stringMaker(level + 1);
      const resultObject = test.plain(key, value);
      result.push(resultObject);
      return;
    }

    switch (status) {
      case 'nested': {
        const resultString = `${'    '.repeat(level + 1)}${key}: {`;
        result.push(resultString);
        result.push(stylish(value, level + 1).join('\n'));
        result.push(`${'    '.repeat(level + 1)}}`);
        break;
      }
      default:
        result.push(getString[status](key, value));
        break;
    }
  });

  if (level === 0) {
    console.log(level === 0);
  }

  return level === 0
    ? `{\n${result.join('\n')}\n}`
    : result;
};

export default stylish;
