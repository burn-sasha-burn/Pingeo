module.exports = require('./webpack.base')({
    mode: 'development',

    plugins: [],

    optimization: undefined,

    // Names with path for images and classes in development
    imageNames: '[path][name].[ext]',
    cssClassNames: '[path][name]__[local]--[hash:base64:5]',

    devtool: 'inline-source-map',
});
