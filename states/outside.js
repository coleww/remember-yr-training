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
    alert('we outside')
    // greed: u get to collect worthless coins forever
    // fight: u get to kill helpless creatures forever
    // nature: u get to chill in a forest with sweet animal NPCs
  }
}


module.exports = Outside