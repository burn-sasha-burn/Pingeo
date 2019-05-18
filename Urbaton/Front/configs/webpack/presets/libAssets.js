const fileLoader = require('../loaders/fileLoader');

module.exports = function (assetNames) {
    return {
        test: /\.(png|woff|woff2|eot)$/,
        include: /node_modules/,
        use: [
            fileLoader(assetNames),
        ]
    }
};
