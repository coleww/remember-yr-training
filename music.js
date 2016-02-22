var adsr = require("a-d-s-r")
var seq = require('./sound/sequencer')
var fx = require('./sound/fx')
// var // REQUIRE ALL OF THE STUFF IN /songs

module.exports = function () {
  var ac = new (AudioContext || webkitAudioContext)()
  var mainVolume = ac.createGain()
  var sequencer = seq(ac, mainVolume)
  var foley = fx(ac, mainVolume)
  mainVolume.connect(ac.destination)



  return {
    playFX: function (fx) {
      foley.play(fx)
    },
    fadeIn: function () {
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    fadeOut: function () {
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    start: function (pattern) {
      sequencer.start(pattern)
    },
    stop: function () {
      foley.stop()
      sequencer.stop()
    },
    change: function (newPattern) {
      sequencer.updateNext(newPattern)
    },
    setMainVolume: function (val) {

    },
    setFXVolume: function (val) {

    },
    setMusicVolume: function (val) {

    }
  }
}