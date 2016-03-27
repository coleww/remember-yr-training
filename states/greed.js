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



document.body.style.backgroundImage = "url('assets/sprites/bgs/mrsbluesky.png')"
    this.score = 0
    this.inDialog = true
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.speediness = 0.25
    this.game.musician.change('outside')


    var sky = this.game.add.sprite(0, 0, 'bluesky');
    sky.scale.setTo(2, 5)

    //  We're going to be using physics, so enable the Arcade Physics system

    //  A simple background for our this.game


    this.player = this.game.add.sprite(300, 600, 'dude');

          this.player.scale.setTo(1.5,1)


    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;



    this.game.add.sprite(170, 566, 'weedbag')


    var ground = this.platforms.create(125, this.game.world.height - 340, 'crumbledplatform');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(6, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    this.game.world.bringToTop(ground)


    var tube = this.platforms.create(300, this.game.world.height - 420, 'pipe');
    tube.body.immovable = true


    var sike1 = this.platforms.create(53, this.game.world.height - 500, 'crumbledplatform');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike1.scale.setTo(2, 0.75);

sike1.body.immovable = true
      var sike2 = this.platforms.create(423, this.game.world.height - 500, 'crumbledplatform');
sike2.body.immovable = true
    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike2.scale.setTo(2, 0.75);

      var sike3 = this.platforms.create(185, this.game.world.height - 650, 'crumbledplatform');
sike3.body.immovable = true
    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike3.scale.setTo(3.333, 0.25);











    // The this.player and its settings


       this.coins = this.game.add.group();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.inDialog = false
    this.makeCoins()
    this.scoreText = this.game.add.text(16, 16, 'MONEY: 0', { fontSize: '32px', fill: '#000' });


    var that = this
    this.game.musician.playFX('wooshair')
    // PLAY A WHOOOSH SOUND HERE!?
    var inty = window.setInterval(function () {
      that.player.y -= 15



      if (that.player.y <= 430) {
        clearInterval(inty)
        that.inDialog = false
          //  We need to enable physics on the that.player
          that.game.physics.arcade.enable(that.player);
              //  that adjusts the collision body size to be a 100x50 box.
          //  50, 25 is the X and Y offset of the newly sized box.

          that.player.body.setSize(10, 43, 20, 0);

          //  that.Player physics properties. Give the little guy a slight bounce.
          that.player.body.bounce.y = 0.2;
          that.player.body.gravity.y = 300;
          that.player.body.collideWorldBounds = true;

          //  Our two animations, walking left and right.
          that.player.animations.add('left', [4, 5, 6, 7], 3, true);
          that.player.animations.add('right', [8, 9, 10, 11], 3, true);
          that.player.animations.add('up', [12, 13, 14, 15], 3, true);
          that.player.animations.add('down', [0, 1, 2, 3], 3, true);

    that.game.world.bringToTop(that.player)
      }










    }, 100)




    },
    collectCoin: function (player, coin) {

        // Removes the coin from the screen
      // PLAY A SOUND TOO!
      if (!coin.collected) {
    this.game.musician.playFX('kaching')
        coin.animations.stop('spinny')
        coin.frame = 0
        coin.collected = true
          if (this.mockingText) this.mockingText.destroy()
          var tween = this.game.add.tween(coin.scale).to({x:0}, 150).start();
          this.game.add.tween(coin).to({y:50}, 150).start();
          tween.onComplete.add(function () {
            coin.kill();
          }, this);


          //  Add and update the score
          this.score += 10;
          this.scoreText.text = 'MONEY: ' + this.score;
          if (this.score % 70 == 0) {
    this.game.musician.playFX('cackle')
            this.makeCoins()
            this.mockingText = this.game.add.text(50, 56, ['HAHAHAHA GREEDY HUMAN ENJOY YR RICHES!', 'WHAT U GONNA DO WITH ALL THAT MONEY?', 'THIS IS WHAT YOU GET FOR BEING GREEDY '][~~(Math.random() * 3)], { fontSize: '32px', fill: '#000', font: 'Impact', wordWrap: true, wordWrapWidth: '500px' });
            // write text to the screen about how this is futile
          }
      }

    },
    makeCoins: function () {
      // play a sound like money dumping!

      //  We will enable physics for any coin that is created in this group
      this.coins.enableBody = true;

      //  Here we'll create 12 of them evenly spaced apart
      for (var i = 0; i < 12; i++)
      {
          //  Create a coin inside of the 'coins' group
          var coin = this.coins.create(i * 70, 0, 'the_coin_spinny');
          coin.animations.add('spinny')
          coin.animations.play('spinny', 3, true)
          //  Let gravity do its thing
          coin.body.gravity.y = 300;

          //  This just gives each coin a slightly random bounce value
          coin.body.bounce.y = Math.random() * 0.2;
      }
    },

    openDialog: function (thing) {
      var that = this
      drawMenu(this.game, 'parch', thing, function (menu, obj) {
          // urggggh just put a gigantic case switch here for the few things that have fx?
          that.inDialog = false
              menu.destroy()
      }, function (thing) {
          that.inDialog = false
      })
    },

    interactIfTouchingThing: function () {
      if (!this.inDialog && this.player.x > 120 && this.player.x < 215) {
          this.inDialog = true
            this.openDialog({name: 'bag of mysterious herbs', description: 'o_o O_o o_0 o_o ._. the herbs tell you to quit yr job and take a leap. i think u should listen.', sprite: 'weedbag', yes: 'nice'})

      }


    },
    update: function () {
              this.game.physics.arcade.collide(this.player, this.platforms);
                      this.game.physics.arcade.collide(this.coins, this.platforms);
                      this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

      if (!this.inDialog){
                        if (!this.ended && this.player.y > 600 ) {
                          //
                          this.ended = true
                          var bg = this.game.add.sprite(0, 0, 'black');
                          bg.scale.setTo(5, 7)
                          // bg.anchor.setTo(0.5, 0.5);
                          bg.alpha = 0;
                          var that = this
                          var t = this.game.add.tween(bg).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, false, 0, 0, 1).start();
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
                            this.player.body.velocity.x = -150;
                            if (this.player.body.touching.down) {
                              this.player.animations.play('left');
                            } else {
                              this.player.animations.stop()
                              if (Math.random() < 0.1) this.player.frame = [5, 7][~~(Math.random() * 2)]
                            }
                        } else if (this.cursors.right.isDown) {
                            xDir = 5
                            //  Move to the right
                            this.player.body.velocity.x = 150;
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
                            this.game.musician.playFX('pew')
                          this.player.body.velocity.y = -340;


                        }
            }
    }

}


module.exports = Outside