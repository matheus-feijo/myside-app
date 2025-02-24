//eslint-disable-next-line
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Suporte a alias do Next.js
    },
};

module.exports = createJestConfig(customJestConfig);
