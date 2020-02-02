module.exports = {
    mode: 'development',
    entry: './src/person.ts',
    output: {
        filename: './dist/[name]_[hash:6].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader']
            },
            {
                test: /\.js$/,
                loaders: ['source-map-loader']
            }
        ]
    }
};
