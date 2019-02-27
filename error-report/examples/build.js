
let webpack = require('webpack');
let config = require('./webpack.config.js');

webpack(config, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
});
