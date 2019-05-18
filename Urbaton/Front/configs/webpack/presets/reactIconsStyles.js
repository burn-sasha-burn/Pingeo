const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');
const postcssLoader = require('../loaders/postcssLoader');

module.exports = function () {
    return {
        test: /\.css$/,
        include: /react-icons/,
        loaders: [
            cssExtractLoader(),
            cssLoader('global', undefined, undefined),
            postcssLoader()
        ]
    };
};
