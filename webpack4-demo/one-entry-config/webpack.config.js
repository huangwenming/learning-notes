/**
 * Created by huangwenming on 2018/5/13.
 */
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        // 打包后的文件名称
        filename: 'bundle.[hash:4].js',
        // 打包后的目录，必须是绝对路径
        path: path.resolve('dist')
    },
    // 处理对应模块
    module: {},
    // 对应的插件
    plugins: [
        new HtmlWebpackPlugin({
            // 在src目录下创建一个index.html页面当做模板来用
            template: './src/index.html',
            // 会在打包好的bundle.js后面加上hash串
            hash: true
        })
    ],
    // 开发服务器配置
    devServer: {},
    // 模式配置
    mode: 'development'
}