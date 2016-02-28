var song = {
  instruments: [
  {
    patterns: {
      verse: {
        notes: [
          [[0], [], [4, 0], []],
          [[0], [5], [4, 0], [2, 0]]
        ],
        probs: [
          [1, 0, 1, 0],
          [1, 0.5, 1, 0.75]
        ],
        currentVersion: 0,
        currentTick: 0,
        nexts: [[0, 0, 1], [1, 1, 1, 0]]
      },
      chorus: {
        notes: [
          [[0], [2, 0], [4, 5], [6, 6, 7]],
          [[], [5, 5, 2], [4, 0], [2, 0, 6]]
        ],
        probs: [
          [1, 0.25, 1, 0.25],
          [0, 0.5, 0.25, 0.75]
        ],
        currentVersion: 0,
        currentTick: 0,
        nexts: [[0, 0, 1], [1, 1, 1, 0]]
      },
      key: {
        tonic: 'A',
        scale: 'major'
      }
    }
  }
  ],
  current: 'verse',
  nexts: {
    verse: ['verse', 'verse', 'chorus'],
    chorus: ['chorus', null]
  },
  bpm: 120
}

var seqy = require('./potentialSequencerModule')
module.exports = function (ac, mainVolume) {
  // var snare = require("dj-snazzy-snare")(ac)
  // var tom = require("tom-from-space")(ac)
  // var kick = require("touch-down-dance")(ac)
  // var hat = require("really-hi-hat")(ac)
  // var wBass= require("warlock-bass")(ac)
  // var bBass = require("bubble-bass")(ac)
  var piano = require("pie-ano")(ac)
  // var sparkles = require("sparkle-motion")(ac)
  piano.connect(mainVolume)
  song.instruments[0].play = function (arg) {
    piano.update({midiNote: 69 + arg, attack: 0.3, decay: 0.1, sustain: 0.3, release: 0.5, peak: 0.5, mid: 0.3, end: 0.00000001}, ac.currentTime)
    piano.start(ac.currentTime)
  }
  return seqy(song)
  // snare.connect(mainVolume)
  // tom.connect(mainVolume)
  // kick.connect(mainVolume)
  // hat.connect(mainVolume)
  // wBass.connect(mainVolume)
  // bBass.connect(mainVolume)
  //
  // sparkles.connect(mainVolume)
}


