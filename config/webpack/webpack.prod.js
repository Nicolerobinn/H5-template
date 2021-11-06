const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin")
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const common = require('./webpack.common')
const { PROJECT_PATH } = require('../constant')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new MiniCssExtractPlugin()
  ] ,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      }),
    ]
  }
})