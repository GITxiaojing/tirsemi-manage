const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
const webpackMerge = require('webpack-merge')
const rootPath = path.resolve(__dirname, '../')


module.exports = webpackMerge(webpackBaseConfig, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(rootPath, 'dist'),
		host: '192.168.1.112',
		port: '',
		index: 'index.html',
        hot: true,
        inline: true
	},
})
