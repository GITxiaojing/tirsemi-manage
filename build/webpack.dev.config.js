const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
const webpackMerge = require('webpack-merge')
const rootPath = path.resolve(__dirname, '../')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('../src/config')

module.exports = webpackMerge(webpackBaseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(rootPath, 'dist'),
		hot: true,
		overlay: {   // 是否在浏览器出现蒙层，并显示错误和告警
			warnings: false, // true为告警时也显示蒙层并提示，false则不显示提示
			errors: true
		},
		quiet: true,
		compress: true, // 启用gzip压缩
		...config.dev
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'tirsemi-manage',
			filename: 'index.html',
			template: path.resolve(rootPath, 'public/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		// new BundleAnalyzerPlugin({ // 查看打包体积
			// analyzerMode: 'server',
			// generateStatsFile: true,
			// statsOptions: { source: false }
		// })
	]
})
