const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const context = path.join(cwd, 'Content');
const dist = path.join(cwd, 'Content/dist');

const projectCode = require('./presets/projectCode');
const projectModulesStyles = require('./presets/projectModulesStyles');
const projectGlobalStyles = require('./presets/projectGlobalStyles');
const projectAssets = require('./presets/projectAssets');

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
