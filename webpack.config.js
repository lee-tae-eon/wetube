// 웹팩 설정파일은 old js파일을 인식한다.
// 그래서 mordern js인 import를 인식하지 못한다
// jsx로 처리되는 변수들은 shadowing되서 elsint가 찾아내지 못한다 그래서 옆에 주석을 달아 에러를 없앰.
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // eslint-disable-line no-unused-vars
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./client/js/main.js"],
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
