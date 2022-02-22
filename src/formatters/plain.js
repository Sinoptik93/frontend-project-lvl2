/**
 * Get typed stringed value.
 * @param value{any}
 * @return {string|any}
 */
const stringify = (value) => {
  if (value === null) {
    return 'null';
  }

  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

/**
 * Get stringify path.
 * @param parentPaths{[]}
 * @param currentPath{string}
 * @return {string}
 */
const getPath = (parentPaths, currentPath) => [...parentPaths, currentPath].join('.');

/**
 * Get styled string.
 * @type {
 *   {
 *     unchanged: (function(): []),
 *     root: (function(
 *       node: {key: string, status: string, children: []}, rootPaths: [], iter: function
 *     ): string),
 *     removed: (function(
 *       node: {key: string, status: string, value: any}, rootPaths: []
 *     ): string),
 *     added: (function(
 *       node: {key: string, status: string, value: any}, rootPaths: []
 *     ): string),
 *     nested: (function(
 *        node: {key: string, status: string, children: []}, rootPaths: []
 *     ): string),
 *     updated: (function(
 *       node: {key: string, status: string, value: [any]}, rootPaths: []
 *     ): string)
 *   }
 * }
 */
const mapping = {
  unchanged: () => [],
  root: (node, rootPaths, iter) => node.children.flatMap((child) => iter(child, rootPaths, iter)),
  added: (node, rootPaths) => (
    `Property '${getPath(rootPaths, node.key)}' was added with value: ${stringify(node.value)}`
  ),
  removed: (node, rootPaths) => `Property '${getPath(rootPaths, node.key)}' was removed`,
  nested: (node, rootPaths, iter) => (
    node.children.flatMap((child) => iter(child, [...rootPaths, node.key], iter))
  ),
  updated: (node, rootPaths) => {
    const [oldValue, newValue] = node.value;

    return `Property '${getPath(rootPaths, node.key)}' was updated. From ${
      stringify(oldValue)
    } to ${
      stringify(newValue)
    }`;
  },
};

/**
 * Get plain styled output.
 * @param data{[{}]}
 * @return {string}
 */
const getPlain = (data) => {
  const iter = (node, rootPaths) => mapping[node.status](node, rootPaths, iter);
  return iter(data, []).join('\n');
};

export default getPlain;
