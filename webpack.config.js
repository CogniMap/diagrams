var webpack = require('webpack');
var path = require('path');

// variables
var sourcePath = path.join(__dirname, '.');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: sourcePath,
	entry: {
		main: './index.tsx',
	},
	output: {
		path: outPath,
		publicPath: '/',
		filename: 'bundle.js',
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		// Fix webpack's default behavior to not load packages with jsnext:main module
		// https://github.com/Microsoft/TypeScript/issues/11677
		mainFields: ['main']
	},
	module: {
		loaders: [
			// .ts, .tsx
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader?module=es6'
			},
      // sass
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          })
      },
      // fonts
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
			// css
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader'
						},
					]
				})
			},
			// static assets
			{ test: /\.html$/, use: 'html-loader' },
			{ test: /\.png$/, use: 'url-loader?limit=10000' },
			{ test: /\.jpg$/, use: 'file-loader' },
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChunks: Infinity
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new ExtractTextPlugin({
			filename: 'styles.css',
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
	devServer: {
		contentBase: sourcePath,
		hot: true,
		stats: {
			warnings: false
		},
	},
	node: {
		// workaround for webpack-dev-server issue
		// https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
		fs: 'empty',
		net: 'empty'
	}
};
