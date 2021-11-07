const { isDevelopment,isProduction} = require('../env')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { PROJECT_PATH } = require('../constant')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 因为后续要配sass也需要使用到这套规则，所以这里抽离出来

const getCssLoaders = () => {
    const cssLoaders = [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: "[local]--[hash:base64:5]"
          },
          sourceMap: isDevelopment,
        }
      }
    ]
    
    // 开发环境一般用chrom不会有问题，防止开发环境下看样式有一堆前缀影响查看，因此只在生产环境使用
    isProduction && cssLoaders.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            isProduction && [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: true
                }
              }
            ]
          ]
        }
      }
    })
    
    return cssLoaders
  }
  
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
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
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
        {
          test: /\.(tsx?|js)$/,
          loader: 'babel-loader',
          options: { cacheDirectory: true },
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            ...getCssLoaders(),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              }
            }
          ]
        },
      {
        test: /\.css$/,
        use: [...getCssLoaders()]
      }
    ]
  },
  resolve: {
    alias: {
      'src': path.resolve(PROJECT_PATH, './src'),
      'pages': path.resolve(PROJECT_PATH, './src/pages'),
      'components': path.resolve(PROJECT_PATH, './src/components'),
      'tools': path.resolve(PROJECT_PATH, './src/tools'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],

  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       context: 'public', 
    //       from: '*',
    //       to: path.resolve(PROJECT_PATH, './dist/public'), 
    //       toType: 'dir',
    //       globOptions: {
    //         dot: true,
    //         gitignore: true,
    //         ignore: ['**/index.html'],		// **表示任意目录下
    //       },
    //     },
    //   ],
    // }),
    new WebpackBar({
      name: 'OKK!!!', 
      color: '#52c41a' 
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
  	new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
  ]
}