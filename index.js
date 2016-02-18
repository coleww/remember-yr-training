var Phaser = require('phaser')
var game
var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c]
var tunnelWidth = 256;
var shipHorizontalSpeed = 100;
var shipMoveDelay = 0;
var shipVerticalSpeed = 15000;

window.onload = function() {
  game = new Phaser.Game(640, 960, Phaser.AUTO, "")
     game.state.add("Boot", boot)
     game.state.add("Preload", preload)
     game.state.add("TitleScreen", titleScreen)
     game.state.add("Bunker", playGame)
     game.state.add("Twine", playGame)
     game.state.add("Silo", playGame)
     game.state.add("GameOverScreen", gameOverScreen)
     game.state.start("Boot")
}

var boot = function(game){}
boot.prototype = {
    preload: function(){
          this.game.load.image("loading","assets/sprites/loading.png")
  },
    create: function(){
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.state.start("Preload")
  }
}

var preload = function(game){}
preload.prototype = {
  preload: function(){
          var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading")
          loadingBar.anchor.setTo(0.5)
          game.load.setPreloadSprite(loadingBar)
          game.load.image("title", "assets/sprites/title.png")
          game.load.image("playbutton", "assets/sprites/playbutton.png")
          game.load.image("backsplash", "assets/sprites/backsplash.png")game.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
          game.load.image("wall", "assets/sprites/wall.png");
          game.load.image("ship", "assets/sprites/ship.png");
          game.load.image("smoke", "assets/sprites/smoke.png");
  },
    create: function(){
    this.game.state.start("TitleScreen")
  }
}

var titleScreen = function(game){}
titleScreen.prototype = {
  create: function(){
    var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash")
    titleBG.tint = bgColors[game.rnd.between(0, bgColors.length - 1)]
    var title = game.add.image(game.width / 2, 210, "title")
    title.anchor.set(0.5)
    var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame)
    playButton.anchor.set(0.5)
    var tween = game.add.tween(playButton).to({
      width: 220,
      height:220
    }, 1500, "Linear", true, 0, -1)
    tween.yoyo(true)
  },
  startGame: function(){
    game.state.start("Bunker")
  }
}

var Bunker = function(game){}
Bunker.prototype = {
  create: function(){
    console.log("in the bunker")
  }
}

var Twine = function(game){}
Twine.prototype = {
  create: function(){
    console.log("doing the twine thing")
  }
}

var Silo = function(game){}
Silo.prototype = {
  create: function(){
          var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)]
          var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
          tunnelBG.tint = tintColor;
          var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "wall");
          leftWallBG.tint = tintColor;
          var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "wall");
          rightWallBG.tint = tintColor;
          rightWallBG.tileScale.x = -1;
          this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32];
          this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
          this.ship.side = 0;
          this.ship.canMove = true;
          this.ship.anchor.set(0.5);
          game.physics.enable(this.ship, Phaser.Physics.ARCADE);
          game.input.onDown.add(this.moveShip, this);
          this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20);
          this.smokeEmitter.makeParticles("smoke");
          this.smokeEmitter.setXSpeed(-15, 15);
          this.smokeEmitter.setYSpeed(50, 150);
          this.smokeEmitter.setAlpha(0.5, 1);
          this.smokeEmitter.start(false, 1000, 40);
          this.verticalTween = game.add.tween(this.ship).to({
               y: 0
          }, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
     },
     moveShip: function(){
          if(this.ship.canMove){
               this.ship.canMove = false;
               this.ship.side = 1 - this.ship.side;
               var horizontalTween = game.add.tween(this.ship).to({
                    x: this.shipPositions[this.ship.side]
               }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
               horizontalTween.onComplete.add(function(){
                    game.time.events.add(shipMoveDelay, function(){
                         this.ship.canMove = true;
                    }, this);
               }, this);
               var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
               ghostShip.alpha = 0.5;
               ghostShip.anchor.set(0.5);
               var ghostTween = game.add.tween(ghostShip).to({
                    alpha: 0
               }, 350, Phaser.Easing.Linear.None, true);
               ghostTween.onComplete.add(function(){
                    ghostShip.destroy();
               });
          }
     },
     update: function(){
          this.smokeEmitter.x = this.ship.x;
          this.smokeEmitter.y = this.ship.y;
     }
}

var gameOverScreen = function(game){}
gameOverScreen.prototype = {
}