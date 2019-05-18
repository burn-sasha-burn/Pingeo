const babelLoader = require('../loaders/babelLoader');
const tsLoader = require('./../loaders/tsLoader');

module.exports = function () {
    return {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        loaders: [babelLoader(), tsLoader()]
    };
};
