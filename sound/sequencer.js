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

  return seqy()
}


