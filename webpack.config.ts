import { Configuration } from "webpack";

import * as path from "path"
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin";

export default function config(_: string[], argv: Record<string, unknown>): Configuration {
  return {
    entry: ["./src/module/StaNg.ts", "./src/styles/sta-ng.scss"],

    devtool: argv["mode"] === "development" ? 'source-map' : false,

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: {
                  sourceMap: argv["mode"] === "development",
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
                sourceMap: argv["mode"] === "development",
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: argv["mode"] === "development",
              },
            },
          ]
        },
      ],
    },

    optimization: {
      minimize: argv["mode"] === "production",
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
      path: path.resolve(__dirname, "dist/sta-ng/"),
    },
  }
}
