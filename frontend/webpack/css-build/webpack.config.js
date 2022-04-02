const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                 *  style-loader 将 css 文件插入到 DOM 中
                 */
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
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
    ]
}