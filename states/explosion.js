
// some lil thangs:

    // var h = this.game.add.sprite(370, 366, 'lilgrass')
    // h.scale.setTo(5)
    // var j = this.game.add.sprite(370, 566, 'anotherbigtreee')
    // j.scale.setTo(1)


// draw the city skyline, etc.
// if they flick the switch, everything explodes, gj end of world
function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}
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


    this.score = 0
    this.inDialog = true
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.speediness = 0.25
    this.game.musician.change('outside')


    var sky = this.game.add.sprite(0, 0, 'redmtn');
    sky.scale.setTo(2.5, 7)
 var bldng = this.game.add.sprite(0, 0, 'bldng');
    bldng.scale.setTo(3.5, 7)










    //  We're going to be using physics, so enable the Arcade Physics system
        var clouds = this.game.add.sprite(0, 600, 'nattyclouds');
    clouds.scale.setTo(1.3, 2)
    // clouds.alpha = 0.9
    //  A simple background for our this.game




    var nuke = this.game.add.sprite(-90, -200, 'nuke');
    nuke.scale.setTo(0.665, 1)
    nuke.alpha = 0
    var that = this
    var done = false
    setTimeout(function () {
      var intybro = that.explodinate()
      setInterval(function () {
       if (nuke.alpha < 1) {
          nuke.alpha += 0.04
          that.world.bringToTop(nuke)
        } else if (!done) {
          done = true
          setTimeout(function () {
            clearInterval(intybro)
            that.game.state.start('ending')
          }, 5000)
        }
      }, 500)
    }, 2000)



    this.player = this.game.add.sprite(20, 700, 'dude');

          this.player.scale.setTo(1.5,1)


    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;





    var ground = this.platforms.create(25, this.game.world.height - 140, 'dirt');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(1.25, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    this.game.world.bringToTop(ground)


    var tube = this.platforms.create(20, this.game.world.height - 220, 'pipe');
    tube.body.immovable = true







    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.inDialog = false



    var that = this
    this.game.musician.playFX('wooshair')
    // PLAY A WHOOOSH SOUND HERE!?
    var inty = window.setInterval(function () {
      that.player.y -= 15



      if (that.player.y <= 600) {
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

explodinate: function () {
    var explodinations = {
        evil: ['fireball', 'fireblast', 'flame'],
        trippy: ['rainbow1', 'rainbow2', 'unicorn']
    }

    var sprites = explodinations['evil']
    var count = 0
    var that = this
    // if (type == 'trippy'){
        // this.game.plugins.screenShake.setup({ //if need to replace default plugin settings
        // shakeX: true,
        // shakeY: false
        // });
        // this.game.plugins.screenShake.shake(1000)
    // }
    var interv = setInterval(function () {
        count++
        var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 3)
        exploding.angle = (Math.random() * 360) - 180
        if (count > 50) {
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 4)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 100) {
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 5)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 150){
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 6)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 250) {
            var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 7)
        exploding.angle = (Math.random() * 360) - 180
        }

    }, 50)
return interv
  },
    update: function () {
              this.game.physics.arcade.collide(this.player, this.platforms);
                      this.game.physics.arcade.collide(this.nana, this.platforms);
                      this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

      if (!this.inDialog){

          if (!this.jumped && this.player.y > 500 ) {
            this.jumped = true
                              this.game.add.text(50, 56, 'THE WORLD ENDS BECAUSE YOU STARTED A WAR, GOOD JOB BUDDY.', { fontSize: '32px', fill: '#000', font: 'Impact', wordWrap: true, wordWrapWidth: '300' });
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
                          this.player.body.velocity.y = -140;


                        }
            }
    }

}


module.exports = Outside