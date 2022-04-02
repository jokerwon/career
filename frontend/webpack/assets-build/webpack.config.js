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
            // 解析图片、媒体以及字体等静态资源
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        // 在指定条件下将静态资源使用 Base64 进行编码
                        loader: 'url-loader',
                        options: {
                            // 文件大小限制，如果超出限制则使用 fallback 指定的 loader 进行解析
                            limit: 3000,
                            /**
                             * {string | Object} fallback: 超出限制时使用何种 loader 进行解析, 默认值为 file-loader。
                             *  file-loader: 将指定文件按照规则复制到指定目录
                             */
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/image/[name].[hash:8].[ext]', // 输出的路径文件名，路径相对于 output.path
                                }
                            },
                        }
                    }
                ],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
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