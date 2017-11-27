/* eslint-disable */
/**
 * @file production运行入口，配置入口为config/index.js中的build字段
 */

var webpack = require('webpack')
var webpackConfig = require('../webpack.config')
webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
});
