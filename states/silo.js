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
  preload: function(){
  },
  create: function(){
    var game = this.game
    var launchedTheMissiles = get('launched')
    var isFaded = get('escapingDrunkenly')
    if (launchedTheMissiles) {
      // there will be enemies and fast tense music and explosions and u will have to move fast
    } else {
      // there will be no enemies and u can take as long as u want and inspect hte random objects on the platforms
    }
    score = 0
    var tintColor = 6784674356
    document.body.style.background = "#"+tintColor.toString(16)
    var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg")
    tunnelBG.tint = tintColor
    var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "wall")
    leftWallBG.tint = tintColor
    var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "wall")
    rightWallBG.tint = tintColor
    rightWallBG.tileScale.x = -1

    this.barrierGroup = game.add.group()
    this.addBarrier(this.barrierGroup, tintColor)
    this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32]
    this.ship = game.add.sprite(this.shipPositions[0], 860, "ship")
    this.ship.side = 0
    this.ship.destroyed = false
    this.ship.canMove = true
    this.ship.canSwipe = false
    this.ship.anchor.set(0.5)
    game.physics.enable(this.ship, Phaser.Physics.ARCADE)

    this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20)
    this.smokeEmitter.makeParticles("smoke")
    this.smokeEmitter.setXSpeed(-15, 15)
    this.smokeEmitter.setYSpeed(50, 150)
    this.smokeEmitter.setAlpha(0.5, 1)
    this.smokeEmitter.start(false, 1000, 40)
    this.verticalTween = game.add.tween(this.ship).to({
      y: 0
    }, shipVerticalSpeed, Phaser.Easing.Linear.None, true)
    this.highlightBar = game.add.tileSprite(game.width / 2, 0, tunnelWidth, scoreHeight, "smoke")
    this.highlightBar.anchor.set(0.5, 0)
    this.highlightBar.alpha = 0.1
    this.highlightBar.visible = false
  },
  moveShip: function(){
    this.ship.canSwipe = true
    if(this.ship.canMove && !this.ship.destroyed){
      this.ship.canMove = false
      this.ship.side = 1 - this.ship.side
      var horizontalTween = game.add.tween(this.ship).to({
        x: this.shipPositions[this.ship.side]
      }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true)
      horizontalTween.onComplete.add(function(){
        game.time.events.add(shipMoveDelay, function(){
          this.ship.canMove = true
        }, this)
      }, this)
      var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship")
      ghostShip.alpha = 0.5
      ghostShip.anchor.set(0.5)
      var ghostTween = game.add.tween(ghostShip).to({
        alpha: 0
      }, 350, Phaser.Easing.Linear.None, true)
      ghostTween.onComplete.add(function(){
        ghostShip.destroy()
      })
    }
  },
  update: function(){
    var game = this.game
    this.smokeEmitter.x = this.ship.x
    this.smokeEmitter.y = this.ship.y


      game.physics.arcade.collide(this.ship, this.barrierGroup, null, function(s, b){
          if (b.alpha == 1) {
            var barrierTween = game.add.tween(b).to({alpha:0}, 200, Phaser.Easing.Bounce.Out, true)
            // // destroyed ship thing!
            // if (!b.friendly) {
            //           this.ship.destroyed = true
            //           this.highlightBar.visible = false
            //           this.smokeEmitter.destroy()
            //           var destroyTween = game.add.tween(this.ship).to({
            //             x: this.ship.x + game.rnd.between(-100, 100),
            //             y: this.ship.y - 100,
            //             rotation: 10
            //           }, 1000, Phaser.Easing.Linear.None, true)
            //           destroyTween.onComplete.add(function(){
            //             var explosionSound = game.add.audio("explosion")
            //             explosionSound.play()
            //             var explosionEmitter = game.add.emitter(this.ship.x, this.ship.y, 200)
            //             explosionEmitter.makeParticles("smoke")
            //             explosionEmitter.setAlpha(0.5, 1)
            //             explosionEmitter.minParticleScale = 0.5
            //             explosionEmitter.maxParticleScale = 2
            //             explosionEmitter.start(true, 2000, null, 200)
            //             this.ship.destroy()
            //             game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            //               game.state.start("GameOverScreen")
            //             })
            //           }, this)
          }

      }, this)
  },
  addBarrier: function(group, tintColor){
    var barrier = new Barrier(this.game, 5, tintColor)
    this.game.add.existing(barrier)
    group.add(barrier)
  }
}

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

























