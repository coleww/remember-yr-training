var db = require('../db')
var get = db.get

var preload = function(game){
  this.game = game
}
preload.prototype = {
  preload: function(){
    var game = this.game
    var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading")
    loadingBar.anchor.setTo(0.5)
    game.load.setPreloadSprite(loadingBar)
    game.load.image("title", "assets/sprites/title.png")
    game.load.image("playbutton", "assets/sprites/playbutton.png")
    game.load.image("backsplash", "assets/sprites/backsplash.png")
    game.load.image("tunnelbg", "assets/sprites/tunnelbg.png")
    game.load.image("wall", "assets/sprites/wall.png")
    game.load.image("ship", "assets/sprites/ship.png")
    game.load.image("smoke", "assets/sprites/smoke.png")
    game.load.image("barrier", "assets/sprites/barrier.png")
    game.load.image("separator", "assets/sprites/separator.png")
    game.load.image("vend", "assets/sprites/vend.png")
    game.load.image("walll", "assets/sprites/wall.jpg")
    game.load.image("wallll", "assets/sprites/metal_wall_1.jpg")
    game.load.image("walllll", "assets/sprites/vent_5_spec.jpg")
    game.load.image("chute", "assets/sprites/metal_ground_2.jpg")
    game.load.image("grid", "assets/sprites/metal_grid_1.jpg")

    game.load.image("base", "assets/sprites/computer/container_1.png")
    game.load.image("butts", "assets/sprites/computer/misc_2.jpg")
    game.load.image("speaker", "assets/sprites/computer/obj_speaker001.png")
    game.load.image("tv", "assets/sprites/computer/obj_tv001.png")
    game.load.image("radio", "assets/sprites/computer/obj_radio001.png")
    game.load.image("fan", "assets/sprites/computer/obj_fan001.png")
    game.load.image("mach", "assets/sprites/computer/theMachine.png")
    game.load.image("siren", "assets/sprites/computer/policecar_n.png")
    game.load.image("bulb", "assets/sprites/computer/car1.png")
    game.load.image("fuse", "assets/sprites/computer/bus.png")


    game.load.image("ladder", "assets/sprites/ladder1.png")

    game.load.image('ground', 'assets/sprites/gbground.png');
    game.load.spritesheet('cryobed', 'assets/sprites/cryobed.png', 64, 64);
    game.load.image('platform', 'assets/sprites/gbplat.png');
    game.load.spritesheet('dude', 'assets/sprites/protocoldroid2.png', 32, 48);


    game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt")
    game.load.audio("explosion", ["assets/sounds/explosion.mp3", "assets/sounds/explosion.ogg"])

    // TODO: check if the player has a saved game
    game.inventory = [{name: 'battery', description: 'it looks sort of, plugged into you? maybe don\'t mess with it OK?', fx: 'gameOver1'}]
    game.wallet = 25

  },
  create: function(){
    this.game.state.start("Bunker")
  }
}
module.exports = preload
