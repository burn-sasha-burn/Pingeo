module.exports = function () {
    return {
        loader: 'sass-loader',
        options: {
            sourceMap: process.env.NODE_ENV === 'development',
        },
    };
};
