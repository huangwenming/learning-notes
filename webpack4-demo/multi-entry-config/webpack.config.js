/**
 * Created by huangwenming on 2018/5/13.
 */
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件
    output: {
        // 打包后会生成index.js和login.js文件
        filename: '[name].[hash:4].js',
        // 打包后的目录，必须是绝对路径
        path: path.resolve('dist')
    },
    // 处理对应模块
    module: {},
    // 对应的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // 对应关系,index.js对应的是index.html
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            // 对应关系,login.js对应的是login.html
            chunks: ['login']
        })
    ],
    // 开发服务器配置
    devServer: {},
    // 模式配置
    mode: 'development'
}