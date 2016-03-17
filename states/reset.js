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



    // gather all the poem and twine data for this playthrough? and then deletes it.
    //
    var poems = []
    for (var i = 0; i < get('poemCount'); i++) {
      var poem = get('poem' + i)
      poems.push(poem)
    }

    set('play' + playCount, {name: title, poems: poems, alignment: get('alignment')})
    set('currentDay', 1)
    this.game.state.start("TitleScreen")
  }
}


module.exports = Reset