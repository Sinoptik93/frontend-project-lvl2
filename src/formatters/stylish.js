import _ from 'lodash';

/**
 * Get indent by depth value.
 * @param depth{number}
 * @param spaceWidth {number}
 * @return {string}
 */
const indent = (depth, spaceWidth = 4) => {
  return depth
    ? ' '.repeat(depth * spaceWidth - 2)
    : '';
};

/**
 * Stringify object by current indent.
 * @param data{{}}
 * @param depth{number}
 * @param mapping{Object}
 * @return {string}
 */
const stringify = (data, depth, mapping) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const resultString = Object.entries(data).map(([key, value]) => {
    return mapping.unchanged({ key, value }, depth + 1);
  });
  return `{\n${resultString.join('\n')}\n${indent(depth)}  }`;
};

const mapping = {
  unchanged: (node, depth) => (
    `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  added: (node, depth) => (
    `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  removed: (node, depth) => (
    `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  nested: (node, depth, iter) => (
    `${indent(depth)}  ${node.key}: ${iter(node.children, depth)}`
  ),
  updated: (node, depth) => {
    const [beforeValue, afterValue] = node.value;
    return `${indent(depth)}- ${node.key}: ${stringify(beforeValue, depth, mapping)}\n`
      + `${indent(depth)}+ ${node.key}: ${stringify(afterValue, depth, mapping)}`;
  },
};

/**
 * Get tree styled output.
 * @param data{{}}
 * @return {string}
 */
const getStylish = (data) => {
  const iter = (currentData, depth) => {
    const resultString = currentData.map(
      (dataItem) => mapping[dataItem.status](dataItem, depth + 1, iter),
    ).join('\n');
    return `{\n${resultString}\n${indent(depth)}${depth ? '  ' : ''}}`;
  };

  return iter(data, 0);
};

export default getStylish;
