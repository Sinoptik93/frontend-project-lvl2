/**
 * Get typed stringed value.
 * @param value{{}}
 * @return {string|*}
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
 *     unchanged: (function(): string),
 *     removed: (function(resultPath: string): string),
 *     added: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}): string),
 *     nested: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}, iter: function): string),
 *     updated: (function(resultPath: string,
 *       item: {key: string, status: string, value: string}): string)
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
    const [beforeValue, afterValue] = node.value;

    return `Property '${getPath(rootPaths, node.key)}' was updated. From ${
      stringify(beforeValue)
    } to ${
      stringify(afterValue)
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
