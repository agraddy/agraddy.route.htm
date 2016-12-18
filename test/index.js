var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var htm = require('../');
var routes = {};
var res = response();
var res2 = response();

process.chdir('test');

(function() {
	htm(routes, '/about');

	res.on('finish', function() {
		tap.assert.equal(res._body, 'about\n', 'Should parse the data.');
	});

	routes['/about']({}, res);
})();


(function() {
	htm(routes, '/take/two');
	res2.on('finish', function() {
		tap.assert.equal(res2._body, 'take_two\n', 'Should get file with two slashes.');
	});

	routes['/take/two']({}, res2);
})();


