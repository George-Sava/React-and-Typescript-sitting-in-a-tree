const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack.common.config');
const devConfig = require('./config/webpack.dev.config');
const prodConfig = require('./config/webpack.prod.config');

module.exports = (env, arg) => {
	switch (arg.mode) {
		case 'development':
			return merge(commonConfig(env), devConfig);
		case 'production':
			return merge(commonConfig(env), prodConfig);

		default:
			throw new Error('No matching configuration was found!');
	}
};
