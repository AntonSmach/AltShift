import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {ecmaFeatures: {jsx: true}},
        },
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
            'react-hooks': pluginReactHooks,
            'react-refresh': pluginReactRefresh,
        },
        rules: {
            'prettier/prettier': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        },
        ignores: ['dist', 'node_modules', 'tailwind.config.js', 'postcss.config.js'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: parserTypescript,
        },
        plugins: {
            '@typescript-eslint': pluginTypescript,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];
