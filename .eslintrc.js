module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'double', {'avoidEscape': true}],
        semi: ['error', 'always'],
        '@typescript-eslint/no-unused-vars': [
            'warn', 
            { 
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    }
};
