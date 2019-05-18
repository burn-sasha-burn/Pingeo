const cssExtractLoader = require('../loaders/cssExtractLoader');
const cssLoader = require('../loaders/cssLoader');

module.exports = function () {
    return {
        test: /\.css$/,
        include: /node_modules/,
        exclude: /react-icons/,
        use: [
            cssExtractLoader(),
            cssLoader(false, undefined, 1),
        ],
    };
};
