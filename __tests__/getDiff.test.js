import getDiff from '../src/services/getDiff.js';
import getJsonFile from '../src/services/getJsonFile.js';

const testFilesJson = {
  before: getJsonFile('__tests__/__fixtures__/json/before.json'),
  after: getJsonFile('__tests__/__fixtures__/json/after.json'),
  beforeTree: getJsonFile('__tests__/__fixtures__/json/beforeTree.json'),
  afterTree: getJsonFile('__tests__/__fixtures__/json/afterTree.json'),
};
const testFilesYml = {
  before: getJsonFile('__tests__/__fixtures__/yml/before.yml'),
  after: getJsonFile('__tests__/__fixtures__/yml/after.yml'),
};
const testFilesIni = {
  before: getJsonFile('__tests__/__fixtures__/ini/before.ini'),
  after: getJsonFile('__tests__/__fixtures__/ini/after.ini'),
};

const resultFlat = [
  {
    key: 'follow',
    status: 'removed',
    value: false,
  },
  {
    key: 'host',
    status: 'unchanged',
    value: 'hexlet.io',
  },
  {
    key: 'proxy',
    status: 'removed',
    value: '123.234.53.22',
  },
  {
    key: 'timeout',
    status: 'updated',
    value: { before: 50, after: 20 },
  },
  {
    key: 'verbose',
    status: 'added',
    value: true,
  },
];
const resultIniFlat = [
  {
    key: 'follow',
    status: 'removed',
    value: false,
  },
  {
    key: 'host',
    status: 'unchanged',
    value: 'hexlet.io',
  },
  {
    key: 'proxy',
    status: 'removed',
    value: '123.234.53.22',
  },
  {
    key: 'timeout',
    status: 'updated',
    value: { before: '50', after: '20' },
  },
  {
    key: 'verbose',
    status: 'added',
    value: true,
  },
];
const resultNested = [
  {
    children: [
      {
        key: 'follow',
        status: 'added',
        value: false,
      },
      {
        key: 'setting1',
        status: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        status: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        status: 'updated',
        value: {
          after: null,
          before: true,
        },
      },
      {
        key: 'setting4',
        status: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
      {
        children: [
          {
            children: [
              {
                key: 'wow',
                status: 'updated',
                value: {
                  after: 'so much',
                  before: '',
                },
              },
            ],
            key: 'doge',
            status: 'nested',
          },
          {
            key: 'key',
            status: 'unchanged',
            value: 'value',
          },
          {
            key: 'ops',
            status: 'added',
            value: 'vops',
          },
        ],
        key: 'setting6',
        status: 'nested',
      },
    ],
    key: 'common',
    status: 'nested',
  },
  {
    children: [
      {
        key: 'baz',
        status: 'updated',
        value: {
          after: 'bars',
          before: 'bas',
        },
      },
      {
        key: 'foo',
        status: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        status: 'updated',
        value: {
          after: 'str',
          before: {
            key: 'value',
          },
        },
      },
    ],
    key: 'group1',
    status: 'nested',
  },
  {
    key: 'group2',
    status: 'removed',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    status: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

describe('|Get different flat|', () => {
  test('.json:', () => {
    expect(getDiff(
      testFilesJson.before,
      testFilesJson.after,
    ))
      .toStrictEqual(resultFlat);
  });
  test('.yml:', () => {
    expect(
      getDiff(testFilesYml.before,
        testFilesYml.after),
    )
      .toStrictEqual(resultFlat);
  });
  test('.ini:', () => {
    expect(
      getDiff(
        testFilesIni.before,
        testFilesIni.after,
      ),
    )
      .toStrictEqual(resultIniFlat);
  });
});

describe('|Get different nested|', () => {
  test('.json:', () => {
    expect(
      getDiff(
        testFilesJson.beforeTree,
        testFilesJson.afterTree,
      ),
    )
      .toStrictEqual(resultNested);
  });
});
