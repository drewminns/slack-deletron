module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  coveragePathIgnorePatterns: ['node_modules', 'src/__test__', 'src/server/utils', 'cypress'],
  setupFilesAfterEnv: ['<rootDir>/src/__test__/setupEnzyme.ts'],
};
