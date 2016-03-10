var markov = require('fast-ish-markov')
var corpus = require('./corpus/shit')

var seeds = {
  fight: require('./corpus/fight'),
  greed: require('./corpus/greed'),
  nature: require('./corpus/nature')
}
var tipots = require('this-is-probably-ok-to-say')
module.exports = function (alignment) {
  corpus = corpus.concat(seeds[alignment])
  var shorties = corpus.filter(function (line) {
    return line && line.length < 140
  })

  var longies = corpus.filter(function (line) {
    return line && line.length >= 140
  })
  var newbies = []
  for (var i = 0; i < shorties.length; i += 2) {
    newbies.push(shorties[i] + ' ' + shorties[i + 1])
  }

  var m = markov(newbies.concat(longies).map(function (line) {
    return line.replace(/[^0-9A-Za-z ]/g, '').toLowerCase()
  }).filter(function (l) {return tipots(l)}), 1)


  return function () {
    return m.fill(m.pick(), 3 + ~~(Math.random() * 2))
  }



  // if (start == undefined || !start.replace(/\s/g, '')) {
  //   // pick a rando start
  //   return m.fill(m.pick(), 2)
  // } else {
  //   var words = m.fill(start, 3).split(' ')
  //   return words[words.length - 1]
  // }
}