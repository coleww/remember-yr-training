var boot = function(game){
  this.game = game
}
boot.prototype = {
  preload: function(){
    this.game.load.image("loading","assets/sprites/loading.png")
  },
  create: function(){
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.state.start("Preload")
  }
}
module.exports = boot
