module.exports = function (name) {
    return {
        loader: 'file-loader',
        options: {
            name: name,
        },
    };
};
