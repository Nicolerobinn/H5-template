const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PROJECT_PATH } = require('../constant');
const config = {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  output: {
    clean: true, // Clean the output directory before emit.
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
      ignoreOrder: true
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] }
        }
      })
    ]
  }
};

if (process.env.API_ENV === 'rc') {
  config.devtool = 'source-map';
  config.output.sourceMapFilename = '[name].[hash].js.map';
}
module.exports = config;
