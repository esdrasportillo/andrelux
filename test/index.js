'use strict';

var test = require('tape');
var React  = require('react');
var ReactFireMixin = require('reactfire');
//var request = require('supertest');
var immutableRenderMixin = require('react-immutable-render-mixin').default;
var fireapi = require('../js/fireapi.js');
var _ = require('lodash');

var mountReactClass = function(callback){
	callback(React.createClass({
		   		mixins: [ReactFireMixin],
		   		render: function() {
		    		return;
		  		}
	  		}));
};

test('should load all blog post', function (t) {
	mountReactClass(function(app){
		fireapi.mount(app, function(result){
			t.same(result, "succeed", "teste válido");
			t.end();
		});
	});
});


// 	request(app)
// 		.get('/')
// 		.expect(404)
// 		.end(function (err, res) {
// 			t.error(err, 'No error');
// 			t.same(res.text, 'Cannot GET /\n', '404 Error as expected');
// 			t.end();
// 		});
// });

// test('should NOT login with wrong credentials', function (t) {

// 	mongoose.model('User').findOneAndRemove({email: trainerEmail}, function(err, user) { // first delete any trainer
// 		if(err) t.end();
// 		if(user) user.remove();

// 		request(app)
// 			.post('/api/auth/login')
// 			.send({email: trainerEmail, password: '123456'})
// 			.expect('Content-Type', /json/)
// 			.expect(419)
// 			.end(function (err, res) {
// 				t.error(err, 'No error');
// 				t.same(res.status, 419, 'status 419 (authorization error)');

// 				var response = JSON.parse(res.text);
// 				t.same(response.message, 'Nome de usuário incorreto', 'body text is \'Nome de usuário incorreto\'');

// 				t.end();
// 			});
// 	});
// });

// test('finish', function (t) {
// 	mongoose.disconnect();
// 	t.pass('closing db connection');
// 	t.end();
// });