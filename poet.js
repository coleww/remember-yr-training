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

var tipots = require('this-is-probably-ok-to-say')
var m = markov([], 1)
m.load(require('./theMarkov'))
module.exports = function (start) {
  if (start == undefined || !start.replace(/\s/g, '')) {
    // pick a rando start
    var res1 = m.fill(m.pick(), 1)
    // erm, i could see this leading to bad things, but editing them out of the markov chain now would be a pain, and i hate this codebase and just want to release this so it wasn't a total waste of time, i mean, it did help me learn that i hates games development passionately why do people do this idgi. perhaps a twine game next time.
    while (res1.match(/slave|ass|shit|bitch|fuck|cunt|slut|poon|gay|trans/i) || !tipots(res1)) { //
      res1 = m.fill(m.pick(), 1)
    }

    return res1
  } else {
    var words = m.fill(start, 2).split(' ')
    var res2 = words[words.length - 1]
    // erm, i could see this leading to bad things, but editing them out of the markov chain now would be a pain, and i hate this codebase and just want to release this so it wasn't a total waste of time, i mean, it did help me learn that i hates games development passionately why do people do this idgi. perhaps a twine game next time.
    while (res2.match(/slave|ass|shit|bitch|fuck|cunt|slut|poon|gay|trans/i) || !tipots(res2)) { //
        words = m.fill(start, 2).split(' ')
        res2 = words[words.length - 1]
    }
    return res2
  }
}