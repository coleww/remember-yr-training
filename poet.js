var markov = require('fast-ish-markov')
var instructions = require('./corpus/instructions')

var shorties = instructions.filter(function (line) {
  return line.length < 140
})

var longies = instructions.filter(function (line) {
  return line.length >= 140
})
var newbies = []
for (var i = 0; i < shorties.length; i += 2) {
  newbies.push(shorties[i] + ' ' + shorties[i + 1])
}

var m = markov(newbies.concat(longies).map(function (line) {
  return line.replace(/[^0-9A-Za-z ]/g, '')
}), 2)

module.exports = function (start) {
  if (start == undefined || !start.replace(/\s/g, '')) {
    // pick a rando start
    return m.fill(m.pick(), 2)
  } else {
    var words = m.fill(start, 3).split(' ')
    return words[words.length - 1]
  }
}