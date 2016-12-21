var drop = require('agraddy.drop.htm');
var luggage = require('agraddy.luggage');

var mod;

mod = function(routes, url, plugins) {
	var filename = '';

	// Check if url is a regex
	if(url.slice(0, 1) === '^') {
		filename = url.slice(2, url.indexOf('(')).replace(/\//g, '_');
	} else {
		filename = url.slice(1).replace(/\//g, '_');
	}

	if(plugins) {
		routes[url] = function(req, res) {
			luggage(req, res, plugins, drop('views/' + filename + '.htm'));
		};
	} else {
		routes[url] = function(req, res) {
			drop('views/' + filename + '.htm')(null, req, res);
		};
	}
}

module.exports = mod;
