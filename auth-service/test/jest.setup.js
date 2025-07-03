const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

// Set NODE_ENV to 'test' for all Jest tests
process.env.NODE_ENV = 'test';

// Load environment variables from .env.test file
readFileSync(resolve(process.cwd(), '.env.test'), 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });

console.log(
    'Jest setup: Environment set to TEST with variables from .env.test'
);
