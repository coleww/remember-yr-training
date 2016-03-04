var db = require('../db')
var get = db.get
var set = db.set

var score
var savedData
var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c]
var tunnelWidth = 256
var shipHorizontalSpeed = 100
var shipMoveDelay = 0
var shipVerticalSpeed = 15000
var swipeDistance = 10
var barrierSpeed = 280
var barrierGap = 120
var shipInvisibilityTime = 1000
var barrierIncreaseSpeed = 1.1
var scoreHeight = 100
var scoreSegments = [100, 50, 25, 10, 5, 2, 1]
var friendlyBarRatio = 10
var localStorageName = "rememberYrTraining"
// construct markov poet barrier maker thing based on their choices or lack thereof
// save which lines they touch
// make enemies? explosions? slowly rising fire?
// lol put random stuff to inspect along the way

var Silo = function(game){
  this.game = game
}



Silo.prototype = {

  // preload: function() {
  //   this.load.image( 'hero', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/dude.png' );
  //   this.load.image( 'pixel', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/pixel_1.png' );
  // },

  create: function() {
    // background color
    this.stage.backgroundColor = '#6bf';

    this.physics.startSystem( Phaser.Physics.ARCADE );

    // camera and platform tracking vars
    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    // create platforms
    this.platformsCreate();

    // create hero
    this.heroCreate();

    // cursor controls
    this.cursor = this.input.keyboard.createCursorKeys();
  },

  update: function() {
    // this is where the main magic happens
    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 130 );
    this.camera.y = this.cameraYMin;

    // hero collisions and movement
    this.physics.arcade.collide( this.hero, this.platforms );
    this.heroMove();

    // for each plat form, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.kill();
        this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.platformYMin - 100, 50 );
      }
    }, this );
  },

  shutdown: function() {
    // reset everything, or the world will be messed up
    this.world.setBounds( 0, 0, this.game.width, this.game.height );
    this.cursor = null;
    this.hero.destroy();
    this.hero = null;
    this.platforms.destroy();
    this.platforms = null;
  },

  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple( 10, 'black' );

    // create the base platform, with buffer on either side so that the hero doesn't fall through
    this.platformsCreateOne( -16, this.world.height - 16, this.world.width + 16 );
    // create a batch of platforms that start to move up the level
    for( var i = 0; i < 9; i++ ) {
      this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100 - 100 * i, 50 );
    }
  },

  platformsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();
    platform.reset( x, y );
    platform.scale.x = width;
    platform.scale.y = 16;
    platform.body.immovable = true;
    return platform;
  },

  heroCreate: function() {
    // basic hero setup
    this.hero = this.game.add.sprite( this.world.centerX, this.world.height - 36, 'dude' );
    this.hero.anchor.set( 0.5 );

    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = 500;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
  },

  heroMove: function() {
    // handle the left and right movement of the hero
    if( this.cursor.left.isDown ) {
      this.hero.body.velocity.x = -200;
    } else if( this.cursor.right.isDown ) {
      this.hero.body.velocity.x = 200;
    } else {
      this.hero.body.velocity.x = 0;
    }

    // handle hero jumping
    if( this.cursor.up.isDown && this.hero.body.touching.down ) {
      this.hero.body.velocity.y = -350;
    }

    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( this.hero, this.hero.width / 2, false );

    // track the maximum amount that the hero has travelled
    this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );

    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      this.state.start( 'Play' );
    }
  }
}














// Silo.prototype = {
//   preload: function(){
//   },
//   create: function(){
//     var game = this.game
//     var launchedTheMissiles = get('launched')
//     var isFaded = get('escapingDrunkenly')
//     if (launchedTheMissiles) {
//       // there will be enemies and fast tense music and explosions and u will have to move fast
//     } else {
//       // there will be no enemies and u can take as long as u want and inspect hte random objects on the platforms
//     }
//     score = 0
//     var tintColor = 6784674356
//     document.body.style.background = "#"+tintColor.toString(16)
//     var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg")
//     tunnelBG.tint = tintColor
//     var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "wall")
//     leftWallBG.tint = tintColor
//     var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "wall")
//     rightWallBG.tint = tintColor
//     rightWallBG.tileScale.x = -1

//     this.barrierGroup = game.add.group()
//     this.addBarrier(this.barrierGroup, tintColor)
//     this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32]
//     this.ship = game.add.sprite(this.shipPositions[0], 860, "ship")
//     this.ship.side = 0
//     this.ship.destroyed = false
//     this.ship.canMove = true
//     this.ship.canSwipe = false
//     this.ship.anchor.set(0.5)
//     game.physics.enable(this.ship, Phaser.Physics.ARCADE)

