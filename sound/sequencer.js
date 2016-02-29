var song = require('../songs/bunker')
var int2freq = require('int2freq')
var seqy = require('./potentialSequencerModule')
module.exports = function (ac, mainVolume) {
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
  Object.keys(insts).forEach(function(k) {
    insts[k].connect(mainVolume)
    song.instruments[k].play = function (arg) {
      if (song.instruments[k].melodic) insts[k].update({freq: int2freq(arg, song.key), attack: 0.3, decay: 0.1, sustain: 0.3, release: 0.5, peak: 0.5, mid: 0.3, end: 0.00000001}, ac.currentTime)
      insts[k].start(ac.currentTime)
    }
  })

  song.instruments[0]
  return seqy(song)
}


