const babelLoader = require('../loaders/babelLoader');

module.exports = function () {
    return {
        test: /\.jsx?$/,
        include: /retail-ui/,
        use: [
            babelLoader(),
        ],
    };
};
