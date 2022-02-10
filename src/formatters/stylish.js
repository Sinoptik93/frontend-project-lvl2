import _ from 'lodash';

/**
 * Stringify object by current indent
 * @param object{{}}
 * @param nodeDepth{number}
 * @return {string}
 */
const stringifyObject = (object, nodeDepth) => {
  const innerIndent = _.repeat(' ', nodeDepth * 4 + 8);
  const closeIndent = _.repeat(' ', nodeDepth * 4 + 4);
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
 * @param node{{}}
 * @param depth{number}
 * @param value{number}
 * @return {string}
 */
const getString = (node, depth, value) => (_.isObject(value)
  ? stringifyObject(value, depth)
  : value);

/**
 * Get tree styled output.
 * @param data{{}}
 * @return {string}
 */
const getStylish = (data) => {
  const iter = (currentData, depth) => {
    const innerIndent = _.repeat(' ', depth * 4 + 2);
    const closeIndent = _.repeat(' ', depth * 4);

    const mapper = (node) => {
      const stringOptions = {
        removed: () => `${innerIndent}- ${node.key}: ${getString(node, depth, node.value)}`,
        nested: () => `${innerIndent}  ${node.key}: ${iter(node.children, depth + 1)}`,
        updated: () => `${innerIndent}- ${node.key}: ${getString(node, depth, node.value[0])}\n`
          + `${innerIndent}+ ${node.key}: ${getString(node, depth, node.value[1])}`,
        unchanged: () => `${innerIndent}  ${node.key}: ${getString(node, depth, node.value)}`,
        added: () => `${innerIndent}+ ${node.key}: ${getString(node, depth, node.value)}`,
      };

      return stringOptions[node.status]();
    };
    const resultString = currentData.map((dataItem) => mapper(dataItem)).join('\n');

    return `{\n${resultString}\n${closeIndent}}`;
  };
  return iter(data, 0);
};

export default getStylish;
