var db = require('../db')
var get = db.get
var set = db.set
var inc = db.inc
var Silo = function(game){
  this.game = game
}

var features = require('../features')
var poe = require('../poetic_muser')
var al = features.alignment || get('alignment')
var THE_POET = poe(al)
var gimmeSomeTextNowPlz = function () {
  return THE_POET()
}

// {greed: 0, fight: 0, nature: 0, pos: 0, neg: 0
function getAlignment (al) {
  var arr = [al.greed, al.fight, al.nature]
  var i = arr.indexOf(Math.max.apply(Math, arr));
  return ['greed', 'fight', 'nature'][i]
}

function getDir (al) {
  return al.pos == al.neg ? 0 : (al.pos > al.neg ? 1 : -1)
}
var align = getAlignment(al)
var dir = getDir(al)

var stuffs = {
  greed: [0.5, 1.5, 8, 8],
  fight: [0.2, 0.6, 4, 4],
  nature: [0.05, 0.4, 2, 2],
}
var stuff = stuffs[align]
var MIN_WIDTH = stuff[0]
var MAX_WIDTH = stuff[1]
var NUM_PLATS = 8 + (~~Math.random() * stuff[2]) * dir + stuff[3]







Silo.prototype = {
  create: function() {
    this.launchedTheMissiles = get('launched')
    this.isFaded = get('escapingDrunkenly')


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
    if (this.hero.destroyed) return 'poop'
    var game = this.game
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.text.destroy()
        elem.kill();
        this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.hero.y - 1000, this.rnd.integerInRange(MIN_WIDTH, MAX_WIDTH));
      }
    }, this );


    // this is where the main magic happens
    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 200 );
    this.camera.y = this.cameraYMin;

    this.smokeEmitter.x = this.hero.x
    this.smokeEmitter.y = this.hero.y

    // hero collisions and movement
    // this.physics.arcade.collide( this.hero, this.platforms );




    var that = this
    game.physics.arcade.collide(this.hero, this.platforms, null, function(s, b){
      if (b.alpha == 1 && !b.friendly) {
        var barrierTween = game.add.tween(b).to({alpha:0}, 200, Phaser.Easing.Bounce.Out, true)
        // // destroyed ship thing!
        if (!b.friendly) {
          that.hero.destroyed = true
          // that.smokeEmitter.destroy()
          var destroyTween = game.add.tween(that.hero).to({
            x: that.hero.x + game.rnd.between(-100, 100),
            y: that.hero.y - 100,
            rotation: 10
          }, 1000, Phaser.Easing.Linear.None, true)
          destroyTween.onComplete.add(function(){
            var explosionEmitter = game.add.emitter(that.hero.x, that.hero.y, 200)
            explosionEmitter.makeParticles("smoke")
            explosionEmitter.setAlpha(0.5, 1)
            explosionEmitter.minParticleScale = 0.5
            explosionEmitter.maxParticleScale = 2
            explosionEmitter.start(true, 2000, null, 200)
            that.hero.destroy()
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
              var deaths = inc('siloDeaths')
              set('gameOver', 49 + deaths)
              game.state.start("GameOverScreen")
            })
          }, this)
        }
      }
    }, this)



    this.heroMove();

    // for each plat form, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant

  },

  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple( NUM_PLATS, 'black' );

    // create a batch of platforms that start to move up the level
    for( var i = 0; i < NUM_PLATS - 2; i++ ) {

      var p = this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 500 - 100 * i, this.rnd.integerInRange(MIN_WIDTH, MAX_WIDTH) );
      // p.friendly = false
    }

    var theGround = this.platforms.getFirstDead();
    theGround.reset( 0, this.world.height - 50);
    theGround.scale.x = 20;
    theGround.scale.y = 0.25;
    theGround.friendly = true
    theGround.body.immovable = true;
    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: theGround.width * 2, align: "center"};

    theGround.text = this.game.add.text(0, this.world.height - 50, "EQUIP THE JETPACK TO ESCAPE!!!", style);
    // theGround.text.anchor.set(0.5);
    return theGround;
  },

  equipJetpack: function () {

    this.hero.body.setSize(1,1,0, 0)
    this.jetPacked = true
    this.smokeEmitter.start(false, 1000, 40)
  },

  platformsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();
    platform.reset( x, y );
    platform.scale.x = width;
    platform.scale.y = 0.25;
    platform.body.immovable = true;
    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: platform.width * 2, align: "center"};

    platform.text = this.game.add.text(x, y, gimmeSomeTextNowPlz(), style);
    // platform.text.anchor.set(0.5);
    return platform;
  },

  heroCreate: function() {
    // basic hero setup
    this.hero = this.game.add.sprite( this.world.centerX, this.world.height - 76, 'dude' );
    this.hero.anchor.set( 0.5 );
    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    // this.hero.body.checkCollision.up = true;
    this.hero.body.gravity.y = 500;
    this.hero.scale.setTo(1.5,1)
    //  We need to enable physics on the this.hero


    //  Our two animations, walking left and right.
    this.hero.animations.add('left', [4, 5, 6, 7], 10, true);
    this.hero.animations.add('right', [8, 9, 10, 11], 10, true);
    this.hero.animations.add('up', [12, 13, 14, 15], 10, true);
    this.hero.animations.add('down', [0, 1, 2, 3], 10, true);
    this.hero.body.collideWorldBounds = true;
    this.smokeEmitter = this.game.add.emitter(this.hero.x, this.hero.y + 10, 20)
    this.smokeEmitter.makeParticles("smoke")
    this.smokeEmitter.setXSpeed(-15, 15)
    this.smokeEmitter.setYSpeed(50, 150)
    this.smokeEmitter.setAlpha(0.5, 1)
  },

  heroMove: function() {
    // handle the left and right movement of the hero
      if( this.cursor.left.isDown  || (this.isFaded && Math.random() < 0.05)) {
        this.hero.body.velocity.x = -300;
        if (this.hero.body.touching.down) {
          this.hero.animations.play('left');
        } else {
          this.hero.animations.stop()
          this.hero.frame = [5, 7][~~(Math.random() * 2)]
        }
      } else if( this.cursor.right.isDown  || (this.isFaded && Math.random() < 0.05)) {
        this.hero.body.velocity.x = 300;
        if (this.hero.body.touching.down) {
          this.hero.animations.play('right');
        } else {
          this.hero.animations.stop()
          this.hero.frame = [11, 9][~~(Math.random() * 2)]
        }
      } else if (this.cursor.down.isDown) {
        // if player is at the jetpack, do it!
        this.jetPacked = true
      } else {
        var goingUp = !this.hero.body.velocity.x
        var goingRight = this.hero.body.velocity.x > 0
        var goingLeft = !goingRight
        if (this.hero.body.touching.down) {
          //  Stand still
          this.hero.animations.stop();

          this.hero.body.velocity.x = 0
        } else {
          if (goingUp) {
            // ???? almost never happens
          } else {
            this.hero.body.velocity.x += goingRight ? -1 : 1
          }
        }
      }
      if (this.cursor.up.isDown && this.hero.body.touching.down) {
        this.game.musician.playFX('pew')
        this.hero.body.velocity.y = -340;
      }
    if (this.jetPacked) {


        this.hero.body.velocity.y = -350;
      // }

      // track the maximum amount that the hero has travelled
      this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );
    }

    console.log(this.hero.yChange)
    // handle hero jumping
    // HERO IS CONSTANTLY JUMPING
    // IT IS ALL GOD
    // if( this.cursor.up.isDown && this.hero.body.touching.down ) {


  }
}


module.exports = Silo





