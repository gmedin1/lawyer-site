const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (_, argv) => {
  const { mode } = argv;
  return {
    mode,
    target: "web",
    devtool: "eval-source-map",
    entry: {
      main: "./src/main.js",
    },
    devServer: {
      port: 3000,
      open: true,
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
    },
    output: {
      clean: true,
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: ["html-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/,
          type: "asset/source"
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        publicPath: "/",
      }),
    ],
  };
};
