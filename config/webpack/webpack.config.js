const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

let config;
if ((process.env.CODE_ENV || process.env.NODE_ENV) === 'development') {
  config = require('./webpack.dev');
} else {
  config = require('./webpack.prod');
}

module.exports = merge(common, config);
