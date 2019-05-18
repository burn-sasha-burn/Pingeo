const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');
const lessLoader = require('../loaders/lessLoader');
const postcssLoader = require('../loaders/postcssLoader');

module.exports = function () {
    return {
        test: /\.less$/,
        include: /retail-ui/,
        use: [
            cssExtractLoader(),
            cssLoader('global', undefined, undefined),
            postcssLoader(),
            lessLoader(),
        ],
    };
};
