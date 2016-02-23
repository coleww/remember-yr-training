module.exports = function (health) {
  var health_assess, song, yay, nay
  if (health < 25) {
    health_assess = 'whoa, u should take it easy. you mumble out a sad tune:'
    song = makeSong(health)
    yay = 'hnnnnnnng'
  } else if (health < 50) {
    health_assess = 'u feeling ok? looking a little rough there. nevertheless you grab the mic like a champion:'
    song = makeSong(health)
    yay = 'mmmmmmmmm'

  } else if (health < 75) {
    health_assess = 'a lil tired but pushing on! you sing a lil ditty while you work:'
    song = makeSong(health)
    yay = 'awwwwwwww'

  } else {
    health_assess = 'feeling fine and looking good, you belt out a sweet song:'
    song = makeSong(health)
    yay = 'yyyyyeaaaaah'
  }
  return {
    name: health_assess,
    description: song,
    yes: yay,
    no: nay
  }
}

function makeSong (health) {
  // do some markov stuff
  return "🎶whooooooo ah ah ah bah dah dah dah yeah check it out 1, 1-2 uh🎶"
}