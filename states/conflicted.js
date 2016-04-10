var db = require('../db')
var get = db.get
var set = db.set
var dec = db.dec
var inc = db.inc
var push = db.push
var remove = db.remove
var drawMenu = require('../drawMenu')

var Outside = function(game){
  this.game = game
}
Outside.prototype = {
  preload: function(){
  },
  create: function(){
    console.log('um wat')

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.score = 0
    this.inDialog = true

document.body.style.backgroundImage = "url('assets/sprites/background_32.png')"
    this.speediness = 0.25

    // TODO: update this to be "flavorful"
    this.game.musician.modulupdate('outside', {bpm: 420,
      key: {
        tonic: "D3",
        scale: "pentMin"
      }
    })

    var sky = this.game.add.sprite(0, 0, 'bg32');
    sky.scale.setTo(2, 8)

    //  We're going to be using physics, so enable the Arcade Physics system

    //  A simple background for our this.game

console.log('making plats')

    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;





    var ground = this.platforms.create(125, this.game.world.height - 340, 'dirt');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(1.25, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;



    var tube = this.platforms.create(120, this.game.world.height - 420, 'pipe');
    tube.body.immovable = true


    var sike1 = this.platforms.create(453, this.game.world.height - 500, 'crumbledplatform');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike1.scale.setTo(2, 0.75);

sike1.body.immovable = true
// here

console.log('made them plats')
var tree = this.game.add.sprite(455, this.game.world.height - 545, 'spooky_trees');
tree.scale.setTo(1.35, 1)




this.nana = this.game.add.sprite(465, -100, 'spinning_banana');
this.game.physics.arcade.enable(this.nana);
this.nana.enableBody = true
    this.nana.animations.add('spinny')
          this.nana.animations.play('spinny', 3, true)
          //  Let gravity do its thing
          this.nana.body.gravity.y = 30;

          //  This just gives each this.nana a slightly random bounce value
          this.nana.body.bounce.y = Math.random() * 0.5 + 0.5;

    // The this.player and its settings



    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.inDialog = false



    this.player = this.game.add.sprite(120, 600, 'dude');

          this.player.scale.setTo(1.5,1)
          this.game.world.bringToTop(this.platforms)
    var that = this
    this.game.musician.playFX('wooshair')
    // PLAY A WHOOOSH SOUND HERE!?
    var inty = window.setInterval(function () {
      that.player.y -= 15



      if (that.player.y <= 430) {
        console.log("BOP")
        clearInterval(inty)
        that.inDialog = false
          //  We need to enable physics on the that.player
          that.game.physics.arcade.enable(that.player);
              //  that adjusts the collision body size to be a 100x50 box.
          //  50, 25 is the X and Y offset of the newly sized box.

          that.player.body.setSize(10, 43, 20, 0);

          //  that.Player physics properties. Give the little guy a slight bounce.
          that.player.body.bounce.y = 0.2;
          that.player.body.gravity.y = 100;
          that.player.body.collideWorldBounds = false;

          //  Our two animations, walking left and right.
          that.player.animations.add('left', [4, 5, 6, 7], 3, true);
          that.player.animations.add('right', [8, 9, 10, 11], 3, true);
          that.player.animations.add('up', [12, 13, 14, 15], 3, true);
          that.player.animations.add('down', [0, 1, 2, 3], 3, true);

    that.game.world.bringToTop(that.player)
      }










    }, 100)




    },


    update: function () {
              this.game.physics.arcade.collide(this.player, this.platforms);
                      this.game.physics.arcade.collide(this.nana, this.platforms);
                      this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

      if (!this.inDialog){

          if (!this.jumped && this.player.y > 500 ) {
            this.jumped = true
                              this.game.add.text(50, 56, 'YOU FLOAT OFF LIKE A SHOPPING BAG CAUGHT IN A BREEZE', { fontSize: '32px', fill: '#000', font: 'Impact', wordWrap: true, wordWrapWidth: '300' });
}

                        if (!this.ended && this.player.y > 700 ) {
                          //        this.game.add.text(50, 56, 'YOU FLOAT OFF LIKE A SHOPPING BAG CAUGHT IN A BREEZE', { fontSize: '32px', fill: '#000', font: 'Impact', wordWrap: true, wordWrapWidth: '300px' });



                          this.ended = true
                          var bg = this.game.add.sprite(0, 0, 'black');
                          bg.scale.setTo(5, 7)
                          // bg.anchor.setTo(0.5, 0.5);
                          bg.alpha = 0;
                          var that = this
                          var t = this.game.add.tween(bg).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, false, 0, 0, 1).start();
                          t.onLoop.add(function () {
                              console.log('looped!')
                              // t.onLoopCallback(function(){console.log('Y?')})
                              that.game.tweens.remove(t)

                            bg.destroy()
                            that.game.state.start('ending')

                            // OHHH MAYBE DROP THE PLAYER IN HERE?

                          }, this)
                          // OH! THIS IS HOW U GET TO THE CREDITS!
                          // u fell off the dang thing
                          // TODO: what happen if u fall off the thing?
                        }





                 if (this.cursors.left.isDown) {
                            //  Move to the left
                            xDir = -5
                            this.player.body.velocity.x = -100;
                            if (this.player.body.touching.down) {
                              this.player.animations.play('left');
                            } else {
                              this.player.animations.stop()
                              if (Math.random() < 0.1) this.player.frame = [5, 7][~~(Math.random() * 2)]
                            }
                        } else if (this.cursors.right.isDown) {
                            xDir = 5
                            //  Move to the right
                            this.player.body.velocity.x = 100;
                            if (this.player.body.touching.down) {
                              this.player.animations.play('right');
                            } else {
                              this.player.animations.stop()
                              if (Math.random() < 0.1) this.player.frame = [11, 9][~~(Math.random() * 2)]
                            }
                        } else if (this.cursors.down.isDown && this.player.body.touching.down) {
                            //  PLAYER IS PRESSING DOWN, TRYING TO ACTIVATE SOMETHING?
                            // figure out what thing they are touching/near? and then openDialog(thatThingYouDo)
                            this.player.animations.stop();
                            this.player.frame = 12
                            this.player.body.velocity.x = 0
                            console.log(this.player.x, this.player.y)
                            this.interactIfTouchingThing(this.player.x, this.player.y)
                        } else {
                          var goingUp = !this.player.body.velocity.x
                          var goingRight = this.player.body.velocity.x > 0
                          var goingLeft = !goingRight
                          if (this.player.body.touching.down) {
                            //  Stand still
                            this.player.animations.stop();

                            this.player.body.velocity.x = 0
                          } else {
                            if (goingUp) {
                              // ???? almost never happens
                            } else {
                              this.player.body.velocity.x += goingRight ? -1 : 1
                            }
                          }
                        }

                        //  Allow the this.player to jump if they are touching the ground.
                        if (this.cursors.up.isDown && this.player.body.touching.down) {
                            this.game.musician.playFX('slowpew')
                          this.player.body.velocity.y = -50;


                        }
            }
    }

}


module.exports = Outside