const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // NOTE: 添加 @babel/polyfill 以适应更高版本的 ES
    entry: ["@babel/polyfill", path.resolve(__dirname, './src/main.js')],
    output: {
        filename: '[name].[fullhash:8].js', // 入口 chunk 的文件名模板
        path: path.resolve(__dirname, './dist')  // 输出目录
    },
    module: {
        rules: [
            {
                test: /.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // NOTE: 注意此处是 presets
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        // 自动清除构建文件夹
        new CleanWebpackPlugin(),
        // 自动生成引入了资源的html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
    ]
}