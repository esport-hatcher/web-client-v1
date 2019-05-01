const path = require('path');

module.exports = function override(config) {
	config.resolve = {
		...config.resolve,
		alias: {
			'@': path.resolve(__dirname, 'src/app')
		}
	};

	return config;
};
