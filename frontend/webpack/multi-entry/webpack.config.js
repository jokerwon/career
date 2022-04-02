const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/main.js'),
        header: path.resolve(__dirname, './src/header.js'),
    },
    output: {
        filename: '[name].[fullhash:8].js', // 入口 chunk 的文件名模板
        path: path.resolve(__dirname, './dist')  // 输出目录
    },
    plugins: [
        // 自动清除构建文件夹
        new CleanWebpackPlugin(),

        // 自动生成引入了资源的html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'), // 文件模板
            filename: 'main.html',
            chunks: ['main', 'header'], // 依赖多个: entry.main, entry.header
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'header.html',
            chunks: ['header'], // entry.header
        }),
    ]
}