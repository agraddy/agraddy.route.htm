var drop = require('agraddy.drop.htm');

var mod;

mod = function(routes, url) {
	routes[url] = function(req, res) {
		drop('views/' + url.slice(1).replace(/\//g, '_') + '.htm')(null, req, res);
	};
}

module.exports = mod;
