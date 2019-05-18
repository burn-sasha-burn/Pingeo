const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');
const postcssLoader = require('../loaders/postcssLoader');
const sassLoader = require('../loaders/sassLoader');

module.exports = function (classNames) {
    return {
        test: /\.(scss)$/,
        exclude: /node_modules|layout/,
        loaders: [
            cssExtractLoader(),
            cssLoader(true, classNames, 2),
            postcssLoader(),
            sassLoader(),
        ]
    }
};
