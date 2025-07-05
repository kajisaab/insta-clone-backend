import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['src/migration/**/*.ts', 'src/migration-scripts/**/*.ts'],
    },
    // Base JavaScript configuration
    js.configs.recommended,

    // Base TypeScript config (must come before overrides)
    ...tseslint.configs.recommended,

    // Common config for all files
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            semi: ['error', 'always'],
            quotes: 'off',
            'no-console': 'warn',
            indent: 'off',
            'linebreak-style': 'off',
            'max-len': 'off',
            'comma-dangle': 'off',
            'object-curly-spacing': 'off',
            'array-bracket-spacing': 'off',
            'space-before-function-paren': 'off',
            '@typescript-eslint/no-require-imports': 'off', // moved here after base config
        },
    },

    // Configuration for CommonJS files
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },

    // Custom TypeScript rules
    {
        files: ['**/*.ts', '**/*.tsx'],
        overrides: [
            {
                files: ['src/migration/**/*.{ts,js}'],
                rules: {
                    // disable all rules or specific ones
                    '@typescript-eslint/no-unused-vars': 'off',
                    // or disable everything
                    all: 'off',
                },
            },
        ],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-empty-object-type': 'off',
            'no-unused-vars': 'off',
            'prefer-destructuring': 'off',
            semi: ['error', 'always'],
            quotes: 'off',
            'no-console': 'warn',
            'no-restricted-imports': ['error', 'import1', 'import2'],
            '@typescript-eslint/indent': 'off',
            '@typescript-eslint/space-before-function-paren': 'off',
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/member-delimiter-style': 'off',
        },
    }
);
