const webpack = require('webpack')
const htmlWepackPlugin = require('html-webpack-plugin')
const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: './src/index.js',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, '../dist')
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
        loader: 'vue-loader'
      },
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
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
		new cleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') })
	],
	resolve: {
	  alias: {
	    vue: 'vue/dist/vue.js'
	  }
	}
}