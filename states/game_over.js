var gameOverScreen = function(game){
  this.game = game
}
gameOverScreen.prototype = {
  create: function(){
    var titleBG = this.game.add.tileSprite(0, 0, game.width, game.height, "backsplash")
    titleBG.tint = 7557180

  }
}
module.exports = gameOverScreen