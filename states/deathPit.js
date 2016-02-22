var db = require('../db')
var get = db.get
var set = db.set


var Outside = function(game){
  this.game = game
}
Outside.prototype = {
  preload: function(){
  },
  create: function(){

  }
}


module.exports = Outside