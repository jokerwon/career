const Webpack = require('webpack')
const { merge } = require('webpack-merge')

const commonWebpackConfig = require('./webpack.config.js')

module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3000,
        hot: true,
        static: './dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
});