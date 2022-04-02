const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

console.log(process.argv);
const isDev = process.argv.indexOf('--mode=production') === -1;

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),  // 输出目录
        filename: 'js/[name].[fullhash:8].js', // 入口 chunk 的文件名模板
        chunkFilename: 'js/[name].[fullhash:8].js', // 非入口但需要打包的文件名
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']
    },
    module: {
        rules: [
            {
                test: /.vue$/i,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /.css$/i,
                use: [
                    {
                        loader: isDev
                            ? 'vue-style-loader'
                            : MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./dist/css/",
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: isDev
                            ? 'vue-style-loader'
                            : MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./dist/css/",
                        }
                    },
                    'css-loader',
                    {
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
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false, // 不加此配置会导致图片路径变为[object%20Module]，无法加载，参考 https://www.jianshu.com/p/1339e11b4969
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'), // 文件模板
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash:8].css', // 输出文件名
            chunkFilename: 'css/[id].css'
        }),
        new VueLoaderPlugin(),
    ]
}