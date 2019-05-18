const path = require('path');

module.exports = function () {
    return {
        loader: 'babel-loader',
        options: {
            configFile: path.join(process.cwd(), 'configs/babel/babel.config.js'),
        },
    };
};
