const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');
const postcssLoader = require('../loaders/postcssLoader');
const sassLoader = require('../loaders/sassLoader');

module.exports = function () {
    return {
        test: /\.(css|scss)$/,
        include: /layout/,
        exclude: /node_modules/,
        use: [
            cssExtractLoader(),
            cssLoader(undefined, undefined, 2),
            postcssLoader(),
            sassLoader(),
        ],
    };
};
