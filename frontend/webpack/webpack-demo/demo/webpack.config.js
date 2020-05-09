const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置 nodejs 的环境变量
process.env.NODE_ENV = 'development'

const commonCssLoader = [
  /**
    * 
    * style-loader 将编译后的样式以 style 标签插入到html中
    * MiniCssExtractPlugin.loader 将样式提取到单独的css文件中以link方式引入
    * css-loader webpack默认只能处理js/json, 此loader用来处理css文件
    * less-loader 用于编译less文件
    */
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader',
  // css兼容性处理: 置于 css-loader后一个,postcss-loader, postcss-preset-env
  // 帮助postcss获取package.json中browserslist的配置，通过配置加载指定的css兼容性样式
  // 'postcss-loader',  // 使用默认配置
  // 使用自定义配置
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  },
]

module.exports = {
  entry: './src/js/main.js',  // 入口文件
  output: {
    filename: 'js/[name].js',  // 入口文件输出后的文件名,使用[name]获取原文件名
    path: resolve(__dirname, 'build'), // 构建后的输出路径
  },
  module: {
    rules: [
      // **use数组的执行顺序是由尾至头**
      {
        /**
         * js兼容性处理: babel-loader 依赖 @bable/core @bable/preset-env
         * - @bable/preset-env 只能转换基本语法, 如Promise无法转换
         * - @babel/polyfill 兼容全部语法, 需要在js文件中引入 import('@babel/polyfill'),会使文件体积过大
         * - core-js 按需加载
         */
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // enforce: 'pre',  // 如果多个loader处理同一类型文件, 此属性指定该loader优先处理
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          // 处理less资源
          'less-loader'
        ]
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: [ ...commonCssLoader ]
      },
      {
        // 处理图片资源, url-loader 依赖于 file-loader
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,  // 图片小于8KB时使用base64编码
          name: '[hash:10].[ext]',  // 重命名打包后的文件名(hash值前10位)
          esModule: false  // 关闭图片的es6模块化引入, 如果不关闭, html-loader无法处理img中的路径
        }
      },
      {
        // 处理html中img标签的图片资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(js|html|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media' // 其他文件的输出路径
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // 使用指定html文件为模板, 打包后复制一份并将js文件引入
      minify: {
        collapseWhitespace: true,  // 移除空格
        removeComments: true  // 移除注释
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'  // 不能写成 /css/index.css, 否则在html引入的时候路径会出问题
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 构建模式: development开发环境, production生产环境(会自动压缩js代码)
  mode: 'development',
  // 热部署
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,  // 启动gzip压缩
    port: 3000,  // 端口号
    open: true  // 自动打开浏览器
  }
}
