module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ["react", "babel", "@typescript-eslint/eslint-plugin"],
  settings: {
    react: {
      version: 'detect'
    }
  },
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    // "error"/"off" 开启/关闭prettier
    'prettier/prettier': 'error',
    // 取消 { a, b, c } 多个变量需要换行
    'object-curly-newline': [0],
    // 禁止出现未使用的变量
    '@typescript-eslint/no-unused-vars': [2],
    // 箭头函数参数括号，一个参数时可省略括号
    'arrow-parens': [2, 'as-needed'],
    // 箭头函数，箭头前后空格
    'arrow-spacing': [2, { before: true, after: true }],
    // 单行代码/字符串最大长度
    'max-len': [2, { code: 120 }],

    // react配置
    // jsx缩进2个空格
    'react/jsx-indent': [2, 2],
    // 强制组件方法顺序
    'react/sort-comp': [2],
    // 结束标签，组件省略闭合标签，html不省略闭合标签
    'react/self-closing-comp': [2, { component: true, html: false }],
    // 检查 Hook 的规则，不允许在if for里面使用
    'react-hooks/rules-of-hooks': [2],
    // 检查 effect 的依赖
    'react-hooks/exhaustive-deps': [2]
  }
};
