module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    semi: ['error', 'never'], // 不使用分号
    indent: ['error', 2], // 缩进风格
    quotes: ['error', 'single'], // 使用单引号
    'vue/no-parsing-error': [
      2,
      { 'x-invalid-end-tag': false },
    ], // 标签不严格闭合
    'prefer-const': 0, // 首选const
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-bitwise': 0, // 禁止使用按位运算符
    'on-continue': 0,
    'no-implicit-coercion': 1, // 禁止隐式转换
    'no-inline-comments': 0, // 禁止行内备注
    'no-mixed-spaces-and-tabs': [2, false], // 禁止换用tab和空格
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    'no-new': 1, // 禁止在使用new构造一个实例后不赋值
    'no-new-func': 1, // 禁止使用new Function
    'no-plusplus': 0, // 禁止使用++，--
    'no-process-env': 0, // 禁止使用process.env
    'no-return-assign': 1, // return语句中不能有赋值表达式
    'no-sequences': 0, // 禁止使用逗号运算符
    'no-sync': 0, // 禁止同步方法
    'no-nested-ternary': 0, // 禁止使用三目运算符
    'no-trailing-spaces': 1, // 一行后面不要有空格
    'no-undef': 1, // 不能有未定义的变量
    'no-underscore-dangle': 1, // 标识符不能以_开头或结尾
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'func-names': 0, // 函数表达式必须有名字
    'init-declarations': 0, // 声明时必须赋初值
    'key-spacing': [0, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'lines-around-comment': 0, // 行前行后备注
    'linebreak-style': [0, 'windows'], // 换行风格
    eqeqeq: 1, // 使用全等
    'no-param-reassign': 1, // 给参数重新赋值
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
    'max-len': 0, // 字符串的最大长度
    'no-caller': 1, // 禁止使用arguments.caller或arguments.callee
    'guard-for-in': 0, // for in 循环要用if语句过滤
    'no-restricted-syntax': 0,
    'no-restricted-properties': 0,
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
    }],
    'import/prefer-default-export': 1,
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
  },
  settings: {
    'import/extensions': { // 解决webpack配置省略后缀后，eslint报错的问题
      extensions: ['.vue', '.js'],
    },
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.config.js',
      },
    },
  },
}
