
var Firebase = require("firebase");

module.exports = {

  mount: function(_this, callback){
    console.log("kkkk", _this)
  	var firebaseRef = new Firebase('https://ReactFireTodoApp.firebaseio.com/items/');
    _this.bindAsArray(firebaseRef.limitToLast(25), 'items');
    if (callback) {
      callback('succeed');
    }
  },

  remove: function(key){
    var firebaseRef = new Firebase('https://ReactFireTodoApp.firebaseio.com/items/');
    firebaseRef.child(key).remove();
  },

  addText: function(_this, textToAdd){
    _this.firebaseRefs['items'].push({ text: textToAdd });
  }
}