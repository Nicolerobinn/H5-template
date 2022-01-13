const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PROJECT_PATH } = require('../constant');
const config = {
  mode: 'production',
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename]
    },
    name: 'production-cache'
  },
  target: 'browserslist',
  output: {
    clean: true,
    path: path.resolve(PROJECT_PATH, './dist'),
    filename: 'script/[name].[contenthash].js',
    chunkFilename: 'chunkScript/[name].[chunkhash].js',
    assetModuleFilename: 'asset/[name].[contenthash:8].[ext]',
    sourceMapFilename: 'sourceMap/[name].[contenthash].js.map'
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
          compress: process.env.NODE_ENV === 'production' && {
            pure_funcs: ['console.log']
          }
        }
      })
    ]
  }
};
// 因为rc环境与生产环境打包 配置都使用prod的配置，所以通过环境变量进行简单配置的区分
if (process.env.NODE_ENV === 'production') {
  config.devtool = false; // 不需要 source-map
  // config.output.publicPath = '';
}
module.exports = config;
