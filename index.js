var boot = require('./states/boot')
var preload = require('./states/preload')
var titleScreen = require('./states/title')
var daySwitch = require('./states/dayswitch')
var Bunker = require('./states/bunker')
var Silo = require('./states/silo')
var Outside = require('./states/outside')
var gameOverScreen = require('./states/game_over')
var reset = require('./states/reset')
window.onload = function() {
  var width = 640
  var height = 960
  var windowRatio = window.innerWidth / window.innerHeight
  if(windowRatio < width / height){
      var height = width / windowRatio
  }
  Phaser.Time.desiredFps = 30
  var game = new Phaser.Game(width, height, Phaser.AUTO, "")
  game.musician = require('./music')()

  // game.add.plugin(Phaser.Plugin.Debug);
  game.state.add("Boot", boot)
  game.state.add("Preload", preload)
  game.state.add("TitleScreen", titleScreen)
  game.state.add("Bunker", Bunker)
  game.state.add("DaySwitch", daySwitch)
  game.state.add("Silo", Silo)
  game.state.add("Outside", Outside)
  game.state.add("GameOverScreen", gameOverScreen)
  game.state.add("Reset", reset)
  game.state.start("Boot")
}
