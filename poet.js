var markov = require('fast-ish-markov')
var instructions = require('./corpus/instructions')
var m = markov(instructions, 2)
// erm maybe construct this each time based on the twine choices at the vending machine?


module.exports = function (start) {
  if (start == undefined || !start.replace(/\s/g, '')) {
    // pick a rando start
    return m.fill(m.pick(), 2)
  } else {
    var words = m.fill(start, 3).split(' ')
    return words[words.length - 1]
  }
}