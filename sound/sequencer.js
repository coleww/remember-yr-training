
module.exports = function (ac) {
  var snare = require("dj-snazzy-snare")(ac)
  var tom = require("tom-from-space")(ac)
  var kick = require("touch-down-dance")(ac)
  var hat = require("really-hi-hat")(ac)
  var wBass= require("warlock-bass")(ac)
  var bBass = require("bubble-bass")(ac)
  var piano = require("pie-ano")(ac)
  var sparkles = require("sparkle-motion")(ac)


  snare.connect(mainVolume)
  tom.connect(mainVolume)
  kick.connect(mainVolume)
  hat.connect(mainVolume)
  wBass.connect(mainVolume)
  bBass.connect(mainVolume)
  piano.connect(mainVolume)
  sparkles.connect(mainVolume)
}