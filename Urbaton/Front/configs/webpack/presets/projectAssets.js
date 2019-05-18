const fileLoader = require('../loaders/fileLoader');

module.exports = function (assetNames) {
    return {
        test: /\.(png|jpg|gif|svg)$/,
        include: /Content\/Images/,
        use: [
            fileLoader(assetNames),
        ],
    };
};
