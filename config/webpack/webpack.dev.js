const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant')

module.exports = merge(common, {
  infrastructureLogging: {
    level: 'warn',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(PROJECT_PATH, './dist'),
    publicPath: '/',
  },
  devServer: {
    client: {
      progress: true,
    },    
    historyApiFallback: true,       
    open: true,     
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true,               
    hot: true,           
  },
  target: 'web',
  plugins: [
  ]
})