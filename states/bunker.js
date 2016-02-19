var bunker = function (game) {
  this.game = this.game
}

bunker.prototype = {
  create: function () {
    console.log("WE IN THE BUNKER")
    this.inventory = [{name: 'battery', description: 'it looks sort of, plugged into you? maybe don\'t mess with it OK?', fx: 'gameOver1'}]
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our this.game
    this.game.add.sprite(0, 0, 'sky');

    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The this.player and its settings
    this.player = this.game.add.sprite(32, this.game.world.height - 350, 'dude');
    this.player.scale.setTo(2,2)
    //  We need to enable physics on the this.player
    this.game.physics.arcade.enable(this.player);

    //  this.Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3], 10, true);

    this.drawMenu()
    // //  The score

    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  drawMenu: function () {
    this.hpDisplay = this.game.add.text(16, 16, 'hp: 100/100', { fontSize: '32px', fill: '#000' });
    this.inventoryDisplay = this.game.add.text(16, 40, 'inventory:' + this.inventory.map(function (item) {
        return item.name
    }).join(', '), { fontSize: '32px', fill: '#000' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  openDialog: function (thing) {
    // based on whatever the thing is...."inspect thing" etc.
    // draw a dialog box, display the thing, prompt the user to do stuff
    // IF the thing is the poetry journal, defer to openJournal
  },
  useThing: function (thing) {
    // activate the fx of a thing
  },
  openJournal: function () {

  },
  goToSleep: function () {

  },
  update: function () {

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
    } else if (this.cursors.down.isDown) {
        //  PLAYER IS PRESSING DOWN, TRYING TO ACTIVATE SOMETHING?
        // figure out what thing they are touching/near? and then openDialog(thatThingYouDo)
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