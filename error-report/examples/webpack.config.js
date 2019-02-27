let path = require('path');
module.exports = {
	devtool: '#source-map',
	mode: 'development',
    entry: './client/test-error/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/test-error')
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'client'), path.resolve(__dirname, '../error-report')],
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname, './client'), path.resolve(__dirname, '../error-report')]
            },
        ]
	}
};
