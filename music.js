var adsr = require("a-d-s-r")

module.exports = function () {
  var ac = new (AudioContext || webkitAudioContext)()
  var snare = require("dj-snazzy-snare")(ac)
  var tom = require("tom-from-space")(ac)
  var kick = require("touch-down-dance")(ac)
  var hat = require("really-hi-hat")(ac)
  var wBass= require("warlock-bass")(ac)
  var bBass = require("bubble-bass")(ac)
  var piano = require("pie-ano")(ac)
  var sparkles = require("sparkle-motion")(ac)
  var mainVolume = ac.createGain()

  snare.connect(mainVolume)
  tom.connect(mainVolume)
  kick.connect(mainVolume)
  hat.connect(mainVolume)
  wBass.connect(mainVolume)
  bBass.connect(mainVolume)
  piano.connect(mainVolume)
  sparkles.connect(mainVolume)
  mainVolume.connect(ac.destination)

  return {
    fadeIn: function () {
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    fadeOut: function () {
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    start: function () {

    },
    stop: function () {

    }
  }
}