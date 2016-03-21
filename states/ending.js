var db = require('../db')
var get = db.get
var set = db.set
var inc = db.inc
var Ending = function(game){
  this.game = game
}


Ending.prototype = {
//   modColor: function  () {
//   console.log('um', this.theColor)
//   this.theColor += (~~(Math.random() * 2.5) - 1)
//   if (this.theColor < 0) this.theColor = 0
//   if (this.theColor > 9) this.theColor = 9
//   console.log("WTF", '#53' + this.theColor)
//   return '#63' + this.theColor
// },
  create: function() {
    // if (this.jetPacked) {
    //   this.jetPacked = false
    //     this.game.state.restart()
    // }

    // this.launchedTheMissiles = get('launched')
    // this.isFaded = get('escapingDrunkenly')
    // this.theColor = 5
    // this.bg = this.game.add.tileSprite(0, 0, 640, 1550, 'Endingwall');
    // this.bg.scale.y = 100

    // this.physics.startSystem( Phaser.Physics.ARCADE );

    // // camera and platform tracking vars
    // this.cameraYMin = 99999;
    // this.platformYMin = 99999;

    // // create platforms
    // this.platformsCreate();

    // this.jetpack = this.game.add.sprite(this.world.centerX + 250, this.world.height - 86, 'jetpack');
    // this.jetpack.scale.setTo(1.5)
    // // create hero
    // this.heroCreate();

    // // cursor controls
    // this.cursor = this.input.keyboard.createCursorKeys();

  },

  update: function() {

    // // throw('fuck')
    // if (this.hero.yChange > HEIGHT && !this.atTheTop) {
    //   this.atTheTop = true
    //   var bar = this.game.add.sprite(-60, -1100 - HEIGHT, 'barrel');
    //   bar.scale.setTo(1.25,3.75)
    //   this.world.bringToTop(bar)

    //   // draw some sort of massive tub like entrance (upside down green pipe?)
    //   // player flies in
    //   // screen fades black
    //   // goes to yr ending of choice
    // }
    // if (this.atTheTop && this.hero.yChange > HEIGHT + 450 && !this.fadingOut) {
    //   console.log("FADED")
    //   this.fadingOut = true
    //   this.fadeOutbg = this.game.add.sprite(0, -this.hero.yChange - 350, 'black');
    //   this.fadeOutbg.scale.setTo(5, 12)
    //   // this.fadeOutbg.anchor.setTo(0.5, 0.5);
    //   this.fadeOutbg.alpha = 0;
    //   var that = this
    //   var t = this.game.add.tween(this.fadeOutbg).to( { alpha: 1 }, 3500, Phaser.Easing.Linear.None, false, 0, 1000, 1)

    //   t.onLoop.add(function () {
    //       console.log('fadelooped!')
    //       // t.onLoopCallback(function(){console.log('Y?')})

    //       that.game.state.start(that.launchedTheMissiles ? 'explosion' : align)
    //   }, this)
    //   t.start();
    // }
    // if (this.fadeOutbg) {

    //   this.world.bringToTop(this.fadeOutbg)
    //   this.fadeOutbg.reset(0,-this.hero.yChange - 350)
    // }


    // // console.log(this.hero.x)
    // if (this.hero.destroyed) return 'poop'
    // var game = this.game
    // this.platforms.forEachAlive( function( elem ) {
    //   this.platformYMin = Math.min( this.platformYMin, elem.y );
    //   if( elem.y > this.camera.y + this.game.height && !this.atTheTop) {
    //     elem.text.destroy()
    //     elem.kill();
    //     this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 150 ), this.hero.y - 1000, this.rnd.realInRange(MIN_WIDTH, MAX_WIDTH));
    //   }
    // }, this );


    // // this is where the main magic happens
    // // the y offset and the height of the world are adjusted
    // // to match the highest point the hero has reached
    // this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // // the built in camera follow methods won't work for our needs
    // // this is a custom follow style that will not ever move down, it only moves up
    // this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 200 );
    // this.camera.y = this.cameraYMin;

    // this.smokeEmitter.x = this.hero.x
    // this.smokeEmitter.y = this.hero.y

    // // hero collisions and movement
    // // this.physics.arcade.collide( this.hero, this.platforms );


    // if (this.jetPacked) this.bg.scale.y = this.bg.scale.y * 1.01

    // // this.bg.reset(0,0)

    // var that = this
    // if (this.hero.yChange < HEIGHT + 450) {
    // game.physics.arcade.collide(this.hero, this.platforms, null, function(s, b){

    //   if (b.alpha == 1 && !b.friendly) {
    //     // var barrierTween = game.add.tween(b).to({alpha:0}, 200, Phaser.Easing.Bounce.Out, true)
    //     // // destroyed ship thing!
    //     if (!b.friendly) {
    //       that.hero.destroyed = true
    //       // that.smokeEmitter.destroy()
    //       var destroyTween = game.add.tween(that.hero).to({
    //         x: that.hero.x + game.rnd.between(-100, 100),
    //         y: that.hero.y - 100,
    //         rotation: 10
    //       }, 1000, Phaser.Easing.Linear.None, true)
    //       destroyTween.onComplete.add(function(){
    //         var explosionEmitter = game.add.emitter(that.hero.x, that.hero.y, 200)
    //         explosionEmitter.makeParticles("smoke")
    //         explosionEmitter.setAlpha(0.5, 1)
    //         explosionEmitter.minParticleScale = 0.5
    //         explosionEmitter.maxParticleScale = 2
    //         explosionEmitter.start(true, 2000, null, 200)
    //         that.hero.destroy()
    //         game.time.events.add(Phaser.Timer.SECOND * 2, function(){
    //           var deaths = inc('EndingDeaths')
    //           set('gameOver', 49 + deaths)
    //           game.state.start("GameOverScreen")
    //         })
    //       }, this)
    //     }
    //   }
    // }, this)

    // }

    // this.heroMove();

    //   this.bg.reset(0, -this.hero.yChange - 350)
    // // for each plat form, find out which is the highest
    // // if one goes below the camera view, then create a new one at a distance from the highest one
    // // these are pooled so they are very performant

  }

}


module.exports = Ending





