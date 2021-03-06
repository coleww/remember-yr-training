var db = require('../db')
var get = db.get
var set = db.set
var dec = db.dec
var inc = db.inc
var push = db.push
var remove = db.remove
var drawMenu = require('../drawMenu')
var rc = require('randomcolor')
var friends = [
{sprite: "spinning_banana", scale: [1,1], animated: true, name: 'nana'},
{sprite: "horse", scale: [1,1.5], animated: true, name: 'horse_ebooks'},
{sprite: "cow", scale: [3,3], name: 'cow'},
{sprite: "drag", scale: [1,1], name: 'dragon bb'},
{sprite: "kiwi", scale: [1,1], animated: true, name: 'kiwi fren'},
{sprite: "owl", scale: [5,5], animated: true, name: 'The Lavender Owl'},
{sprite: "penguin", scale: [1,1], name: 'pingu'},
{sprite: "catone", scale: [1,1], animated: true, name: '=^.^='},
{sprite: "rabbit", scale: [6,5], animated: true, name: 'brrrrrrrrrrr'},
{sprite: "spritesheet", scale: [1,1], animated: true, name: 'interdimensional pupper'}
]
var poss = [
{x: 600, y: 300},
{x: 150, y: 300},
{x: 325, y: 300},
{x: 425, y: 300},
{x: 500, y: 500},
{x: 300, y: 500},
{x: 500, y: 400},
{x: 300, y: 400},
{x: 500, y: 600},
{x: 300, y: 600}

]
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
var Outside = function(game){
  this.game = game
}
Outside.prototype = {
  preload: function(){
  },
  create: function(){

document.body.style.backgroundImage = "url('assets/sprites/bgs/exterior-parallaxBG1.png')"

    this.score = 0
    this.inDialog = true
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.speediness = 0.25

    this.canMove = true
    // TODO: update this to be "flavorful"
    this.game.musician.modulupdate('outside', {bpm: 275,
      key: {
        tonic: "E3",
        scale: "major"
      }
    })


    var sky = this.game.add.sprite(0, 0, 'nattysky');
    sky.scale.setTo(1.75, 3.5)

        var clouds = this.game.add.sprite(0, 330, 'nattyclouds');
    clouds.scale.setTo(1.3, 2)
    clouds.alpha = 0.6


        var mtns = this.game.add.sprite(0, 250, 'nattymtns');
    mtns.scale.setTo(1.3, 3.2)
    mtns.alpha = 0.5

    //  We're going to be using physics, so enable the Arcade Physics system

    //  A simple background for our this.game


        var light = this.game.add.sprite(0, 0, 'nattylight');
    light.scale.setTo(3, 2)
    light.alpha = 0.3

            var duo = this.game.add.sprite(215, 360, 'nattyduo');
    duo.scale.setTo(1.5, 2.5)
    duo.alpha = 0.9

            var fg = this.game.add.sprite(0, 0, 'nattyfg');
    fg.scale.setTo(1.2, 4.8)
    fg.alpha = 0.8


    var c1 = this.game.add.sprite(325, 365, 'barry')
    c1.scale.setTo(5)
    c1.angle = 90//?????
        var c2 = this.game.add.sprite(440, 365, 'barry')
    c2.scale.setTo(5)
    c2.angle = 90//?????
    this.player = this.game.add.sprite(10, 900, 'dude');







    var b = this.game.add.sprite(330, 395, 'WaterFountain')
    b.scale.setTo(0.75, 1.1)







          this.player.scale.setTo(1.5,1)
    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;











    var ground = this.platforms.create(0, this.game.world.height - 200, 'dirt');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(13.5, 6);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    this.game.world.bringToTop(ground)


    var tube = this.platforms.create(10, this.game.world.height - 280, 'pipe');
    tube.body.immovable = true


    var sike1 = this.platforms.create(203, this.game.world.height - 488, 'nattygrass');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike1.scale.setTo(1, 0.75);
sike1.body.setSize(365  , 5, 0, 150)
sike1.body.immovable = true
sike1.body.checkCollision.down = false;


    var c1 = this.game.add.sprite(255, 640, 'barry')
    c1.scale.setTo(5)
    c1.angle = 90//?????
        var c2 = this.game.add.sprite(510, 640, 'barry')
    c2.scale.setTo(5)
    c2.angle = 90//?????


    var c1 = this.game.add.sprite(290, 495, 'barry')
    c1.scale.setTo(5)
    c1.angle = 90//?????
        var c2 = this.game.add.sprite(545, 495, 'barry')
    c2.scale.setTo(5)
    c2.angle = 90//?????




      var sike2 = this.platforms.create(243, this.game.world.height - 548, 'nattybgrounds');
sike2.body.immovable = true
    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike2.scale.setTo(0.5, 0.75);
sike2.body.setSize(495, 5, 25, 75)

sike2.body.checkCollision.down = false;












      var sike3 = this.platforms.create(255, this.game.world.height - 635, 'nattymtn');
sike3.body.immovable = true
    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike3.scale.setTo(1, 0.25);
sike3.body.setSize(275, 5, 0, 37)

sike3.body.checkCollision.down = false;














    var c = this.game.add.sprite(170, 640, 'treeee')
    c.scale.setTo(1, 1.15)





    var d = this.game.add.sprite(170, 466, 'tinytree')
    d.scale.setTo(4)




    var e = this.game.add.sprite(270, 566, 'grass')
    e.scale.setTo(7, 2)

    var g = this.game.add.sprite(270, 266, 'nothertree')
    g.scale.setTo(1)

    var f = this.game.add.sprite(250, 294, 'flower')
    f.scale.setTo(2)

    var f2 = this.game.add.sprite(370, 265, 'flower')
    f2.scale.setTo(3)


    // The this.player and its settings


       this.coins = this.game.add.group();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.inDialog = false
    this.makeCoins()
    this.scoreText = this.game.add.text(16, 16, 'friends: 0', { fontSize: '32px', fill: '#000' });


    var that = this
    this.game.musician.playFX('wooshair')
    // PLAY A WHOOOSH SOUND HERE!?
    var inty = window.setInterval(function () {
      that.player.y -= 15



      if (that.player.y <= 530) {
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
var that = this
        // Removes the coin from the screen
      // PLAY A SOUND TOO!
      if (!coin.collected && this.canMove) {
    this.game.musician.playFX('giggle')
        coin.collected = true
        setTimeout(function () {
          coin.collected = false
        }, 2000)
            // TODO MAKE THESE CUTER!
        this.game.add.text(Math.random() * this.game.world.width / 1.3, Math.random() * this.game.world.height / 1.3, [
        'HI FRIEND!',
        'YR AWESOME!'][~~(Math.random() * 3)],
        { fontSize: '32px', fill: rc(), font: 'Impact', wordWrap: true, wordWrapWidth: '500px' });



          //  Add and update the score
          this.score += 1;
          this.scoreText.text = 'friends: ' + this.score;
          if (this.score % 5 == 0) this.makeCoins()


          if (!this.ended && this.score % 25 == 0) {

              //
              this.ended = true
              var bg = this.game.add.sprite(0, 0, 'black');
              bg.scale.setTo(5, 7)
              // bg.anchor.setTo(0.5, 0.5);
              bg.alpha = 0;
              var that = this
// var t = this.game.add.tween(bigBg).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, false, 0, 200, 1).start();
// t.onLoop.add(function () {
// console.log('looped!')
// // t.onLoopCallback(function(){console.log('Y?')})
// that.game.tweens.remove(t)
// bigBg.destroy()




// // OHHH MAYBE DROP THE PLAYER IN HERE?

// }, this)
              // var t = this.game.add.tween(bg).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, false, 0, 0, 1).start();
              // t.onLoop.add(function () {
              //     console.log('looped!')


            that.game.add.text(100, 256, 'looks like everything is a-ok in this world! there is no nuclear war and now u have a lot of friends! cool! you won!', { fontSize: '42px', backgroundColor: '#FFF', fill: '#000', font: 'Impact', wordWrap: true, wordWrapWidth: '300' });
            that.canMove = false
            setTimeout(function () {
              that.game.state.start('ending')
            }, 5000)
                  // t.onLoopCallback(function(){console.log('Y?')})
                  // that.game.tweens.remove(t)

              //   bg.destroy()

              //   // OHHH MAYBE DROP THE PLAYER IN HERE?

              // }, this)
              // OH! THIS IS HOW U GET TO THE CREDITS!
              // u fell off the dang thing
              // TODO: what happen if u fall off the thing?

          }

      }

    },
    makeCoins: function () {
      // play a sound like friends dumping!

      //  We will enable physics for any coin that is created in this group
      this.coins.enableBody = true;



      friends = shuffle(friends)




      for (var i = 0; i < 10; i++) {
          //  Create a coin inside of the 'coins' group
          // MAKE ROWS OF COINS SUCH THAT THEY ARE ON EACH PLATFORMS!
          var coin = this.coins.create(poss[i].x + 50 * (~~(Math.random() * 2) - 1), poss[i].y + 50 * (~~(Math.random() * 2) - 1), friends[i].sprite);
          if (friends[i].animated) {
            coin.animations.add('DANCE')
            coin.animations.play('DANCE', 1 + ~~(Math.random() * 2), true)
          }
          //  Let gravity do its thing
          coin.body.gravity.y = 300;
          coin.anchor.setTo(.5,.5)
          coin.scale.setTo(friends[i].scale[0], friends[i].scale[1])
          var tween = this.game.add.tween(coin).to({x: coin.x + 50 * (~~(Math.random() * 2) - 1)}, 750 + ~~(Math.random() * 750), "Linear", true, 0, -1)
          tween.yoyo(true)



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
            this.openDialog({name: 'a large gourd', description: 'o_o O_o o_0 o_o ._. the gourd tell you to take a vow of pacifism and a leap of faith. i think u should listen.', sprite: 'pumpkin', yes: 'nice'})

      }


    },
    update: function () {
              this.game.physics.arcade.collide(this.player, this.platforms);
                      this.game.physics.arcade.collide(this.coins, this.platforms);
                      this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);


      this.coins.forEach(function (c) {
        if (Math.random() < 0.01) c.scale.x *= -1
      })
      if (!this.inDialog && this.canMove){





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
                          this.player.body.velocity.y = -640;


                        }
            }
    }

}


module.exports = Outside