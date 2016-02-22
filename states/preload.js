var db = require('../db')
var get = db.get
var set = db.set

var preload = function(game){
  this.game = game
}
preload.prototype = {
  preload: function(){
    var game = this.game
    var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading")
    loadingBar.anchor.setTo(0.5)
    game.load.setPreloadSprite(loadingBar)
    game.load.image("blank", "assets/sprites/blank.gif")
    game.load.image("black", "assets/sprites/black.jpeg")
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

    game.load.image("parch", "assets/sprites/parchment.png")

    game.load.image("wallArt1", "assets/sprites/wallart/L3_WallDeco21.png")
    game.load.image("wallArt2", "assets/sprites/wallart/L3_WallDeco26.png")
    game.load.image("wallArt3", "assets/sprites/wallart/L3_WallDeco52.png")
    game.load.image("wallArt4", "assets/sprites/wallart/Scroll0023.png")
    game.load.image("wallArt5", "assets/sprites/wallart/Scroll0025.png")

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
    game.load.spritesheet("arrows", "assets/sprites/computer/arrows.png", 30, 25) // 4
    game.load.spritesheet("bars", "assets/sprites/computer/bars.png", 33.333333333333333333, 100) // 3
    game.load.spritesheet("circs", "assets/sprites/computer/circs.png", 25, 25) // 6
    game.load.spritesheet("squares", "assets/sprites/computer/squares.png", 30, 32) // 4
    game.load.spritesheet("ticks", "assets/sprites/computer/ticks.png", 25, 100) // 6
    game.load.spritesheet("switchy", "assets/sprites/computer/switch.png", 50, 34) // 2

    game.load.spritesheet("static", "assets/sprites/computer/dss.png", 64, 64)

    game.load.spritesheet("sweetbook", "assets/sprites/sweetbook.png", 28, 35) // 2
    game.load.image("BootsGreen", "assets/sprites/vending/CrystalsGreen.png")
    game.load.image("BootsSoft", "assets/sprites/vending/CrystalsBlue.png")
    game.load.image("BootsMetal", "assets/sprites/vending/CrystalsPurple.png")
    game.load.image("FoodAle", "assets/sprites/vending/FoodAle.png")
    game.load.image("FoodBread", "assets/sprites/vending/FoodBread.png")
    game.load.image("FoodDrumstick", "assets/sprites/vending/FoodDrumstick.png")
    game.load.image("GlovesGold", "assets/sprites/vending/LightStar.png")
    game.load.image("GlovesLeather", "assets/sprites/vending/LightChalice.png")
    game.load.image("GlovesSteel", "assets/sprites/vending/LightOrb.png")
    game.load.image("MushroomBrown", "assets/sprites/vending/HB_MushroomBrownSpotted.png")
    game.load.image("MushroomPurple", "assets/sprites/vending/HB_MushroomPurple.png")
    game.load.image("MushroomRed", "assets/sprites/vending/HB_MushroomRed.png")
    game.load.image("RobeB", "assets/sprites/vending/PotionAquamarine.png")
    game.load.image("RobeG", "assets/sprites/vending/PotionEmerald2.png")
    game.load.image("RobeR", "assets/sprites/vending/PotionShortRuby.png")
    game.load.image("Sword1", "assets/sprites/vending/Sword25.png")
    game.load.image("Sword2", "assets/sprites/vending/Sword26.png")
    game.load.image("Sword3", "assets/sprites/vending/SwordMedievalMagical.png")
    game.load.image("VialG", "assets/sprites/vending/VialGreen.png")
    game.load.image("VialR", "assets/sprites/vending/VialRed.png")
    game.load.image("VialY", "assets/sprites/vending/VialYellow.png")
    game.load.image("pebbles", "assets/sprites/vending/Jewels.png")
    game.load.image("key", "assets/sprites/vending/KeySkull.png")
    game.load.image("lantern", "assets/sprites/vending/LanternBronze.png")
    game.load.image("candle", "assets/sprites/candle.png")
    game.load.image("menu", "assets/sprites/Menu_2.png")
    game.load.image("ladder", "assets/sprites/ladder1.png")
    game.load.image("table", "assets/sprites/table.png")
    game.load.image("books", "assets/sprites/books.png")

    game.load.image("chair", "assets/sprites/chair.png")
    game.load.image("book1", "assets/sprites/Book.png")
    game.load.image("book2", "assets/sprites/Book2.png")
    game.load.image("mug", "assets/sprites/mug.png")
    game.load.image("jug", "assets/sprites/jug.png")
    game.load.image("pizza", "assets/sprites/pizza.png")
    game.load.image("papert", "assets/sprites/papertowlrolll.png")

    game.load.image("linedpaper", "assets/sprites/PaperDecoration_Lined.png")
    game.load.image("blankpaper", "assets/sprites/PaperDecoration_Blank.png")
    game.load.image("paper3", "assets/sprites/SinglePage.png")

    game.load.image('ground', 'assets/sprites/gbground.png');
    game.load.spritesheet('cryobed', 'assets/sprites/cryobed.png', 64, 64);
    game.load.image('platform', 'assets/sprites/gbplat.png');
    game.load.spritesheet('dude', 'assets/sprites/protocoldroid2.png', 32, 48);


    game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt")

    // TODO: check if the player has a saved game
    set('inventory', [{name: 'battery', description: 'it looks sort of, plugged into you? maybe don\'t mess with it OK?', fx: 'gameOver1'}])
    set('seeds', [])
    set('currentDay', 0)
    set('wallet', 25)

  },
  create: function(){
    this.game.state.start("TitleScreen")
  }
}
module.exports = preload
