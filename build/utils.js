const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function lessResourceLoader() {
        var loaders = [
            cssLoader,
            'less-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        path.resolve(__dirname, '../src/less/utils.less'),
                        path.resolve(__dirname, '../src/less/main.less')
                    ]
                }
            }
        ]
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        // less: generateLoaders('less'),
        less: lessResourceLoader('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}