var get = require('../db').get
var TIME_LEFT = 5
var endings = {
  gameOver1: {
    img: '',
    description: 'you unplugged your own battery pack. you are not due to be relieved for another 17 years, so by the time someone will come to plug you back in you will have rusted into a useless pile of parts. also the world ends ' + TIME_LEFT + ' days from now because you were asleep at the wheel. OOPS.' ,
    name: 'EVERYTHING GOES DARK AND SILENT...'
  }
}

var gameOverScreen = function(game){
  this.game = game
}
gameOverScreen.prototype = {
  create: function(){
    // SEE IF THE PLAYER HAS DATA? FOR WHICH TYPE OF ENDING?
    console.log('yo')
    var titleBG = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "backsplash")
    titleBG.tint = 7557180



  }
}
module.exports = gameOverScreen