const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
	mode: 'development',

	/* Manage source maps generation process */
	devtool: 'eval-source-map',

	/* Development Server */
	devServer: {
		static: {
			directory: paths.public,
			publicPath: '/',
			watch: true
		},
		client: {
			overlay: {
				warnings: false
			}
		},
		compress: true,
		hot: false,
		port: 3000,
		/* Redirect all 404's to `index.html` */
		historyApiFallback: true
	},

	output: {
		/* Required for `historyApiFallback` to work properly */
		publicPath: '/'
	},

	/* File watcher options */
	watchOptions: {
		aggregateTimeout: 300,
		poll: 300,
		ignored: /node_modules/
	},

	/* More details on errors */
	stats: {
		errorDetails: true
	},

	/* Additional plugins */
	plugins: [
		/**
		 * Serve to `index.html`
		 */
		new HTMLWebpackPlugin({
			template: '../src/index.html'
		}),
		/**
		 * TS checks
		 */
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: '../tsconfig.json'
			}
		}),
		/**
		 * ESLint checks
		 */
		new ESLintPlugin({
			extensions: ['ts', 'tsx'],
			threads: true
		})
	]
};
