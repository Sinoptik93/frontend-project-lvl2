import _ from 'lodash';

/**
 * Get indent by depth value.
 * @param indentDepth{number}
 * @return {string}
 */
const formatIndent = (indentDepth) => {
  const indentChar = ' ';
  return indentChar.repeat(indentDepth);
};

/**
 * Stringify object by current indent.
 * @param object{{}}
 * @param nodeDepth{number}
 * @return {string}
 */
const stringifyObject = (object, nodeDepth) => {
  const innerIndent = formatIndent(nodeDepth * 4 + 8);
  const closeIndent = formatIndent(nodeDepth * 4 + 4);

  const keys = Object.keys(object);

  const mapper = (key) => {
    const value = object[key];

    return _.isObject(value)
      ? `${innerIndent}${key}: ${stringifyObject(object[key], nodeDepth + 1)}`
      : `${innerIndent}${key}: ${object[key]}`;
  };

  const resultString = keys.map((key) => mapper(key)).join('\n');
  return `{\n${resultString}\n${closeIndent}}`;
};

/**
 * Get styled string with depth indent.
 * @param value{string|{}}
 * @param depth{number}
 * @return {string}
 */
const getString = (value, depth) => (
  _.isObject(value)
    ? stringifyObject(value, depth)
    : value
);

/**
 * Get tree styled output.
 * @param data{{}}
 * @return {string}
 */
const getStylish = (data) => {
  const iter = (currentData, depth) => {
    const innerIndent = formatIndent(depth * 4 + 2);
    const closeIndent = formatIndent(depth * 4);

    const mapper = (node) => {
      const {
        key, value, status, children,
      } = node;

      const getStringWhich = {
        unchanged: () => `${innerIndent}  ${key}: ${getString(value, depth)}`,
        added: () => `${innerIndent}+ ${key}: ${getString(value, depth)}`,
        removed: () => `${innerIndent}- ${key}: ${getString(value, depth)}`,
        nested: () => `${innerIndent}  ${key}: ${iter(children, depth + 1)}`,
        updated: () => {
          const [beforeValue, afterValue] = value;
          return `${innerIndent}- ${key}: ${getString(beforeValue, depth)}\n`
          + `${innerIndent}+ ${key}: ${getString(afterValue, depth)}`;
        },
      };

      return getStringWhich[status]();
    };
    const resultString = currentData.map((dataItem) => mapper(dataItem)).join('\n');

    return `{\n${resultString}\n${closeIndent}}`;
  };

  return iter(data, 0);
};

export default getStylish;
