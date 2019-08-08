const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const baseDir = path.join(__dirname, '..');

const config = {
	entry: path.join(baseDir, 'src', 'entry.js'),
	output: {
		path: path.join(baseDir, 'dist'),
		filename: '[name].[chunkhash:16].bundle.js'
	},
	mode: "development",
	devServer: {
		contentBase: './dist',
		inline: true,
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.(png|gif|wbmp|svg|woff|woff2)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}]
			},
			{
				test: /\.(jpg|ttf|eot)$/i,
				use: [{
					loader: 'file-loader'
				}]
			},
			{
				test: /\.s?css$/i,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[local]--[hash:base64:5]',
							camelCase: true,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Mama Money Test',
			template: path.join(baseDir, 'src', 'index.template.html')
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		})
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};

module.exports = config;