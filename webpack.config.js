const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (_, argv) => ({
  entry: ["./src/module/StaNg.ts", "./src/styles/sta-ng.scss"],

  devtool: argv.mode === "development" ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                sourceMap: argv.mode === "development",
                noEmit: false,
              },
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: argv.mode === "development",
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: argv.mode === "development",
            },
          },
        ]
      },
    ],
  },

  optimization: {
    minimize: argv.mode === "production",
    minimizer: [new TerserPlugin({
      terserOptions: {
        mangle: false,
        module: true,
      }
    }),]
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        { from: "src/lang", to: "lang" },
        { from: "src/templates", to: "templates" },
        "LICENSE.txt",
        "src/system.json",
        "src/template.json",
      ]
    }),
    new MiniCssExtractPlugin({ filename: "styles/sta-ng.css" }),
    new SimpleProgressWebpackPlugin({ format: "compact" }),
  ],

  resolve: {
    extensions: [".ts"],
  },

  output: {
    clean: true,
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/"),
  },
});
