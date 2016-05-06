var db = require('../db')
var get = db.get
var set = db.set
var inc = db.inc
var Ending = function(game){
  this.game = game
}


Ending.prototype = {
//   modColor: function  () {
//   console.log('um', this.theColor)
//   this.theColor += (~~(Math.random() * 2.5) - 1)
//   if (this.theColor < 0) this.theColor = 0
//   if (this.theColor > 9) this.theColor = 9
//   console.log("WTF", '#53' + this.theColor)
//   return '#63' + this.theColor
// },
  create: function() {
    // if (this.jetPacked) {
    //   this.jetPacked = false
    //     this.game.state.restart()
    // }
    // alert('the end')
    this.game.musician.modulupdate('poetry', {bpm: 125,
      key: {
        tonic: "F3",
        scale: "minor"
      }
    })
document.body.style.backgroundImage = "url('assets/sprites/wall.png')"

    var bg = this.game.add.sprite(-65, -65, 'dsbg4');
    bg.scale.setTo(9, 12)

        bg.animations.add('slow', [0, 1, 2, 3], 1, true);



    bg.animations.play('slow');
    this.game.add.text(100, 250, 'THE END', { fontSize: '100px', fill: '#FFF' });
    this.counter = 0
  },

  update: function() {
    // erm, on a timer, updagte a text thing with the next block of credits text
    // then reset the game
    // but wth the poem exporter option available
    this.counter++
    set('beatTheGame', true)
    if (this.counter > 1000) {
        this.game.state.start('TitleScreen')
    }
  }

}


module.exports = Ending





