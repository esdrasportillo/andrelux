(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/esdras/repos/todoApp/js/fireapi.js":[function(require,module,exports){


module.exports = {

  mount: function(_this){
  	var firebaseRef = new Firebase('https://ReactFireTodoApp.firebaseio.com/items/');
    _this.bindAsArray(firebaseRef.limitToLast(25), 'items');
  },

  remove: function(key){
    var firebaseRef = new Firebase('https://ReactFireTodoApp.firebaseio.com/items/');
    firebaseRef.child(key).remove();
  },

  addText: function(_this, textToAdd){
    _this.firebaseRefs['items'].push({ text: textToAdd });
  }
}

},{}],"/Users/esdras/repos/todoApp/js/todoAppFirebaseImplicit.js":[function(require,module,exports){
var actions = require('./fireapi.js');

var TodoList3 = React.createClass({displayName: "TodoList3",
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        React.createElement("li", {key:  index }, 
           item.text, 
          React.createElement("span", {onClick:  _this.props.removeItem.bind(null, item['.key']), 
                style: { color: 'red', marginLeft: '10px', cursor: 'pointer'}}, 
            "X"
          )
        )
      );
    };
    return React.createElement("ul", null,  this.props.items.map(createItem) );
  }
});

var TodoApp3 = React.createClass({displayName: "TodoApp3",
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      text: ''
    };
  },

  componentWillMount: function() {
    actions.mount(this);
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  removeItem: function(key) {
    actions.remove(key);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      actions.addText(this, this.state.text);
      this.setState({
        text: ''
      });
    }
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(TodoList3, {items:  this.state.items, removeItem:  this.removeItem}), 
        React.createElement("form", {onSubmit:  this.handleSubmit}, 
          React.createElement("input", {onChange:  this.onChange, value:  this.state.text}), 
          React.createElement("button", null,  'Add #' + (this.state.items.length + 1) )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(TodoApp3, null), document.getElementById('todoApp3'));

},{"./fireapi.js":"/Users/esdras/repos/todoApp/js/fireapi.js"}]},{},["/Users/esdras/repos/todoApp/js/todoAppFirebaseImplicit.js"]);
