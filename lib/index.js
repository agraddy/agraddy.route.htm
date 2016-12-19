var drop = require('agraddy.drop.htm');
var luggage = require('agraddy.luggage');

var mod;

mod = function(routes, url, plugins) {
	if(plugins) {
		routes[url] = function(req, res) {
			luggage(req, res, plugins, drop('views/' + url.slice(1).replace(/\//g, '_') + '.htm'));
		};
	} else {
		routes[url] = function(req, res) {
			drop('views/' + url.slice(1).replace(/\//g, '_') + '.htm')(null, req, res);
		};
	}
}

module.exports = mod;
