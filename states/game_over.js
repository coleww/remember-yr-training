var get = require('../db').get
var TIME_LEFT = 5
var endings = {
  gameOver1: {
    sprite: 'black',
    scale: [5, 7],
    description: 'you unplugged your own battery pack. good job. by the time your successor arrives to relieve you, the rust will have taken over and a small family of rodents will have made a nest in yr belly. you are cast into a junkyard. years later an artist will find your rotting hulk and incorporate into an assemblage piece. they say their work is at the intersection of technology and absence, but the critics panned the work you now live in as "banksy-esque"' ,
    name: 'EVERYTHING GOES DARK AND SILENT...',
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
    var whatHappened  = this.game.add.text(50, 150, ending.name, { fontSize: '25px', fill: '#900' });
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