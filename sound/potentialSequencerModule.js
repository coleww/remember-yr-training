function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

function roll (prob) {
  return Math.random() < prob
}

// ADD
// - modulus
// - randos? flipsies?

module.exports = function (currentSong) {
  var song = currentSong
  var interval, nextSong
  return {
    start: function () {
      interval = setInterval(function () {
        Object.keys(song.instruments).forEach(function (k) {
          var instrument = song.instruments[k]
          var pattern = instrument.patterns[song.current]
          pattern.currentTick++
          if (pattern.currentTick == pattern.probs[pattern.currentVersion].length - 1) {
            pattern.currentTick = 0
            pattern.currentVersion = pick(pattern.nexts[pattern.currentVersion])
            // console.log('WEEEE', pattern.currentVersion)
            if (instrument.lead) {
              song.current = pick(song.nexts[song.current])
              if (!song.current) alert('it is over')
              console.log('SWITCHY', song.current)
            }
          }
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
