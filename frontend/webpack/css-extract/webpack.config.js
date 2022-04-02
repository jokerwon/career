const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        filename: '[name].[fullhash:8].js', // 入口 chunk 的文件名模板
        path: path.resolve(__dirname, './dist')  // 输出目录
    },
    module: {
        rules: [
            {
                test: /\.css$/i, // 匹配 css 文件
                /**
                 * 从右向左执行loader
                 *  css-loader 用于解析 @import 和 url()
                 *  MiniCssExtractPlugin.loader 将 css 抽离到单文件, 需要配合 MiniCssExtractPlugin 插件
                 */
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        // 添加浏览器前缀
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            },
                        },
                    },
                    'less-loader', // 将 Less 编译为 CSS
                ],
            },
        ]
    },
    plugins: [
        // 自动清除构建文件夹
        new CleanWebpackPlugin(),

        // 自动生成引入了资源的html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'), // 文件模板
        }),

        // 将 css 抽离到单文件
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash:8].css', // 输出文件名
            chunkFilename: '[id].css'
        })
    ]
}