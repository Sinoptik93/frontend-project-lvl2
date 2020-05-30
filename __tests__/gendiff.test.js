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
  test('JSON relative path', () => {
    const relativePath1 = './__tests__/__fixtures__/before.json';
    const relativePath2 = './__tests__/__fixtures__/after.json';
    expect(gendiff(relativePath1, relativePath2)).toMatch(example);
  });
  test('JSON absolute path', () => {
    const absolutePath1 = `${__dirname}/__fixtures__/before.json`;
    const absolutePath2 = `${__dirname}/__fixtures__/after.json`;
    expect(gendiff(absolutePath1, absolutePath2)).toMatch(example);
  });
  test('YAML relative path', () => {
    const relativePath1 = './__tests__/__fixtures__/before.yml';
    const relativePath2 = './__tests__/__fixtures__/after.yml';
    expect(gendiff(relativePath1, relativePath2)).toMatch(example);
  });
  test('YAML absolute path', () => {
    const absolutePath1 = `${__dirname}/__fixtures__/before.yml`;
    const absolutePath2 = `${__dirname}/__fixtures__/after.yml`;
    expect(gendiff(absolutePath1, absolutePath2)).toMatch(example);
  });
});
