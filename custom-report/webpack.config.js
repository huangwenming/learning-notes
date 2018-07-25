var path = require('path');

module.exports = {
	devtool: '#source-map',
	mode: 'development',
    entry: './client/test-error/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/test-error')
    }
}