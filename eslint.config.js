import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        files: ['js/**/*.js', 'vite.config.js'],
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        files: ['vite.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
];
