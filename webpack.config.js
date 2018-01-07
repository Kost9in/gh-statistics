var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: path.resolve('src', 'index.js'),
	output: {
		path: path.resolve('server/static'),
		filename: 'main.js',
		publicPath: '/'
	},
	resolve: {
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		],
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('src', 'index.html'),
			filename: 'index.html',
			inject: false
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets/img', to: 'img' }
		]),
		new webpack.EnvironmentPlugin({
			NODE_ENV: process.env.NODE_ENV || 'prod'
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: [
					'babel-preset-es2015',
					'babel-preset-react'
				],
				plugins: []
			}
		}],
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'babel-preset-es2015',
						'babel-preset-react'
					],
				}
			}
		}, {
			test: /\.less$/,
			use: [
				{ loader: 'style-loader' },
				{ loader: 'css-loader' },
				{ loader: 'less-loader' }
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
			use: ['file-loader']
		}]
	}
};