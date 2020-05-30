import path from 'path';
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

const relativePathTo = (fileName) => `./__tests__/__fixtures__/${fileName}`;
const absolutePathTo = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const testFiles = [
  ['before.json', 'after.json', 'JSON'],
  ['before.yml', 'after.yml', 'YAML'],
  ['before.ini', 'after.ini', 'INI'],
];

describe('Gendiff test', () => {
  test.each(testFiles)('%s %s | %s format (relative/absolute path):', (file1, file2) => {
    expect(gendiff(relativePathTo(file1), relativePathTo(file2))).toMatch(example);
    expect(gendiff(absolutePathTo(file1), absolutePathTo(file2))).toMatch(example);
  });
});