//     this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20)
//     this.smokeEmitter.makeParticles("smoke")
//     this.smokeEmitter.setXSpeed(-15, 15)
//     this.smokeEmitter.setYSpeed(50, 150)
//     this.smokeEmitter.setAlpha(0.5, 1)
//     this.smokeEmitter.start(false, 1000, 40)
//     this.verticalTween = game.add.tween(this.ship).to({
//       y: 0
//     }, shipVerticalSpeed, Phaser.Easing.Linear.None, true)
//     this.highlightBar = game.add.tileSprite(game.width / 2, 0, tunnelWidth, scoreHeight, "smoke")
//     this.highlightBar.anchor.set(0.5, 0)
//     this.highlightBar.alpha = 0.1
//     this.highlightBar.visible = false
//   },
//   moveShip: function(){
//     this.ship.canSwipe = true
//     if(this.ship.canMove && !this.ship.destroyed){
//       this.ship.canMove = false
//       this.ship.side = 1 - this.ship.side
//       var horizontalTween = game.add.tween(this.ship).to({
//         x: this.shipPositions[this.ship.side]
//       }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true)
//       horizontalTween.onComplete.add(function(){
//         game.time.events.add(shipMoveDelay, function(){
//           this.ship.canMove = true
//         }, this)
//       }, this)
//       var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship")
//       ghostShip.alpha = 0.5
//       ghostShip.anchor.set(0.5)
//       var ghostTween = game.add.tween(ghostShip).to({
//         alpha: 0
//       }, 350, Phaser.Easing.Linear.None, true)
//       ghostTween.onComplete.add(function(){
//         ghostShip.destroy()
//       })
//     }
//   },
//   update: function(){
//     var game = this.game
//     this.smokeEmitter.x = this.ship.x
//     this.smokeEmitter.y = this.ship.y


//       game.physics.arcade.collide(this.ship, this.barrierGroup, null, function(s, b){
//           if (b.alpha == 1) {
//             var barrierTween = game.add.tween(b).to({alpha:0}, 200, Phaser.Easing.Bounce.Out, true)
//             // // destroyed ship thing!
//             // if (!b.friendly) {
//             //           this.ship.destroyed = true
//             //           this.highlightBar.visible = false
//             //           this.smokeEmitter.destroy()
//             //           var destroyTween = game.add.tween(this.ship).to({
//             //             x: this.ship.x + game.rnd.between(-100, 100),
//             //             y: this.ship.y - 100,
//             //             rotation: 10
//             //           }, 1000, Phaser.Easing.Linear.None, true)
//             //           destroyTween.onComplete.add(function(){
//             //             var explosionSound = game.add.audio("explosion")
//             //             explosionSound.play()
//             //             var explosionEmitter = game.add.emitter(this.ship.x, this.ship.y, 200)
//             //             explosionEmitter.makeParticles("smoke")
//             //             explosionEmitter.setAlpha(0.5, 1)
//             //             explosionEmitter.minParticleScale = 0.5
//             //             explosionEmitter.maxParticleScale = 2
//             //             explosionEmitter.start(true, 2000, null, 200)
//             //             this.ship.destroy()
//             //             game.time.events.add(Phaser.Timer.SECOND * 2, function(){
//             //               game.state.start("GameOverScreen")
//             //             })
//             //           }, this)
//           }

//       }, this)
//   },
//   addBarrier: function(group, tintColor){
//     var barrier = new Barrier(this.game, 5, tintColor)
//     this.game.add.existing(barrier)
//     group.add(barrier)
//   }
// }

Barrier = function (game, speed, tintColor) {
  this.game = game
  var positions = [(game.width - tunnelWidth) / 2, (game.width + tunnelWidth) / 2]
  var position = game.rnd.between(0, 1)
  Phaser.Sprite.call(this, game, positions[position], -100, "barrier")
  var cropRect = new Phaser.Rectangle(0, 0, tunnelWidth / 2, 24)
  this.crop(cropRect)
  game.physics.enable(this, Phaser.Physics.ARCADE)
  this.anchor.set(position, 0.5)
  this.levelTint = tintColor
  if(game.rnd.between(0, friendlyBarRatio)!=0){
    this.tint = tintColor
    this.friendly = false
  }
  else{
    this.friendly = true
  }
  this.body.immovable = true
  this.body.velocity.y = speed
  this.placeBarrier = true
}

Barrier.prototype = Object.create(Phaser.Sprite.prototype)
Barrier.prototype.constructor = Barrier

Barrier.prototype.update = function(){
  var game = this.game
  if(this.placeBarrier && this.y > barrierGap){
    this.placeBarrier = false
    Barrier.prototype.addBarrier(this.parent, this.levelTint)
  }
  if(this.y > game.height){
    this.destroy()
  }
}


module.exports = Silo









// THIS IS MORE LIKE WHAT WE WANT I THINK! but with barriergroup thing and the pooping fxx?


// var game = new Phaser.Game( 300, 500, Phaser.CANVAS, '' );
// game.state.add( 'Play', Jumper.Play );
// game.state.start( 'Play' );













