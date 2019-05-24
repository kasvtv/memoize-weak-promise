/* eslint-disable global-require*/

module.exports = (wallabyJS) => ({
	files: [
		'index.js',
		'lib/*.js',
		'lib/**/*.js',
	],

	tests: [
		'test/**/*.js',
	],

	env: {
		type: 'node'
	},

	testFramework: 'mocha',
});