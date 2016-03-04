var db = require('../db')
var get = db.get
var set = db.set
var dec = db.dec
var inc = db.inc
var push = db.push
var remove = db.remove
var drawMenu = require('../drawMenu')

var DeathPit = function(game){
  this.game = game
}
DeathPit.prototype = {
  preload: function(){
  },
  create: function(){




    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.speediness = 0.25
    this.game.musician.change('deathPit')
      this.game.add.tileSprite(0, 0, 640, 960, 'wall_2');


    //  We're going to be using physics, so enable the Arcade Physics system

    //  A simple background for our this.game

    var blank = this.game.add.sprite(0, this.game.world.height - 230, 'black');
    blank.scale.setTo(100, 100)







    var portal = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 4, 'portal');
    portal.scale.setTo(3)
    portal.anchor.set(0.5)
    var tween = this.game.add.tween(portal).to({width: 220, height:200}, 1500, "Linear", true, 0, -1, true)
    tween.yoYo = true












    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;








    var ground = this.platforms.create(0, this.game.world.height - 240, 'crumbledplatform');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(11, 3);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    this.game.world.bringToTop(ground)







    var sike1 = this.platforms.create(273, this.game.world.height - 440, 'crumbledplatform');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike1.scale.setTo(2, 0.75);

sike1.body.immovable = true
      var sike2 = this.platforms.create(393, this.game.world.height - 600, 'crumbledplatform');
sike2.body.immovable = true
    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    sike2.scale.setTo(2, 0.75);


    var torch1 = this.game.add.sprite(303, this.game.world.height - 485, 'torchy')

    var close = torch1.animations.add('close', [0, 1, 2], 5, true);

    torch1.animations.play('close', true)
    close.loop = true

    var torch2 = this.game.add.sprite(423, this.game.world.height - 645, 'torchy')

    var close = torch2.animations.add('close', [1, 0, 2], 4, true);

    torch2.animations.play('close', true)
    close.loop = true










    var bod17 = this.game.add.sprite(560, this.game.world.height - 265, 'pots')


    var bod1 = this.game.add.sprite(173, this.game.world.height - 255, 'body1')


    var bod2 = this.game.add.sprite(163, this.game.world.height - 243, 'body2')






    var bod3 = this.game.add.sprite(153, this.game.world.height - 251, 'body1')


    var bod4 = this.game.add.sprite(193, this.game.world.height - 248, 'body2')













    // The this.player and its settings
    this.player = this.game.add.sprite(420, 520, 'dude');
    this.player.scale.setTo(1.5,1)
    //  We need to enable physics on the this.player
    this.game.physics.arcade.enable(this.player);
        //  This adjusts the collision body size to be a 100x50 box.
    //  50, 25 is the X and Y offset of the newly sized box.

    this.player.body.setSize(10, 43, 20, 0);

    //  this.Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 100;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [4, 5, 6, 7], 3, true);
    this.player.animations.add('right', [8, 9, 10, 11], 3, true);
    this.player.animations.add('up', [12, 13, 14, 15], 3, true);
    this.player.animations.add('down', [0, 1, 2, 3], 3, true);


    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.inDialog = false

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
            this.openDialog({name: 'A PILE OF SKELETONS', description: 'someone scrawled a message in blood: "these ppl could not jump very high and i bet u cannot either the gravity is all weird here"', sprite: 'skull', yes: 'bummer'})

      } else if (!this.inDialog && this.player.x > 535 && this.player.x < 590) {
          this.inDialog = true
            this.openDialog({name: 'some pots', description: 'you put yr ear to their pots and, much like the ocean in a shell, hear a demon screaming that youll never reach the portal to escape and there is no way to quit or restart the game now cuz THATS WHAT U GET FOR CHOOSING ULTIMATE POWER!', sprite: 'pots', yes: 'i will reflect on my misdeeds'})
      }


    },
    update: function () {

      this.game.physics.arcade.collide(this.player, this.platforms);

      if (this.cursors.left.isDown) {
          //  Move to the left
          xDir = -5
          this.player.body.velocity.x = -150 * this.speediness;
          if (this.player.body.touching.down) {
            this.player.animations.play('left');
          } else {
            this.player.animations.stop()
            this.player.frame = [5, 7][~~(Math.random() * 2)]
          }
      } else if (this.cursors.right.isDown) {
          xDir = 5
          //  Move to the right
          this.player.body.velocity.x = 150 * this.speediness;
          if (this.player.body.touching.down) {
            this.player.animations.play('right');
          } else {
            this.player.animations.stop()
            this.player.frame = [11, 9][~~(Math.random() * 2)]
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
        this.player.body.velocity.y = -150;


      }
    }

}


module.exports = DeathPit