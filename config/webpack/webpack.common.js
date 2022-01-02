const { isDevelopment } = require('../env');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PROJECT_PATH } = require('../constant');
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
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx')
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
        test: /\.(tsx?|js)$/,
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
        use: [...getCssLoaders(1)]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(PROJECT_PATH, './src'),
      pages: path.resolve(PROJECT_PATH, './src/pages'),
      components: path.resolve(PROJECT_PATH, './src/components'),
      tools: path.resolve(PROJECT_PATH, './src/tools')
    },
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  plugins: [
    new WebpackBar({
      name: 'OKK!!!',
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
