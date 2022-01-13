const { isDevelopment } = require('../env');
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PROJECT_PATH } = require('../constant');
const envConfig = require('../env');
// TODO: 考虑是否添加 esbuild-loader 以及 ProvidePlugin全局变量
const getCssLoaders = importLoaders => {
  const cssLoaders = [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]--[hash:base64:5]'
        },
        sourceMap: isDevelopment,
        importLoaders
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(PROJECT_PATH, './config/postcss.config.js')
        }
      }
    }
  ];

  return cssLoaders;
};

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx')
  },
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
    sourceMapFilename: 'sourceMap/[name].[contenthash].js.map'
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(tsx?|ts｜js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(PROJECT_PATH, './src'),
      pages: path.resolve(PROJECT_PATH, './src/pages'),
      components: path.resolve(PROJECT_PATH, './src/components'),
      tools: path.resolve(PROJECT_PATH, './src/tools'),
      utils: path.resolve(PROJECT_PATH, './src/tools/utils'),
      consts: path.resolve(PROJECT_PATH, './src/tools/consts')
    },
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin(envConfig),
    new WebpackBar({
      name: 'Boohee Web',
      color: '#52c41a'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json')
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html')
    })
  ]
};
