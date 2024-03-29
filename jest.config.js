module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/dtos/*.ts',
    '!<rootDir>/src/**/entities/*.ts',
    '!<rootDir>/src/**/factories/*.ts',
    '!<rootDir>/src/**/models/*.ts',
    '!<rootDir>/src/**/protocols/*.ts',
    '!<rootDir>/src/**/config/*.ts',
    '!<rootDir>/src/**/errors/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  watchPathIgnorePatterns: ['globalConfig', '<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup-env.js']
}
