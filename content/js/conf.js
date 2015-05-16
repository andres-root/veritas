requirejs.config({
	"baseUrl" : 'content/',
	paths: {
		'jquery': '../../content/bower_components/jquery/dist/jquery.min',
		'knockout': '../../content/bower_components/knockout/dist/knockout',
		'index': '../../content/js/modules/index'
	}
});

require(['jquery', 'knockout', 'index'], function() { });