var markov = require('fast-ish-markov')
var instructions = require('./corpus/instructions')
var m = markov(instructions, 2)



module.exports = function (start) {
  if (start == undefined) {
    // pick a rando start
    return m.fill(m.pick(), 3)
  } else {
    return m.fill(start, 1)
  }
}