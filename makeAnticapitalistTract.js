module.exports = function (money, alignment) {
  var tract, yay, nay, wealth_assess = 'you have ' + money + '$ and you feel '

  var corpii = []


  // shovel onto the corpus
  if (money < 12 && isGreedy(alignment)) {
    // greedy character unhappy with income
    wealth_assess += pick(['crappy', 'bad', 'demoralized']) + ' about it'
  } else if (money > 12 && isNatural(alignment)) {
    // hippy character unhappy with wealth
    wealth_assess += pick(['like u should protest', 'like u should donate to a good cause', 'problematic']) + ' about it'
  } else if (money < 8 && money > 16 && isFight(alignment)) {
    // fighter wants only a modest living of blood
    wealth_assess += pick(['anguished to the core of your deep heart', 'a constant wave of dishonor', 'like fighting is the only way to do anything']) + ' about it'
  } else {
    wealth_assess += 'fine'
  }

  if (isPassive(alignment)) {
    if (money < 12) {

    } else {

    }
  } else if (isActive(alignment)) {
    if (money < 12) {

    } else {

    }
  } else {
    if (money < 12) {

    } else {

    }
  }


  return {
    name: wealth_assess,
    description: tract,
    yes: yay,
    no: nay
  }
}

function makeTract (health) {
  // do some markov stuff
  return "🎶whooooooo ah ah ah bah dah dah dah yeah check it out 1, 1-2 uh🎶"
}

function isGreedy (alignment) {

}

function isNatural (alignment) {

}

function isFight (alignment) {

}

function isPassive (alignment) {

}

function isActive (alignment) {

}