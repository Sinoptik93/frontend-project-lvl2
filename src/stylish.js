const makeIndent = (levelCount = 0) => {
  const indentChar = ' ';
  if (levelCount === 0) {
    return '';
  }
  return indentChar.repeat(4 * levelCount - 2);
};

const stringifyData = (currentValue, level) => {
  if (typeof currentValue === 'object') {
    const entries = Object.entries(currentValue);
    // MAKE HERE
    const stringifiedObject = entries.map(([key, value]) => {
      const currentIndent = makeIndent(level - 1);
      return `${currentIndent}  ${key}: ${value}`;
    });
    return `{
        ${stringifiedObject.join('\n')}
    ${makeIndent(level - 1)}  }`;
  }
  return currentValue;
};

const stylish = (rawData, level = 0) => {
  // Rename to 'result' after debugging
  let stylishResult = rawData.map((currentLine) => {
    // Delete after debuging
    let stylishedString;

    if (currentLine.status === 'unchanged') {
      const currentIndent = makeIndent(level + 1);
      stylishedString = `${currentIndent}  ${currentLine.key}: ${stringifyData(currentLine.value, level + 1)}`;
      return stylishedString;
    }
    if (currentLine.status === 'nested') {
      const currentIndent = makeIndent(level + 1);
      stylishedString = `${currentIndent}  ${currentLine.key}: ${stylish(currentLine.value, level + 1)}`;
      return stylishedString;
    }
    if (currentLine.status === 'updated') {
      const oldValue = currentLine.value[0];
      const newValue = currentLine.value[1];
      const currentIndent = makeIndent(level + 1);
      stylishedString = [
        `${currentIndent}- ${currentLine.key}: ${stringifyData(oldValue, level + 1)}`,
        `${currentIndent}+ ${currentLine.key}: ${stringifyData(newValue, level + 1)}`,
      ].join('\n');
      return stylishedString;
    }
    if (currentLine.status === 'removed') {
      const currentIndent = makeIndent(level + 1);
      stylishedString = `${currentIndent}- ${currentLine.key}: ${stringifyData(currentLine.value, level + 1)}`;
      return stylishedString;
    }
    if (currentLine.status === 'added') {
      const currentIndent = makeIndent(level + 1);
      stylishedString = `${currentIndent}+ ${currentLine.key}: ${stringifyData(currentLine.value, level + 1)}`;
      return stylishedString;
    }
  });

  stylishResult = stylishResult.flat().join('\n');
  console.log(stylishResult);
  return `{\n${stylishResult}\n${makeIndent(level)}}`;
};

export default stylish;
