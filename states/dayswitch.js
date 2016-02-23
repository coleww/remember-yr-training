var db = require('../db')
var get = db.get
var set = db.set

// construct markov poet barrier maker thing based on their choices or lack thereof
// save which lines they touch
// make enemies? explosions? slowly rising fire?
// lol put random stuff to inspect along the way

var DaySwitch = function(game){
  this.game = game
}
DaySwitch.prototype = {
  preload: function(){
  },
  create: function(){

    var bg = this.game.add.sprite(0, 0, 'black');
    bg.scale.setTo(5, 7)
    var day = get('currentDay')

    var dates = ['DAY ONE', 'Sep. 15, 1983, midnight', "9/23/83 04:22:37", 'September 26, 1983...']
    var descroppies = ['HELLO\nYOU HAVE BEEN ASSIGNED TO STATION L-A-V_07\nYOU WILL PROVIDE ENGINEERING SUPPORT TO THE TECNICAL(sp?) APPARATUS CURRENTLY OPERATING ON SITE\nREMEMBER YOUR TRAINING!',
    'you have lost track of the days. weeks. how long has it been? months. you could count the pages in your journal. did they say when your replacement is supposed to arrive? nothing to do but wait',
    'you awaken before sunrise (not thhat you can see the sun). you cannot recall what you did yesterday, everything blurs into a smooth surface of time space upon which you glide aimlessly.',
    'BEEP BEEP BEEP BEEP BEEP *explosion* WEEEEOOOOOO WEEEOOOO WEEEEOOO WEEEEEOOOO *steam releasing* BZZZZZZZZZZZZZZZZT *cash register sound*']

    var title = dates[day]
    var descroppie = descroppies[day]
    var instruct = this.game.add.text(50, 220, title, { fontSize: '30px', fill: '#FFF' });
    var descrip = this.game.add.text(50, 320, descroppie, { fontSize: '30px', fill: '#FFF', wordWrap: true, wordWrapWidth: 450  });

    var yay  = this.game.add.text(50, 690, 'I DO!', { fontSize: '70px', fill: '#08D' });
    yay.inputEnabled = true;
    yay.underline = true
    var that = this
    this.game.musician.fadeIn()
    // ANNOYING
    // this.game.musician.playFX('alclock')
    yay.events.onInputDown.add(function  (thing) {
        // RUN THE STUFF!
        instruct.destroy()
        descrip.destroy()
        yay.destroy()
        bg.destroy()
        set('currentDay', ++day)
        that.game.state.start("Bunker")
    }, this);


  }
}


module.exports = DaySwitch