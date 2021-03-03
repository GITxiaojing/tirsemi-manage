const vueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // publicPath: path.resolve(rootPath, 'public/'),
  entry: '@/main.js',
  output: {
    path: path.resolve(rootPath, 'dist'),
    // publicPath: '/', // 输出解析文件的目录，url 相对于 HTML 页面, 配置url上的基础路径，配置/时，访问路径是http://ip:port/#/，配置/manage时，访问路径是http://ip:port/manage/#/
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(vue|js)$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            quiet: true, // 设置为true会忽略警告
            fix: true // 自动修复
          }
        }],
        exclude: [/node_modules/, /test/, /test1/],
        enforce: 'pre',
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        // use: [
        // 	'style-loader',
        // 	'css-loader',
        // 	'less-loader'
        // ] // 可以使用extract-text-webpack-plugin将css模块抽离到分离的css文件
        use: utils.cssLoaders().less,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ], // 可以使用extract-text-webpack-plugin将css模块抽离到分离的css文件
      },
      {
        test: /\.(svg|ttf|eot|woff)\??.*$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: [
    new vueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(rootPath, '/public/static'),
        to: path.join(rootPath, '/dist/static/')
      }]
    })
  ],
  resolve: {
    alias: {
      '@': path.join(rootPath, 'src'),
      _c: path.join(rootPath, 'src/components'),
    },
    extensions: ['.js', '.vue', '.less', '.css', '.scss'],
  },
}
