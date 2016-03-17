var db = require('../db')
var get = db.get
var set = db.set
var inc = db.inc
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

///////////////////////////////////////////////////////////
    this.game.musician.change('daySwitch')

/////////////////////////////////////////////
    // DEBUG
    // this.game.musician.change('daySwitch')
    // this.game.musician.fadeIn()
/////////////////////////////////////////





    var day = get('currentDay')


    var bg = this.game.add.sprite(-65, -65, 'dsbg' + (day + 1));
    bg.scale.setTo(9, 12)

        bg.animations.add('slow', [0, 1, 2, 3], 1, true);



    bg.animations.play('slow');

    var dates = [null, 'DAY ONE', 'Sep. 15, \'83, midnight!', "9/23/83 04:22:37", 'September 26, 1983...']
    var descroppies = [null, 'HELLO\nYOU HAVE BEEN ASSIGNED TO STATION L-A-V_07\nYOU WILL PROVIDE ENGINEERING SUPPORT TO THE TECNICAL(sp?) APPARATUS CURRENTLY OPERATING ON SITE\nREMEMBER YOUR TRAINING!',
    'you have lost track of the days. weeks. how long has it been? months. you could count the pages in your journal. did they say when your replacement is supposed to arrive? nothing to do but wait',
    'you awaken before sunrise (not thhat you can see the sun). you cannot recall what you did yesterday, everything blurs into a smooth surface of time space upon which you glide aimlessly.',
    'just another day, ordinary average, nothing unusual about it...']

    var title = dates[day]
    var descroppie = descroppies[day]
// TODO: REMOVE THIS
    if (get('isTrappedInTheDeathPitForever') ){
        title = 'AGONY AND PAIN'
        descroppie = 'you are trapped in the death pit forever, remember? how could you ever forget?!?!?!'
        this.game.state.start("DeathPit")
    }


    var confirmotron = [null, 'I DO! i mean.. I WILL!', 'sheesh ok wow','i wonder how many days there are to this game and if anything else happens besides writing poetry and inspecting items :/', 'that is a bit alarming'][day]
    if (get('isTrappedInTheDeathPitForever')) confirmotron = 'i suffer'


    var instruct = this.game.add.text(50, 220, title, { fontSize: '30px', fill: '#FFF' });
    var descrip = this.game.add.text(50, 320, descroppie, { fontSize: '30px', fill: '#FFF', wordWrap: true, wordWrapWidth: 450  });

    var yay  = this.game.add.text(50, 690, confirmotron, { fontSize: '70px', fill: '#08D', wordWrap: true, wordWrapWidth: 300 });
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





    if (get('isTrappedInTheDeathPitForever') ){
        that.game.state.start("DeathPit")
    } else if (day == 1) {
            inc('currentDay')
           that.game.state.start("DaySwitch")
        } else {
            that.game.state.start("Bunker")
        }

    }, this);


    var bigBg = this.game.add.sprite(-900, -1100, 'damage');
    bigBg.scale.setTo(50,58)
    // bigBg.anchor.setTo(0.5, 0.5);
    bigBg.alpha = 1;
    var that = this
    var t = this.game.add.tween(bigBg).to( { alpha: 0 }, 900, Phaser.Easing.Linear.None, false, 0, 200, 1).start();
    t.onLoop.add(function () {
        console.log('looped!')
        // t.onLoopCallback(function(){console.log('Y?')})
        that.game.tweens.remove(t)
      bigBg.destroy()




      // OHHH MAYBE DROP THE PLAYER IN HERE?

    }, this)

  }
}


module.exports = DaySwitch