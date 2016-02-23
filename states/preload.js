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


    game.load.image("hp", "assets/sprites/hp.png")
    game.load.image("wallet", "assets/sprites/wallet.png")
    game.load.image("bag", "assets/sprites/bag.png")

    game.load.image("linedpaper", "assets/sprites/PaperDecoration_Lined.png")
    game.load.image("blankpaper", "assets/sprites/PaperDecoration_Blank.png")
    game.load.image("paper3", "assets/sprites/SinglePage.png")

    game.load.image("battery", "assets/sprites/vending/icon-power.png")
    game.load.image('ground', 'assets/sprites/gbground.png');
    game.load.spritesheet('cryobed', 'assets/sprites/cryobed.png', 64, 64);
    game.load.image('platform', 'assets/sprites/gbplat.png');
    game.load.spritesheet('dude', 'assets/sprites/protocoldroid2.png', 32, 48);



    // TODO: check if the player has a saved game
    set('inventory', [{name: 'battery', description: 'it looks sort of, plugged into you? maybe don\'t mess with it OK?', yes: 'w/e i do what i want it, unplug it', no: 'leave it alone ofc', sprite: 'battery', fx: 'gameOver1'}])
    set('seeds', [])
    set('currentDay', 0)
    set('wallet', 25)
    set('health', 100)
    set('alignment', {greed: 0, fight: 0, nature: 0, pos: 0, neg: 0})
    set('gameOver', false)












    game.computerStuff = [
            {name: 'on top of the world',
                        description: 'wow, what a view from up here. I can almost touch the sky! i think? no, that is just the ceiling. better be careful hopping down tho!',
        yes: 'think carefully about how to get down from here',
        no: 'think that this game probably does not have fall damage'},
        {name: 'control panel',
                        description: 'there is a gigantic switch here...you probably shouldn\'t push it though because you don\'t remember yr training or what it does :<',
        yes: 'back away slowly',
        no: 'aspire to push it one day',
        ifFaded: 'you are feeling bold, courageous, and decisive. push the button? '},
        {name: 'a huge computer machine',
                            description: 'it is making this wretched humming noise, i wonder if there is some way to stop it?',
        yes: 'think about the cooling system',
        no: 'try kicking it'},
        {name: 'broken down fan',
                        description: 'gosh it would be nice if this thing worked...it would be vvvvvvvvvvvvvv bad if this machine overheated!',
        yes: 'wonder if there is a tool that could fix it',
        no: 'wonder if there is a tool that would let you record the sweet noises it will probably make when it explodes and takes you with it!', ifPunch: {description: 'purring like a kitten', yes: 'yes it is, i did that, me. err, you. whomever, comrade.'}}

        ]
      game.tableStuff = [
        {name: 'Some book about stuff',
        description: 'yr pretty sure there is a PDF of it in yr memory banks somewhere *yawn*',
        yes: 'read it already', no: 'could not put it down! a real page turner, 5 stars'},
        {name: 'sad old mug',
        description: 'seems to contain...coffee? it is particularly sad looking, you think about smashing it',
        yes: 'remember drinking from it and decide to save the memories',
        no: 'take pity on the sad ceramic and resolve to find some super glue'},
        {name: 'a shelf of books',
                            description: 'wow there are some really good books here, unfortunately none of them are your training manual which u forgot :<',
        yes: 'struggle to remember your training',
        no: 'DGAF about the training you are here to party'},
        {name: 'Health Poster',
            description: 'a poster detailing the virtues of tofu in regards to your health. it seems a suspiciously bulgy',
            yes: 'tear that wall down!',
            no: 'respect the art...for now',
            fx: 'destroyWallArt1',
            item: {
                name: 'tofu dish',
                description: 'will replenish your health! and maybe more!',
                fx: 'hp25$10',
                yes: 'eat that thing',
                no: 'um it is jiggling a lil ~too~ weirdly for me'}},
        {name: 'Strength Poster',
            description: 'a poster detailing the virtues of tofu as it relates to getting hella swole and punching bad people. the poster itself seems suspiciously well built...',
            yes: 'grab that thing,take it down,HOOOOO RAHHHHHH',
            no: 'respect the art...for now',
            fx: 'destroyWallArt2',
            item: {
                name: 'tofu energy drink',
                description: 'the label is just a bunch of screaming in all caps',
                fx: 'canpunch',
                yes: 'chug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chug',
                no: 'i will pass'}}

      ]

  },
  create: function(){
    this.game.state.start("Bunker")
  }
}
module.exports = preload
