// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: { filename: 'bundle.js', path: path.resolve(__dirname, './dist') },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["es2015", { "modules": false }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tree-shaking'
        })
    ]
};