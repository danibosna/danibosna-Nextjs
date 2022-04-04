const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[contenthash][ext][query]",
    publicPath: "/",
  },
  mode: "production",
  resolve: {
    extensions: [".js"],
    alias: {
      "@images": path.resolve(__dirname, "./src/assets/images/"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@containers": path.resolve(__dirname, "./src/containers/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@routes": path.resolve(__dirname, "./src/routes/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@templates": path.resolve(__dirname, "./src/templates/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.css|.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/fonts"),
          to: "assets/fonts/[path][name].[contenthash][ext]",
        },
      ],
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
