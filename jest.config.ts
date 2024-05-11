import { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  modulePaths: ['<rootDir>']
};

export default createJestConfig(config);
