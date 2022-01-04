const path = require('path');
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant');

module.exports = {
  infrastructureLogging: {
    colors: true
  },
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(PROJECT_PATH, './dist'),
    publicPath: '/'
  },
  stats: 'errors-only',
  devServer: {
    client: {
      reconnect: 5
    },
    historyApiFallback: true,
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true,
    hot: true
  },
  target: 'web',
  plugins: []
};
