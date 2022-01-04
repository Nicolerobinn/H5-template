const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PROJECT_PATH } = require('../constant');
const config = {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename]
    },
    name: 'production-cache'
  },
  output: {
    clean: true,
    filename: 'script/[name].[contenthash].js',
    chunkFilename: 'chunkScript/[name].[chunkhash].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'chunkCss/[name].[contenthash].css',
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
  config.output.sourceMapFilename = 'sourceMap/[name].[contenthash].js.map';
  config.output.publicPath = '';
}
module.exports = config;
