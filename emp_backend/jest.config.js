const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig.json');
// import { pathsToModuleNameMapper } from 'ts-jest/utils';
// import { compilerOptions } from './tsconfig.json';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.[jt]s?(x)'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageReporters: ['lcov', 'text', 'html'],
    moduleNameMapper: pathsToModuleNameMapper({}, { prefix: '<rootDir>/' }),

  };
  