function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

function roll (prob) {
  return Math.random() < prob
}

module.exports = function (currentSong) {
  var song = currentSong
  var interval, nextSong
  return {
    start: function () {
      interval = setInterval(function () {
        song.instruments.forEach(function (instrument) {
          var pattern = instrument.patterns[song.current]
          if (roll(pattern.probs[pattern.currentVersion][pattern.currentTick])) {
            instrument.play(pattern.notes ? pick(pattern.notes[pattern.currentVersion][pattern.currentTick]) : undefined)
          }
        })
      }, 60000.0 / song.bpm)
    },
    stop: function () {
      clearInterval(interval)
    },
    update: function (theNextSong) {
      // the loop function should check for new songData when it hits an end of measure
      nextSong = theNextSong
    }
  }
}

// the play function on each instrument should take a params thing and play stuff in response.
// it deals with translating the integer to the whatever
// song ex.
// {
//   instruments: [
//     play({params}),
//     patterns: {
//       verse: {
//         notes: [
//           [[0], [], [4, 0], []],
//           [[0], [5], [4, 0], [2, 0]]
//         ],
//         probs: [
//           [1, 0, 1, 0],
//           [1, 0.5, 1, 0.75]
//         ],
//         currentVersion: 0,
//         currentTick: 0,
//         nexts: [[0, 0, 1], [1, 1, 1, 0]]
//       },
//       chorus: {
//         notes: [
//           [[0], [2, 0], [4, 5], [6, 6, 7]],
//           [[], [5, 5, 2], [4, 0], [2, 0, 6]]
//         ],
//         probs: [
//           [1, 0.25, 1, 0.25],
//           [0, 0.5, 0.25, 0.75]
//         ],
//         currentVersion: 0,
//         currentTick: 0,
//         nexts: [[0, 0, 1], [1, 1, 1, 0]]
//       },
    //   key: {
    //     tonic: 'A',
    //     scale: 'major'
    //   }
//     }

//   ],
//   current: 'verse',
//   nexts: {
//     verse: ['verse', 'verse', 'chorus'],
//     chorus: ['chorus', null]
//   }
//   bpm: 120
// }