import stylish from './stylish.js';
import getPlain from './plain.js';

const formatter = {
  stylish: (diffList) => stylish(diffList),
  plain: (diffList) => getPlain(diffList),
  json: (diffList) => JSON.stringify(diffList),
};

export default (ast, type) => formatter[type](ast);
