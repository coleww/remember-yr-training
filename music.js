var adsr = require("a-d-s-r")
var fx = require('./sound/fx')
// var // REQUIRE ALL OF THE STUFF IN /songs
var merge = require('merge')

var features = require('./features')
var songs = {
  daySwitch: require('./songs/daySwitch'),
  deathPit: require('./songs/deathPit'),
  // happyEnding: require('./songs/happyEnding'),
  // sadEnding: require('./songs/sadEnding'),
  // secretEnding: require('./songs/secretEnding'),
  // silo: require('./songs/silo'),
  // vending: require('./songs/vending'),
  outside: require('./songs/outside'),
  tense: require('./songs/tense'),
  poetry: require('./songs/poetry'),
  bunker: require('./songs/bunker'),
  title: require('./songs/title')
}

var int2freq = require('int2freq')
var seqy = require('./sound/potentialSequencerModule')

module.exports = function () {
  var ac = new (AudioContext || webkitAudioContext)()

  var mainVolume = ac.createGain()
  var sequencer = seqy(songs.title)
  var foley = fx(ac, mainVolume)
  mainVolume.connect(ac.destination)
  mainVolume.gain.setValueAtTime(0, ac.currentTime)
  var insts = {
    snare: require("dj-snazzy-snare")(ac),
    tom: require("tom-from-space")(ac),
    kick: require("touch-down-dance")(ac),
    hat: require("really-hi-hat")(ac),
    wBass: require("warlock-bass")(ac),
    bBass: require("bubble-bass")(ac),
    piano: require("pie-ano")(ac),
    sparkles: require("sparkle-motion")(ac)
  }
Object.keys(insts).forEach(function(ik) {
      insts[ik].connect(mainVolume)
    })

  Object.keys(songs).forEach(function(sk) {
    Object.keys(songs[sk].instruments).forEach(function(ik) {
        songs[sk].instruments[ik].play = function (arg) {
          var configs = songs[sk].instruments[ik].config || {}
          var multi = songs[sk].instruments[ik].multi || 1
          var note = songs[sk].instruments[ik].melodic ? {freq: int2freq(arg, songs[sk].key) * multi} : {}

          insts[ik].update(merge(note, configs), ac.currentTime)
          insts[ik].start(ac.currentTime)
        }
    })
  })

  return {
    playFX: function (fx) {
      foley.play(fx)
    },
    fadeIn: function () {
      mainVolume.gain.linearRampToValueAtTime(0.75, ac.currentTime + 7)
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    fadeOut: function () {
      mainVolume.gain.linearRampToValueAtTime(0, ac.currentTime + 5)
      // adsr(mainVolume, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})
    },
    start: function () {
      if (features.playMusic)  sequencer.start()
    },
    stop: function () {
      foley.stop()
      sequencer.stop()
    },
    change: function (newPattern) {
      sequencer.update(songs[newPattern])
    },
    setMainVolume: function (val) {

    },
    setFXVolume: function (val) {

    },
    setMusicVolume: function (val) {

    },
    stopAlarm: function () {foley.stopAlarmNoise()},
    updateComputerNoise: function (g,x,y, z, a) {foley.updateComputerNoise(g, x, y, z, a)},
    stopComputerNoise: function (g,x,y) {
      foley.stopComputerNoise()
    },
    startComputerNoise: function (g,x,y) {
      foley.startComputerNoise()
    }
  }
}