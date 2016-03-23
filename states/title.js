var titleScreen = function(game){
  this.game = game
}
var get = require('databae').get
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


    var playButton = game.add.button(game.width / 2, game.height - 370, "playbutton", this.startGame)
    playButton.anchor.set(0.5)

    console.log(get('poemCount'))
    if (get('poemCount')) {
        var poemButton = game.add.button(game.width / 2, game.height - 150, "boxen", this.showPoems)
        poemButton.anchor.set(0.5)
        poemButton.scale.setTo(3)







    }
    // PROBABLY a continue button i guess?
    // ALSO a screen to see yr saved poems? BUT ONLY if u beat the game already!
  },
  startGame: function(){
    this.game.state.start("DaySwitch")
  },
  showPoems: function(){
    this.game.state.start("chapbook")
    var poems = []
    for (var i = 0; i < get('poemCount'); i++) {
      var poem = get('poem' + i)
      poems.push(poem)
    }


    // argggggh this is gonna be such a pain to build... :<
  }
}
module.exports = titleScreen
