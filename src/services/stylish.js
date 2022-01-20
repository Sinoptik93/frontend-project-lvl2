const element = {
  unchanged: (key, value) => `    ${key}: ${value}`,
  updated: (key, [beforeValue, afterValue]) => {
    const beforeString = `  - ${key}: ${beforeValue}`;
    const afterString = `  + ${key}: ${afterValue}`;

    return [beforeString, afterString];
  },
  removed: (key, value) => `  - ${key}: ${value}`,
  added: (key, value) => `  + ${key}: ${value}`,
  nested: (key, value) => `    ${key}: ${value}`,
};

/**
 * Get styled output
 * @param dataList{[{key: string, value: any, status: 'unchanged' | 'updated' | 'removed' | 'added' | 'nested'}]}
 * @param level{number}
 * @return {string | [string]}
 */
const stylish = (dataList, level = 0) => {
  const result = [];
  dataList.forEach((data) => {
    const { key, value, status } = data;

    if (status === 'updated') {
      const [beforeString, afterString] = element[status](key, value);
      result.push(`${beforeString}\n${afterString}`);
    } else {
      const string = element[status](key, value);
      result.push(`${string}`);
    }
  });
  console.log(`level=${level}\n`);
  console.log(result);

  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
