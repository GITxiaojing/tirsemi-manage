const webpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const rootPath = path.resolve(__dirname, '../')
const config = require('../src/config')

module.exports = webpackMerge(webpackBaseConfig, {
	mode: 'production',
	devServer: {
		...config.prod
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'tirsemi-manage',
			filename: 'index.html',
			template: path.resolve(rootPath, 'public/index.html')
		})
	]
})