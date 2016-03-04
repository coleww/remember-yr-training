var db = require('../db')
var get = db.get
var set = db.set

// construct markov poet barrier maker thing based on their choices or lack thereof
// save which lines they touch
// make enemies? explosions? slowly rising fire?
// lol put random stuff to inspect along the way

var Silo = function(game){
  this.game = game
}
Silo.prototype = {
  preload: function(){
  },
  create: function(){
    alert('NEW LEVEL! YAY!')
    var launchedTheMissiles = get('launched')
    var isFaded = get('escapingDrunkenly')

    if (launchedTheMissiles) {
      // there will be enemies and fast tense music and explosions and u will have to move fast
    } else {
      // there will be no enemies and u can take as long as u want and inspect hte random objects on the platforms
    }
  }
}


module.exports = Silo