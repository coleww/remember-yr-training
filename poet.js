var markov = require('fast-ish-markov')
// var tipots = require('this-is-probably-ok-to-say')
// var instructions = require('./corpus/instructions').concat(require('./corpus/shit')).concat(require('./corpus/fight')).concat(require('./corpus/greed')).concat(require('./corpus/nature')).filter(function (l) {
//   return tipots(l)
// })




// var shorties = instructions.filter(function (line) {
//   return line.length < 140
// })

// var longies = instructions.filter(function (line) {
//   return line.length >= 140
// })

// var newbies = []

// for (var i = 0; i < shorties.length; i += 2) {
//   newbies.push(shorties[i] + ' ' + shorties[i + 1])
// }
// var lines = newbies.concat(longies).map(function (line) {
//   return line.replace(/[^A-Za-z\s]/g, '').toLowerCase().replace(/\s+/g, ' ')
// })
// var m = markov(lines, 1)

// var fs = require('fs')

// fs.writeFileSync('theMarkov.json', JSON.stringify(m.chain))


var m = markov([], 1)
m.load(require('./theMarkov'))
module.exports = function (start) {
  if (start == undefined || !start.replace(/\s/g, '')) {
    // pick a rando start
    var res1 = m.fill(m.pick(), 1)
    while (res1.match(/slave/i)) { //
      res1 = m.fill(m.pick(), 1)
    }

    return res1
  } else {
    var words = m.fill(start, 2).split(' ')
    var res2 = words[words.length - 1]
    while (res2.match(/slave/i)) { //
        words = m.fill(start, 2).split(' ')
        res2 = words[words.length - 1]
    }
    return res2
  }
}