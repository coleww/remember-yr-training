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
  var interval, nextSong, globalTick = 0, song = currentSong
  return {
    start: function () {
      if (interval) throw('wtf')
      interval = setInterval(function () {
        globalTick++
        Object.keys(song.instruments).forEach(function (k) {
          var instrument = song.instruments[k]
          var pattern = instrument.patterns[song.current]

          if (roll(pattern.probs[pattern.currentVersion][pattern.currentTick]) && globalTick % (pattern.mod || 1) == 0) {
            instrument.play(pattern.notes ? pick(pattern.notes[pattern.currentVersion][pattern.currentTick]) : undefined)
          }
          pattern.currentTick++
          if (pattern.currentTick == pattern.probs[pattern.currentVersion].length) {
            pattern.currentTick = 0
            pattern.currentVersion = pick(pattern.nexts[pattern.currentVersion])
            // console.log('WEEEE', pattern.currentVersion)
            if (instrument.lead) {
              // if (nextSong) song = nextSong, nextSong = null
              song.current = pick(song.nexts[song.current])
              if (!song.current) alert('it is over')
              // console.log('SWITCHY', song.current)
            }
          }
        })
      }, 60000.0 / song.bpm)
    },
    stop: function () {
      clearInterval(interval)
    },
    update: function (theNextSong) {
      // the loop function should check for new songData when it hits an end of measure? eh
      song = theNextSong
    }
  }
}

// the play function on each instrument should take a params thing and play stuff in response.
// it deals with translating the integer to the whatever
// song ex.
