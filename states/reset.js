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
    var currentDay = get('currentDay')
    var gameDay = ['9/15/83/', "9/23/83/", '9/26/83/'][currentDay - 1]  // i think?
    // GET the date in game based on users current time and whatnot
    var d = new Date();
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

    var title = playCount + ': ' + reason + ' at ' + gameDay + time













    this.game.state.start("TitleScreen")
  }
}


module.exports = Reset