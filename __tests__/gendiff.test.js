import gendiff from '../src/index.js';

const example = (
  `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`);

describe('gendiff test', () => {
  const relativePathTo = (fileName) => `./__tests__/__fixtures__/${fileName}`;
  const absolutePathTo = (fileName) => `${__dirname}/__fixtures__/${fileName}`;

  test('JSON relative path', () => {
    expect(gendiff(relativePathTo('before.json'), relativePathTo('after.json'))).toMatch(example);
  });
  test('JSON absolute path', () => {
    expect(gendiff(absolutePathTo('before.json'), absolutePathTo('after.json'))).toMatch(example);
  });
  test('YAML relative path', () => {
    expect(gendiff(relativePathTo('before.yml'), relativePathTo('after.yml'))).toMatch(example);
  });
  test('YAML absolute path', () => {
    expect(gendiff(absolutePathTo('before.yml'), absolutePathTo('after.yml'))).toMatch(example);
  });
});
