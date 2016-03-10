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

