var db = require('../db')
var get = db.get
var set = db.set

var bunker = function (game) {
  this.game = this.game
}

bunker.prototype = {
  create: function () {
    console.log("WE IN THE BUNKER")


    this.game.add.tileSprite(0, 720, 640, 960, 'walll');
    this.game.add.tileSprite(0, 0, 640, 720, 'wallll');
    var top = this.game.add.tileSprite(0, 0, 640, 150, 'walllll');


    // make the ladder drop down later
    var ladder = this.game.add.sprite(this.game.world.width / 2 + 40, 250, 'ladder');
    ladder.scale.setTo(0.15, 0.5)




    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our this.game


    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    var topBarrier = this.platforms.create(0, 150, 'blank')
    topBarrier.body.setSize(640, 1, 0, 0)
    topBarrier.body.immovable = true



    var chute = this.platforms.create(this.game.world.width / 2 + 25, 150, 'chute');
    chute.scale.setTo(0.45, 0.78)
    chute.body.immovable = true
    // Here we create the ground.



    var voltagebox = this.platforms.create(this.game.world.width / 2 - 120, 445, 'base');
    voltagebox.scale.setTo(0.1, 0.1)
    voltagebox.body.immovable = true


    var speakerL = this.platforms.create(this.game.world.width / 2 - 152, 465, 'speaker');
    speakerL.scale.setTo(0.45, 0.78)
    speakerL.body.immovable = true

    var speakerR = this.platforms.create(this.game.world.width / 2 - 27, 465, 'speaker');
    speakerR.scale.setTo(0.45, 0.78)
    speakerR.body.immovable = true


    var buttonthing = this.platforms.create(this.game.world.width / 2 - 120, 347, 'butts');
    buttonthing.scale.setTo(0.1, 0.1)
    buttonthing.body.immovable = true

    var tv = this.platforms.create(this.game.world.width / 2 - 153, 425, 'tv');
    tv.scale.setTo(0.4, 0.4)
    tv.body.immovable = true

    var radio = this.platforms.create(this.game.world.width / 2 - 123, 272, 'radio');
    radio.scale.setTo(0.45, 0.78)
    radio.body.setSize(93, 50, 5, 25)
    radio.body.immovable = true

    var fan = this.game.add.sprite(this.game.world.width / 2 - 158, 380, 'fan');
    fan.scale.setTo(0.5, 0.5)

    var mach = this.game.add.sprite(this.game.world.width / 2 - 90,  245, 'mach');
    mach.scale.setTo(0.4, 0.78)

    var siren = this.game.add.sprite(this.game.world.width / 2 - 20, 420, 'siren');
    siren.scale.setTo(0.45, 0.78)

    var bulb = this.game.add.sprite(this.game.world.width / 2 - 78, 220, 'bulb');
    bulb.scale.setTo(0.3, 0.7)

    var fuse = this.game.add.sprite(this.game.world.width / 2 - 114, 246, 'fuse');
    fuse.scale.setTo(0.5, 0.75)

    var tippyTop = this.platforms.create(this.game.world.width / 2 - 72, 343, 'grid');
    tippyTop.scale.setTo(0.05, 0.1)
    tippyTop.body.setSize(1000, 1, 0, 0)
    tippyTop.body.immovable = true


    var ground = this.platforms.create(0, this.game.world.height - 240, 'ground');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(1.6, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(this.game.world.width / 2 - 150, this.game.world.height - 420, 'platform');
    ledge.body.immovable = true;



    var vend = this.platforms.create(-8, this.game.world.height - 345, 'vend')
    vend.body.immovable = true
    vend.body.setSize(75, 75, 0, 27)

    // The this.player and its settings
    this.player = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 800, 'dude');
    this.player.scale.setTo(1.5,1)
    //  We need to enable physics on the this.player
    this.game.physics.arcade.enable(this.player);
        //  This adjusts the collision body size to be a 100x50 box.
    //  50, 25 is the X and Y offset of the newly sized box.

    this.player.body.setSize(10, 48, 20, 0);

    //  this.Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3], 10, true);







    this.bed = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 305, 'cryobed');
    this.bed.frame = 1

    // var close = this.bed.animations.add('close', [0, 1, 2], 5500, true);

    // this.bed.animations.play('close', true)
    // close.loop = false


    // //  The score

    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  drawMenu: function () {
    this.hpDisplay = this.game.add.text(16, 25, 'hp: 100/100', { fontSize: '22px', fill: '#FFF' });
    this.inventoryDisplay = this.game.add.text(16, 50, 'inventory:' + this.game.inventory.map(function (item) {
        return item.name
    }).join(', '), { fontSize: '22px', fill: '#FFF' });

    this.walletDisplay = this.game.add.text(16, 75, this.game.wallet + '$', { fontSize: '22px', fill: '#FFF' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  openDialog: function (thing) {
    // based on whatever the thing is...."inspect thing" etc.
    // draw a dialog box, display the thing, prompt the user to do stuff
    // IF the thing is the poetry journal, defer to openJournal
    // IF it's the chest/vending machine, defer to those
  },
  useThing: function (thing) {
    // activate the fx of a thing
  },
  openJournal: function () {

  },
  goToSleep: function () {

  },
  update: function () {
    this.drawMenu()
    this.game.physics.arcade.collide(this.player, this.platforms);

    if (this.cursors.left.isDown) {
        //  Move to the left
        this.player.body.velocity.x = -150;
        if (this.player.body.touching.down) {
          this.player.animations.play('left');
        } else {
          this.player.animations.stop()
          this.player.frame = [5, 7][~~(Math.random() * 2)]
        }
    } else if (this.cursors.right.isDown) {
        //  Move to the right
        this.player.body.velocity.x = 150;
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
    } else {
      var goingUp = !this.player.body.velocity.x
      var goingRight = this.player.body.velocity.x > 0
      var goingLeft = !goingRight
      if (this.player.body.touching.down) {
        //  Stand still
        this.player.animations.stop();
        this.player.frame = 0
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
      this.player.body.velocity.y = -350;
    }
  }
}

module.exports = bunker