requirejs.config({
	"baseUrl" : 'content/',
	paths: {
		'jquery': '../../content/bower_components/jquery/dist/jquery.min',
		'knockout': '../../content/bower_components/knockout/dist/knockout',
		'lodash': '../../content/bower_components/lodash/lodash.min',
		'index': '../../content/js/modules/index'
	}
});

require(['jquery', 'knockout', 'index', 'lodash'], function() { });