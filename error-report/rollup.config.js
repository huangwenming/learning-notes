/**
 * @file rollup配置文件
 * @author huangwenming
 */
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

const builds = {
    'cjs-prod': {
        input: './index.js',
        output: {
            file: 'dist/index.common.prod.js',
            format: 'cjs'
        },
        plugins: [
            babel(),
            uglify()
        ]
    },
    'cjs-dev': {
        input: './index.js',
        output: {
            file: 'dist/index.common.dev.js',
            format: 'cjs'
        },
        plugins: [
            babel()
        ]
    },
    'umd-prod': {
        input: './index.js',
        output: {
            file: 'dist/index.umd.prod.js',
            name: '_error_report',
            format: 'umd'
        },
        plugins: [
            babel(),
            uglify()
        ]
    },
    'umd-dev': {
        input: './index.js',
        output: {
            file: 'dist/index.umd.dev.js',
            name: '_error_report',
            format: 'umd'
        },
        plugins: [
            babel()
        ]
    },
    'esm': {
        input: './index.js',
        output: {
            file: 'dist/index.esm.js',
            format: 'es'
        },
        // uglify 只能处理es5的语法，不能处理esm模块的export default语法
        plugins: [
            babel()
        ]
    }
};
module.exports = builds[process.env.TARGET || 'esm'];
