module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist/'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  coveragePathIgnorePatterns: ['node_modules', 'src/__test__', 'src/server/utils', 'cypress'],
};
