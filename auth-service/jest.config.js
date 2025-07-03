/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest', // ✅ this is required!
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testTimeout: 400000,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1', // <-- ✅ ADD THIS LINE
    },
    testMatch: ['**/*.test.ts'],

    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
    // Set NODE_ENV to 'test' when running tests
    setupFiles: ['<rootDir>/test/jest.setup.js'],
};
