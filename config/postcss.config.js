const { isProduction } = require('./env');
module.exports = {
  // `api.file` - 文件路径
  // `api.mode` - webpack 的 `mode` 属性值，请查阅 https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - 在复杂情况下使用的 loader 上下文
  // `api.env` - `api.mode` 的别名，与 `postcss-cli` 兼容
  // `api.options` - `postcssOptions` 的选项
  // 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
  // parser: 'sugarss',
  // PostCSS 插件
  plugins: [
    // 开发环境一般用chrom不会有问题，防止开发环境下看样式有一堆前缀影响查看，因此只在生产环境使用
    isProduction && [
      'postcss-preset-env',
      {
        autoprefixer: {
          grid: true
        }
      }
    ],
    {
      'postcss-px-to-viewport': {
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: [/[a-zA-Z0-9]+Ignore$/], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false // (Boolean) Allow px to be converted in media queries.
      }
    }
  ]
};
