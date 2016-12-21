var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var htm = require('../');
var routes = {};
var res = response();
var res2 = response();
var res3 = response();
var res4 = response();

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


(function() {
	function header(req, res, lug, cb) {
		res.setHeader('X-Test', 'test');
		cb();
	}

	htm(routes, '/add/header/here', [header]);

	res3.on('finish', function() {
		tap.assert.deepEqual(res3._headers[0], {"X-Test": "test"}, 'Should get header from luggage plugin.');
		tap.assert.equal(res3._body, 'add_header_here\n', 'Should get file with three slashes.');
	});

	routes['/add/header/here']({}, res3);
})();

(function() {
	htm(routes, '^/handle/regex(/\\d+)$');
	res4.on('finish', function() {
		tap.assert.equal(res4._body, 'handle_regex\n', 'Should handle regex - end at the first parenthesis.');
	});

	routes['^/handle/regex(/\\d+)$']({url: '/handle/regex/3'}, res4);
})();


