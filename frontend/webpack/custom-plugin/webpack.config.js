const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ShowFileInfo = require("./plugin/show-file-info");

// console.log(__dirname); // /Users/wengjiankai/Workspace/excercise/webpack/startup

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    filename: "[name].[fullhash:8].js", // 入口 chunk 的文件名模板
    path: path.resolve(__dirname, "./dist"), // 输出目录
  },
  plugins: [
    // 自动生成引入了资源的html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ShowFileInfo(),
  ],
};
