const path = require('path');

module.exports = {
	/* Path to root */
	root: path.resolve(__dirname, '../'),

	/* Path to source files directory */
	source: path.resolve(__dirname, '../src/'),

	/* Path to built files directory */
	output: path.resolve(__dirname, '../dist/'),

	/* Path to public files directory */
	public: path.resolve(__dirname, '../public/')
};
