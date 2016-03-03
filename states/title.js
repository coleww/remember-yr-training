var titleScreen = function(game){
  this.game = game
}

titleScreen.prototype = {
  create: function(){
    var game = this.game
    // game.musician.change('title')
    var titleBG = game.add.sprite(-65, -65,  "dsbg0")
    titleBG.scale.setTo(9, 12)
titleBG.animations.add('slow', [0, 1, 2, 3], 1, true);



    titleBG.animations.play('slow');
    var title = game.add.image(game.width / 2, 270, "title")
    title.anchor.set(0.5)


    // PUT CONTROLS DESCIRPTION HERE-ISH?
    // left/right to walk, up to jump, down to inspect. click UNDErLINED text to use
    // var poems = game.add.text(game.width / 2, game.height - 50, "POETRY", this.startGame)


    var playButton = game.add.button(game.width / 2, game.height - 250, "playbutton", this.startGame)
    playButton.anchor.set(0.5)
    var tween = game.add.tween(playButton).to({width: 220, height:220}, 1500, "Linear", true, 0, -1)
    tween.yoyo(true)
    // PROBABLY a continue button i guess?
    // ALSO a screen to see yr saved poems? BUT ONLY if u beat the game already!
  },
  startGame: function(){
    this.game.state.start("DaySwitch")
  }
}
module.exports = titleScreen
