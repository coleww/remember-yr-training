var titleScreen = function(game){
  this.game = game
}

titleScreen.prototype = {
  create: function(){
    var game = this.game
    var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash")
    titleBG.tint = 7557180
    document.body.style.background = "#"+titleBG.tint.toString(16)
    var title = game.add.image(game.width / 2, 210, "title")
    title.anchor.set(0.5)
    game.add.bitmapText(game.width / 2, 480 , "font", "=^.^=", 48).anchor.x = 0.5
    var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame)
    playButton.anchor.set(0.5)
    var tween = game.add.tween(playButton).to({width: 220, height:220}, 1500, "Linear", true, 0, -1)
    tween.yoyo(true)
    // PROBABLY a load game button i guess?
    // ALSO a screen to see yr training manuals?
  },
  startGame: function(){
    this.game.state.start("Bunker")
  }
}
module.exports = titleScreen
