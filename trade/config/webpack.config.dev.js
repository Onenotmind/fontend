const webpack = require('webpack')
const htmlWepackPlugin = require('html-webpack-plugin')
const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	},
	devServer: {
    contentBase: './src',
    compress: true,
    port: 3002
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{ // TODO 暂时加这个
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
			{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
			{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000',
        // options: {
        //   limit: 10000,
        //   name: 'static/fonts/[name].[ext]'
        // }
      },
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			}
		]
	},
	plugins: [
		new htmlWepackPlugin({
			template: './src/index.html'
		}),
		new cleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/libs/dist/',
        to: './libs/dist/',
        toType: 'dir'
      }
    ])
	],
	resolve: {
	  alias: {
	    vue: 'vue/dist/vue.js'
	  }
	}
}