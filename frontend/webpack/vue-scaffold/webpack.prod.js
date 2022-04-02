const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonWebpackConfig = require('./webpack.config.js');

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, './public'),
                        to: path.resolve(__dirname, './dist/static'),
                        filter: async resourcePath => {
                            if (resourcePath && resourcePath.endsWith('public/index.html')) {
                                // 过滤 html 模版
                                return false;
                            }
                            return true;
                        },
                    },
                ],
            }
        ),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial",
                }
            }
        }
    },
});