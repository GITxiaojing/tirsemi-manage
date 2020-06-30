const vueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = path.resolve(__dirname, '../')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	entry: '@/main.js',
	output: {
		path: path.resolve(rootPath, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				] // 可以使用extract-text-webpack-plugin将css模块抽离到分离的css文件
			},
			{
				test: /\.(svg|ttf|eot|woff)\??.*$/,
				use: ['url-loader']
			}
		]
	},
	plugins: [
		new vueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'tirsemi-manage',
			filename: 'index.html',
			template: path.resolve(rootPath, 'public/index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			'@': path.join(rootPath,'src'),
			'_c': path.join(rootPath, 'src/components')
		},
		extensions: ['.js', '.vue', '.less', '.css', '.scss']
	}
}
