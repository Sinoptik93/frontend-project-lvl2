import _ from 'lodash';

/**
 * Get string indent by depth level. Include debug mode.
 * @param indentLevel{number} - depth level
 * @param debug{boolean} - change indent chars
 * @return {string}
 */
const getIndent = (indentLevel, debug = false) => {
  const indentSize = 4;
  const char = debug ? '+' : ' ';
  const indent = char.repeat(indentSize);

  return indent.repeat(indentLevel);
};

/**
 * Get typed stringifies object.
 * @param item{string|number|{}} - target item
 * @param level{number} - depth level
 * @return {string}
 */
const getStringified = (item, level) => {
  const entries = Object.entries(item);
  const result = [];

  entries.forEach(([key, value]) => {
    const isNestedValue = _.isPlainObject(value);

    const topString = `${getIndent(level + 1)}${key}: ${isNestedValue ? '{' : value}`;
    result.push(topString);

    if (isNestedValue) {
      const body = getStringified(value, level + 1);
      result.push(body);
    }
  });

  result.push(`${getIndent(level)}}`);
  return result.join('\n');
};

/**
 * Get string getter by item status.
 * @param level{number}
 * @return {{removed: (function(string, *): string), added: (function(string, *): string), unchanged: (function(string, *): string), nested: (function(string, *): string), updated: ((function(string, [*,*]): (string|string)))}}
 */
const stringMaker = (level) => {
  const currentIndent = getIndent(level);

  return {
    unchanged: (key, value) => `${currentIndent}    ${key}: ${value}`,
    removed: (key, value) => `${currentIndent}  - ${key}: ${value}`,
    added: (key, value) => `${currentIndent}  + ${key}: ${value}`,
    updated: (key, [valueBefore, valueAfter]) => {
      if (_.isPlainObject(valueBefore)) {
        const result = [];
        const beforeTopString = `${currentIndent}  - ${key}: {`;
        const beforeBody = getStringified(valueBefore, level + 1);

        const afterString = `${currentIndent}  + ${key}: ${valueAfter}`;

        result.push(
          beforeTopString,
          beforeBody,
          afterString,
        );
        return result.join('\n');
      }

      if (_.isPlainObject(valueAfter)) {
        const result = [];
        const beforeString = `${currentIndent}  - ${key}: ${valueBefore}`;

        const afterTopString = `${currentIndent}  + ${key}: {`;
        const afterBody = getStringified(valueAfter, level + 1);

        result.push(
          beforeString,
          afterTopString,
          afterBody,
        );
        return result.join('\n');
      }
      const beforeString = `${currentIndent}  - ${key}: ${valueBefore}`;
      const afterString = `${currentIndent}  + ${key}: ${valueAfter}`;
      return `${beforeString}\n${afterString}`;
    },
  };
};

/**
 * Get styled output.
 * @param dataList{[{key: string, value: any, status: 'unchanged' | 'updated' | 'removed' | 'added' | 'nested'}]}
 * @param level{number}
 * @return {string | [string]}
 */
const getStylish = (dataList, level = 0) => {
  const result = [];
  const getString = stringMaker(level);

  dataList.forEach((data) => {
    const {
      key, value, children, status,
    } = data;

    const char = {
      unchanged: '',
      removed: '-',
      added: '+',
      nested: ' ',
      updated: ['-', '+'],
    };

    if (_.isPlainObject(value)) {
      const topString = `${getIndent(level)}  ${char[status]} ${key}: {`;
      result.push(topString, getStringified(value, level + 1));
    } else if (children) {
      const topString = `${getIndent(level + 1)}${key}: {`;
      const bottomString = `${getIndent(level + 1)}}`;
      const body = getStylish(children, level + 1).join('\n');

      result.push(topString, body, bottomString);
    } else {
      result.push(getString[status](key, value));
    }
  });

  return level === 0
    ? `{\n${result.join('\n')}\n}`
    : result;
};

export default getStylish;
