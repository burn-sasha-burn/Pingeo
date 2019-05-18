const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');

module.exports = function () {
    return {
        test: /\.css$/,
        include: /node_modules/,
        use: [
            cssExtractLoader(),
            cssLoader(false, undefined, 1),
        ],
    };
};
