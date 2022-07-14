/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  coverageProvider: 'v8',

  // 参考:
  // https://bobbyhadz.com/blog/typescript-jest-cannot-use-import-statement-outside-module
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },

  // ts-jestでテストが遅くなる場合の対処法
  // https://qiita.com/hedrall/items/47401d70848d23d6aad6#ts-jest%E3%81%8C%E9%81%85%E3%81%84
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // https://blog.mitsuruog.info/2019/06/jest-module-name-mapper
  // https://qiita.com/nju33/items/8ed1823690b0348daaa7
  // https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    '^@/src/(.*)': '<rootDir>/src/$1',
  },
};
