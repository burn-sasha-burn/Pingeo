const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const context = path.join(cwd, 'Content');
const dist = path.join(cwd, 'Content/dist');

const projectCode = require('./presets/projectCode');
const projectModulesStyles = require('./presets/projectModulesStyles');
const projectGlobalStyles = require('./presets/projectGlobalStyles');
const projectAssets = require('./presets/projectAssets');

const libGlobalStyles = require('./presets/libGlobalStyles');
const libAssets = require('./presets/libAssets');

const konturRetailUiCode = require('./presets/konturRetailUiCode');
const konturRetailUiStyles = require('./presets/konturRetailUiStyles');
const konturRetailUiAssets = require('./presets/konturRetailUiAssets');
const reactIconsStyles = require('./presets/reactIconsStyles');

const cssExtractPlugin = require('./plugins/cssExtractPlugin');

module.exports = function (options) {
    return [
        {
            context: context,
            entry: {
                app: './entries/app.tsx',
            },
            output: {
                path: dist,
                publicPath: 'Content/dist',
                filename: 'js/[name].js'
            },

            module: {
                rules: [
                    projectCode(),
                    projectModulesStyles(options.cssClassNames),
                    projectGlobalStyles(),
                    projectAssets(options.imageNames),

                    libGlobalStyles(),
                    libAssets(),

                    konturRetailUiCode(),
                    konturRetailUiStyles(),
                    konturRetailUiAssets(),
                    reactIconsStyles(),
                ]
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    },
                }),
                // // Moment contains require('./locale' + name) string. Webpack think that he have to add into bundle all locales
                // // even if they doesn't used. Empty-module prevent webpack from adding unused locales into bundle.
                // // All needed locales have to be imported by hand.
                new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
                cssExtractPlugin,
            ],

            resolve: {
                modules: ['node_modules', context],
                extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css']
            },

            externals: {
                fetch: 'whatwg-fetch',
                Promise: 'promise-polyfill',
            },

            target: 'web',
            mode: options.mode,
            devtool: options.devtool,
            optimization: options.optimization,
        }
    ]
};
