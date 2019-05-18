module.exports = require('./webpack.base')({
    mode: 'production',

    plugins: [
        // new CleanWebpackPlugin(['build'], {root: cwd}),
    ],

    optimization: {
        minimize: true,
    },

    // Only hashes for images and classes in production
    imageNames: '[hash].[ext]',
    cssClassNames: '[hash]',

    devtool: undefined,
});
