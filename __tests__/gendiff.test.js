import path from 'path';
import gendiff from '../src/index.js';

const resultFlat = (
  `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

const resultTree = (
  `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
      - nestAfter: str
      + nestAfter: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);

const resultPlainTree = (
  `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group1.nestAfter' was updated. From 'str' to [complex value]
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`
);

const resultJson = (
  '[{"key":"common","status":"nested","children":[{"key":"follow","value":false,"status":"added"},'
  + '{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,'
  + '"status":"removed"},{"key":"setting3","value":[true,null],"status":"updated"},{"key":"sett'
  + 'ing4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"s'
  + 'tatus":"added"},{"key":"setting6","status":"nested","children":[{"key":"doge","status":"ne'
  + 'sted","children":[{"key":"wow","value":["","so much"],"status":"updated"}]},{"key":"key","v'
  + 'alue":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}]}]},{"key"'
  + ':"group1","status":"nested","children":[{"key":"baz","value":["bas","bars"],"status":"updated'
  + '"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":[{"key":"value"},"'
  + 'str"],"status":"updated"},{"key":"nestAfter","value":["str",{"key":"value"}],"status":"update'
  + 'd"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"key":"grou'
  + 'p3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]'
);

const relativePathTo = (fileName, ext) => `./__tests__/__fixtures__/${ext}/${fileName}`;
const absolutePathTo = (fileName, ext) => path.join(__dirname, '__fixtures__', ext, fileName);
const testFiles = [
  ['before.json', 'after.json', 'json'],
  ['before.ini', 'after.ini', 'ini'],
  ['before.yml', 'after.yml', 'yml'],
];

describe('Flat', () => {
  test.each(testFiles)('%s format:', (file1, file2, ext) => {
    expect(gendiff(
      relativePathTo(file1, ext),
      absolutePathTo(file2, ext),
    ))
      .toBe(resultFlat);
  });
});

describe('Tree', () => {
  test('JSON format', () => {
    expect(gendiff(
      relativePathTo('beforeTree.json', 'json'),
      relativePathTo('afterTree.json', 'json'),
      'stylish',
    ))
      .toBe(resultTree);
  });
});

describe('Plain', () => {
  test('JSON format', () => {
    expect(gendiff(
      relativePathTo('beforeTree.json', 'json'),
      relativePathTo('afterTree.json', 'json'),
      'plain',
    ))
      .toBe(resultPlainTree);
  });
});

describe('JSON', () => {
  test('JSON format', () => {
    expect(gendiff(
      absolutePathTo('beforeTree.json', 'json'),
      absolutePathTo('afterTree.json', 'json'),
      'json',
    ))
      .toBe(resultJson);
  });
});
