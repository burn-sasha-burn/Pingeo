const path = require('path');

module.exports = function () {
    return {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.join(process.cwd(), 'configs/postcss/postcss.config.js'),
            },
        },
    };
};
