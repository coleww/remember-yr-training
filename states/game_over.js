var get = require('../db').get
var TIME_LEFT = 5
var endings = {
  gameOver1: {
    sprite: 'black',
    scale: [5, 7],
    description: 'you unplugged your own battery pack. good job. by the time your successor arrives to relieve you, the rust will have taken over and a small family of rodents will have made a nest in yr belly. you are cast into a junkyard. years later an artist will find your rotting hulk and incorporate into an assemblage piece. they say their work is at the intersection of technology and absence, but the critics panned the work you now live in as "banksy-esque"' ,
    name: 'EVERYTHING GOES DARK AND SILENT...',
    song: 'dead'
  },
  gameOver3: {
    sprite: 'ecto',
    scale: [5, 7],
    description: 'you have taken fatal damage, which is an incredible feat in a game that does not even really have enemies or obstacles of any sort. Congratulations!' ,
    name: 'YOU WAKE UP, FEELING FLOATY AND INCORPOREAL, AND GAZE DOWN AT YR LIFELESS BODY',
    song: 'dead'
  },
  gameOver451: {
    sprite: 'flame',
    scale: [5, 7],
    description: 'you transformed into the fire lord Rayon, but did not have the force of will to control your powers and ended up destroying the station and trapping yourself under miles of rock. as an immortal pseudo-god, you lay immovable and trapped here until nuclear war destroys the earth and you are free to return to your home on the sun. in the meantime you have this song stuck in yr head:',
    name: 'X_X TOTAL BURNINATION X_X',
    song: 'dead'
  },
  gameOver420: {
    sprite: 'son',
    scale: [5, 7],
    description: 'you transform into a shimmering power goddess, but also lose grip on reality. where you even playing a game? is any of this real?',
    name: 'X_X WHOA, JUST LIKE, WHOA X_X',
    song: 'dead'
    },
    // not actual a game over screen, u just get stuck in the death pit
  // gameOver666: {
  //   sprite: 'portal',
  //   scale: [5, 7],
  //   description: 'you unleash a portal to the shadow world and are consumed by the darkness. way to go.',
  //   name: '☠ X_X ☠',
  //   song: 'dead'
  //   },
  gameOver999: {
    sprite: 'clock',
    scale: [5, 7],
    description: 'you took too long to exit the bunker and it exploded with you in it. also by pressing the button u started a nuclear war that destroys the earth. good job destroying all the humans, comrade!',
    name: 'FOR GREAT ROBOT JUSTICE!',
    song: 'dead'
    }
}

var gameOverScreen = function(game){
  this.game = game
}
gameOverScreen.prototype = {
  create: function(){
    // SEE IF THE PLAYER HAS DATA? FOR WHICH TYPE OF ENDING?
    console.log('yo')









    var ending = endings['gameOver' + get('gameOver')]
    var bg = this.game.add.sprite(0, 0, ending.sprite);
    bg.scale.setTo(ending.scale[0], ending.scale[1])
    var whatHappened  = this.game.add.text(50, 150, ending.name, { fontSize: '25px', fill: '#900', wordWrap: true, wordWrapWidth: 300  });
    var confirm  = this.game.add.text(50, 270, ending.description, { fontSize: '20px', fill: '#08D', wordWrap: true, wordWrapWidth: 500 });
    confirm.inputEnabled = true;
    var that = this
    //REFACTOR THISSSSSSSSSSS
    confirm.events.onInputDown.add(function  (thing) {
        // RUN THE STUFF!
        this.inDialog = false
        bg.destroy()
        whatHappened.destroy()
        confirm.destroy()
        that.game.state.start("Reset")// this will save the data to a thing
    }, this);

  }
}
module.exports = gameOverScreen