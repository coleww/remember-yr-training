var db = require('../db')
var get = db.get
var set = db.set
var inc = db.inc

var ends = [null, 'u unplugged yr own battery']

var Reset = function(game){
  this.game = game
}
Reset.prototype = {
  preload: function(){
  },
  create: function(){
    var gameOver = get('gameOver')
    var reason = ends[gameOver]
    var playCount = get('playCount')
    inc('playCount', 1)
//kinda useless now? oh well w/e
    // gather all the poem and twine data for this playthrough? and then deletes it.
    //

    set('currentDay', 1)
    this.game.state.start("TitleScreen")
  }
}


module.exports = Reset