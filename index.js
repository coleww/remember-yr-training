require('./screenShake.js')
var boot = require('./states/boot')
var preload = require('./states/preload')
var titleScreen = require('./states/title')
var daySwitch = require('./states/dayswitch')
var Bunker = require('./states/bunker')
var Silo = require('./states/silo')
var deathPit = require('./states/deathPit')
var ending = require('./states/ending')
var greed = require('./states/greed')
var fight = require('./states/fight')
var nature = require('./states/nature')
var conflicted = require('./states/conflicted')
var gameOverScreen = require('./states/game_over')
var reset = require('./states/reset')
var MobileDetect = require('mobile-detect')

var md = new MobileDetect(window.navigator.userAgent);

if (md.mobile()) {
  var note = document.createElement('h1')
  note.textContent = ':< sorry, this game does not work too well on mobile devices :<'
  document.body.appendChild(note)
} else {

    window.onload = function() {
      // console.log(Phaser.Plugin.ScreenShake)

      var width = 640
      var height = 960
      var windowRatio = window.innerWidth / window.innerHeight
      if(windowRatio < width / height){
          var height = width / windowRatio
      }
      Phaser.Time.desiredFps = 30
      var game = new Phaser.Game(width, height, Phaser.AUTO, "")
      game.musician = require('./music')()
      console.log(game.plugins)
        game.musician.start()

      // game.add.plugin(Phaser.Plugin.Debug);
      game.state.add("Boot", boot)
      game.state.add("Preload", preload)
      game.state.add("TitleScreen", titleScreen)
      game.state.add("Bunker", Bunker)
      game.state.add("DaySwitch", daySwitch)
      game.state.add("DeathPit", deathPit)
      game.state.add("Silo", Silo)
      game.state.add("GameOverScreen", gameOverScreen)
      game.state.add("greed", greed)
      game.state.add("fight", fight)
      game.state.add("ending", ending)
      game.state.add("nature", nature)
      game.state.add("conflicted", conflicted)
      game.state.add("Reset", reset)
      game.state.start("Boot")
    }
}

