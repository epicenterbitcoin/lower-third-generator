/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['plugins/console', 'plugins/kinetic', 'main'],

	paths: {
		jquery: '../components/jquery/dist/jquery.min'
	},

	shim: {
		// If you need to shim anything, put it here
	},

	// Prevent caching issues, by adding an additional URL argument
	urlArgs: 'bust=' + (new Date()).getDate()

});
