const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
const webpackMerge = require('webpack-merge')
const rootPath = path.resolve(__dirname, '../')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = webpackMerge(webpackBaseConfig, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(rootPath, 'dist'),
		host: '192.168.1.103',
		port: '',
		index: 'index.html',
        hot: true,
        inline: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'tirsemi-manage',
			filename: 'index.html',
			template: path.resolve(rootPath, 'public/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			generateStatsFile: true,
			statsOptions: { source: false }
		})
	]
})
