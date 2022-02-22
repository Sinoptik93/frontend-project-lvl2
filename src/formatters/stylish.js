import _ from 'lodash';

/**
 * Get indent by depth value.
 * @param depth{number}
 * @param spaceWidth {number} [4]
 * @return {string}
 */
const indent = (depth, spaceWidth = 4) => ' '.repeat(depth * spaceWidth - 2);

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

  const resultString = Object.entries(data).map(([key, value]) => (
    mapping.unchanged({ key, value }, depth + 1)
  ));
  return `{\n${resultString.join('\n')}\n${indent(depth)}  }`;
};

/**
 * Get styled string.
 * @type {
 *   {
 *     root: (function(
 *       node: {key: string, status: string, children: []}, depth: number, iter: function
 *     ): string),
 *     unchanged: (function(
 *       node: {key: string, status: string, value: string}, depth: number
 *     ): string),
 *     added: (function(
 *       node: {key: string, status: string, value: string}, depth: number
 *     ): string),
 *     removed: (function(
 *       node: {key: string, status: string, value: string}, depth: number
 *     ): string),
 *     nested: (function(
 *       node: {key: string, status: string, children: []}, depth: number, iter: function
 *     ): string),
 *     updated: (function(
 *       node: {key: string, status: string, value: string}, depth: number
 *     ): string)}
 *   }
 */
const mapping = {
  root: ({ children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.status](node, depth + 1, iter));
    return `{\n${output.join('\n')}\n}`;
  },
  unchanged: (node, depth) => (
    `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  added: (node, depth) => (
    `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  removed: (node, depth) => (
    `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapping)}`
  ),
  nested: ({ key, children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.status](node, depth + 1, iter));
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
  },
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
  const iter = (node, depth) => mapping[node.status](node, depth, iter);

  return iter(data, 0);
};

export default getStylish;
