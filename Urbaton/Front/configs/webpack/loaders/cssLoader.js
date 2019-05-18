/**
 * @param modules
 * @param localIdentName
 * @param importLoaders
 * @returns {{loader: string, options: {modules: *, localIndentName: *, importLoader: *}}}
 */
module.exports = function (modules, localIdentName, importLoaders) {
    return {
        loader: 'css-loader',
        options: {modules, localIdentName, importLoaders},
    };
};
