const config = {
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true
  }
};

module.exports = config;
