var db = require('../db')
var get = db.get
var set = db.set
var features = require('../features')
var preload = function(game){
  this.game = game
}
preload.prototype = {
  preload: function(){
    var game = this.game
    var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading")
    loadingBar.anchor.setTo(0.5)
    game.load.setPreloadSprite(loadingBar)






    game.load.image("bluesky", "assets/sprites/bgs/mrsbluesky.png")















    game.load.image("crumbledplatform", "assets/sprites/deathpit/crumbledplatform.png")


    game.load.image("body1", "assets/sprites/deathpit/body1.png")
    game.load.image("boxen", "assets/sprites/box.png")

    game.load.image("jetpack", "assets/sprites/jetpack.png")
    game.load.image("body2", "assets/sprites/deathpit/body2.png")

    game.load.image("web", "assets/sprites/deathpit/web.png")
game.load.image("skull", "assets/sprites/deathpit/skull.png")




    game.load.image("pots", "assets/sprites/deathpit/pots.png")

    game.load.image("wall_2", "assets/sprites/deathpit/wall_2.png")


     game.load.spritesheet("torchy", "assets/sprites/deathpit/torch.png", 32, 48)


     game.load.spritesheet("the_coin_spinny", "assets/sprites/coin_sheet.png", 40.333333333333336, 42)






    game.load.image("bg32", "assets/sprites/background_32.png")

    game.load.image("blank", "assets/sprites/blank.png")
    game.load.image("damage", "assets/sprites/damage.png")
    game.load.image("black", "assets/sprites/black.png")
    game.load.image("title", "assets/sprites/title.png")
    game.load.image("playbutton", "assets/sprites/playbutton.png")
    game.load.image("backsplash", "assets/sprites/backsplash.png")
    game.load.image("tunnelbg", "assets/sprites/tunnelbg.png")
    game.load.image("wall", "assets/sprites/wall.png")
    game.load.spritesheet("boss", "assets/sprites/boss.png", 96, 96)
    game.load.spritesheet("trippyb", "assets/sprites/trippyb.png", 96, 96)
    game.load.image("breaded", "assets/sprites/breaded.png")
    game.load.image("ship", "assets/sprites/ship.png")
    game.load.image("smoke", "assets/sprites/smoke.png")
    game.load.image("barrier", "assets/sprites/barrier.png")
    game.load.image("separator", "assets/sprites/separator.png")
    game.load.image("vend", "assets/sprites/vend.png")
    game.load.image("walll", "assets/sprites/wall.png")
    game.load.image("wallll", "assets/sprites/metal_wall_1.png")
    game.load.image("walllll", "assets/sprites/vent_5_spec.png")
    game.load.image("chute", "assets/sprites/metal_ground_2.png")
    game.load.image("grid", "assets/sprites/metal_grid_1.png")


    game.load.image("portal", "assets/sprites/portal.png")


    game.load.image("rainbow1", "assets/sprites/rainbow.png")

    game.load.image("rainbow2", "assets/sprites/RainbowBall.png")

    game.load.image("unicorn", "assets/sprites/Unicorn.png")



    game.load.spritesheet("dsbg0", "assets/sprites/dsbg0.png", 93, 95)
    game.load.spritesheet("dsbg1", "assets/sprites/dsbg1.png", 93, 95)


    game.load.spritesheet("dsbg2", "assets/sprites/dsbg2.png", 93, 95)


    game.load.spritesheet("dsbg3", "assets/sprites/dsbg3.png", 93, 95)

    game.load.spritesheet("dsbg4", "assets/sprites/dsbg4.png", 93, 95)

    game.load.image("ecto", "assets/sprites/ecto.png")
    game.load.image("son", "assets/sprites/son.png")





    game.load.image("tofudrink", "assets/sprites/tofudrink.png")
    game.load.image("burger", "assets/sprites/burger.png")
    game.load.image("fist", "assets/sprites/fist.png")
    game.load.image("parch", "assets/sprites/parchment.png")

    game.load.image("wallArt1", "assets/sprites/wallart/L3_WallDeco21.png")
    game.load.image("wallArt2", "assets/sprites/wallart/L3_WallDeco26.png")
    game.load.image("wallArt3", "assets/sprites/wallart/L3_WallDeco52.png")
    game.load.image("wallArt4", "assets/sprites/wallart/Scroll0023.png")
    game.load.image("wallArt5", "assets/sprites/wallart/Scroll0025.png")


    game.load.image("barry", "assets/sprites/barry.png")
    game.load.image("nattymtns", "assets/sprites/bgs/nattymtns.png")

    game.load.image("nattysky", "assets/sprites/bgs/nattysky.png")
    game.load.image("nattygrass", "assets/sprites/bgs/nattygrass.png")
    game.load.image("nattymtn", "assets/sprites/bgs/nattymtn.png")
    game.load.image("nattyclouds", "assets/sprites/bgs/nattyclouds.png")
    game.load.image("nattybgrounds", "assets/sprites/bgs/nattybgrounds.png")
    game.load.image("nattyduo", "assets/sprites/bgs/nattyduo.png")
    game.load.image("nattylight", "assets/sprites/bgs/nattylight.png")
    game.load.image("nattyfg", "assets/sprites/bgs/nattyfg.png")
    game.load.image("WaterFountain", "assets/sprites/bgs/WaterFountain.png")
    game.load.image("treeee", "assets/sprites/bgs/treeee.png")
    game.load.image("tinytree", "assets/sprites/bgs/tinytree.png")
    game.load.image("spooky_trees", "assets/sprites/bgs/spooky_trees.png")
    game.load.image("nothertree", "assets/sprites/bgs/nothertree.png")
    game.load.image("lilgrass", "assets/sprites/bgs/lilgrass.png")
    game.load.image("grass", "assets/sprites/bgs/grass.png")
    game.load.image("flower", "assets/sprites/bgs/flower.png")
    game.load.image("dirt", "assets/sprites/bgs/dirt.png")
    game.load.image("bigtree", "assets/sprites/bgs/bigtree.png")
    game.load.image("anotherbigtreee", "assets/sprites/bgs/anotherbigtreee.png")
    game.load.spritesheet("spinning_banana", "assets/sprites/animals/spinning_banana.png", 50, 25)
    game.load.spritesheet("horse", "assets/sprites/animals/horse.png", 90, 64)
    game.load.image("cow", "assets/sprites/animals/cow.png")
    game.load.image("drag", "assets/sprites/animals/drag.png")
    game.load.spritesheet("kiwi", "assets/sprites/animals/kiwix2.png", 104, 66)
    game.load.spritesheet("owl", "assets/sprites/animals/owl_vander.png", 15, 20)
    game.load.image("penguin", "assets/sprites/animals/penguin_pixeled.png")
    game.load.spritesheet("catone", "assets/sprites/animals/catspritesx2.png", 100, 74)
    game.load.spritesheet("rabbit", "assets/sprites/animals/rabbit_walk.png", 16, 16)
    game.load.spritesheet("spritesheet", "assets/sprites/animals/spritesheet.png", 90, 60)
    game.load.spritesheet("fanworking", "assets/sprites/computer/fanworking.png", 96, 96)





    game.load.spritesheet("blinky1", "assets/sprites/computer/blinky1.png", 16, 46)
    game.load.spritesheet("blinky2", "assets/sprites/computer/blinky2.png", 16, 45)
    game.load.image("earpiece", "assets/sprites/computer/earpiece.png")

    game.load.image("Cog", "assets/sprites/computer/Cog.png")
    game.load.image("Cog2", "assets/sprites/computer/Cog2.png")




    game.load.image("pipe", "assets/sprites/bgs/pipe-top.png")













    game.load.image("weedbag", "assets/sprites/weedbag.png")

    game.load.image("redmtn", "assets/sprites/bgs/redmtn.png")

    game.load.image("bldng", "assets/sprites/bgs/buildings-layer.png")
    game.load.image("pumpkin", "assets/sprites/pumpkin.png")
    game.load.image("friend", "assets/sprites/friend.png")
    game.load.image("base", "assets/sprites/computer/container_1.png")
    game.load.image("butts", "assets/sprites/computer/misc_2.png")
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

    game.load.image("fireball", "assets/sprites/plosions/fireball.png")

    game.load.image("nuke", "assets/sprites/Castle_Romeo.png")
    game.load.image("fireblast", "assets/sprites/plosions/fireblast.png")

    game.load.image("flame", "assets/sprites/plosions/flame.png")
    game.load.spritesheet("sweetbook", "assets/sprites/sweetbook.png", 28, 35) // 2
    game.load.image("BootsGreen", "assets/sprites/vending/CrystalsGreen.png")
    game.load.image("BootsSoft", "assets/sprites/vending/CrystalsBlue.png")
    game.load.image("BootsMetal", "assets/sprites/vending/CrystalsPurple.png")
    game.load.image("FoodAle", "assets/sprites/vending/FoodAle.png")
    game.load.image("FoodBread", "assets/sprites/vending/FoodBread.png")
    game.load.image("FoodDrumstick", "assets/sprites/vending/FoodDrumstick.png")
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
    game.load.image("instructions", "assets/sprites/vending/instructions.png")
    game.load.image("bloodnote", "assets/sprites/vending/bloodynote.png")
    game.load.image("poemsbook", "assets/sprites/vending/how2poem.png")
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
    game.load.image("paw", "assets/sprites/paw.png")
    game.load.image("bricky", "assets/sprites/birck.png")
    game.load.image("pizza", "assets/sprites/pizza.png")
    game.load.image("papert", "assets/sprites/papertowlrolll.png")

    game.load.image("tree", "assets/sprites/tree.png")
    game.load.image("bloodsculpt", "assets/sprites/bloodsculpt.png")

    game.load.image("hp", "assets/sprites/hp.png")
    game.load.image("wallet", "assets/sprites/wallet.png")
    game.load.image("bag", "assets/sprites/bag.png")

    game.load.image("linedpaper", "assets/sprites/PaperDecoration_Lined.png")
    game.load.image("blankpaper", "assets/sprites/PaperDecoration_Blank.png")
    game.load.image("paper3", "assets/sprites/SinglePage.png")
   game.load.image("arrow", "assets/sprites/rodyk.png")
    game.load.image("battery", "assets/sprites/vending/icon-power.png")
    game.load.image('ground', 'assets/sprites/gbground.png');
    game.load.spritesheet('cryobed', 'assets/sprites/cryobed.png', 64, 64);
    game.load.image('platform', 'assets/sprites/gbplat.png');
    game.load.spritesheet('dude', 'assets/sprites/protocoldroid2.png', 32, 48);
    game.load.spritesheet('bluedude', 'assets/sprites/bluedroid2.png', 32, 48);
    game.load.spritesheet('greendude', 'assets/sprites/greendroid2.png', 32, 48);



    // TODO: check if the player has a saved game

    var itIsTheVeryFirstTime = !get('playCount')
    var itIsANewGame = true

    if (itIsTheVeryFirstTime) {
        set('playCount', 1)
        set('poemCount', 0)
    }

    if (itIsANewGame) {
        set('siloDeaths', 0)
        set('fanStillBroken', features.fanOff)
        set('wall1', true)
        set('wall2', true)
        set('inventory', [{name: 'battery', description: 'it looks sort of, plugged into you? maybe don\'t mess with it OK?', yes: 'w/e i do what i want it, unplug it', no: 'leave it alone ofc', sprite: 'battery', fx: 'gameOver1'}])
        set('seeds', [])
        set('currentDay', features.currentDay)
        set('wallet', 20)
        set('health', 100)
        set('escapingDrunkenly', false)
        set('launched', false)
        set('fast', false)
        set('gameOver', 0)
        set('explode', false)
        set('slow', false)
        set('alignment', {greed: 0, fight: 0, nature: 0, pos: 0, neg: 0})
        set('gameOver', false)
    } else {
        // it is a saved game...do nothing?
    }








    game.computerStuff = [
            {name: 'on top of the world',
                        description: 'wow, what a view from up here. I can almost touch the sky! i think? no, that is just the ceiling. better be careful hopping down tho!',
        yes: 'think carefully about how to get down from here',
        no: 'think that this game probably does not have fall damage'},
        {name: 'control panel',
                        description: 'there is a gigantic switch here...you probably shouldn\'t push it though because you don\'t remember yr training or what it does :<',
        yes: 'back away slowly',
        no: 'aspire to push it one day',
        faded: {
            name: 'SOME BUTTON',
            description: 'yr pretty sure that pressing the button will turn on some sick dubstep so u can dance',
            yes: 'I JUST WANNA DANCE',
            no: 'I JUST WANT THE ROOM TO STOP SPINNING',
            extended: 'uh oh....the machine says "MISSILE LAUNCH SEQUENCE INITIATED", and u smell something burning?',
            fx: 'drunkescape'
        },

        alarmed: {
            name: 'LOUD ALARMS AND LIGHTS AND NOISES OMG',
            description: 'the machine says "NUCLEAR MISSILE LAUNCH DETECTED! TO UNLEASH TACTICAL COUNTER STRIKE PLZ PRESS THE SWITCH! DO REMEMBER YR TRAINING FIRST AS TO WHETHER OR NOT U SHOULD PUSH THE BUTTON! BUT DO IT FAST THERE IS NO TIME TO WASTE!"',
            yes: 'press it',
            no: 'absolutely do not press it no way',
            theSwitch: true
        }
    },
        {name: 'a huge computer machine',
                            description: 'it is making this wretched humming noise, i wonder if there is some way to stop it?',
        yes: 'think about the cooling system',
        no: 'imagine a nice slice of john cage music'},
        {name: 'broken down fan',
                        description: 'gosh it would be nice if this thing worked...it would be vvvvvvvvvvvvvv bad if this machine overheated!',
        yes: 'wonder if there is a tool that could fix it',
        no: 'wonder if u can record the sweet noises it will probably make when it explodes!', ifPunch: {description: 'purring like a kitten', yes: 'yes it is, i did that, me. err, you. whomever, comrade.'}}

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
            extended: 'you found a tasty tofu treat!',
            item: {
                name: 'tofu dish',
                description: 'will replenish your health!',
                fx: 'hp50',
                oneTimeUse: true,
                sprite: 'burger',
                extended: 'you gain 50 hp!',
                yes: 'eat that thing',
                no: 'um it is jiggling a lil ~too~ weirdly for me'}},
        {name: 'Strength Poster',
            description: 'a poster detailing the virtues of tofu as it relates to getting hella swole and punching bad people. the poster itself seems suspiciously well built...',
            yes: 'grab that thing,take it down,HOOOOO RAHHHHHH',
            no: 'respect the art...for now',
            fx: 'destroyWallArt2',
            extended: 'you found a tasty tofu treat!',
            item: {
                name: 'tofu energy drink',
                description: 'the label is just a bunch of screaming in all caps',
                fx: 'canpunch',
                sprite: 'tofudrink',
                oneTimeUse: true,
                extended: 'you gain the ability to punch things!',
                yes: 'chug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chugchug chug chug chug',
                no: 'i will pass'}}

      ]

      game.vendingItems = shuffle([
      {name: 'boots',
        descriptions: [
          'sparkly green crystals. so pretty',
          'these blue crystals smell like sweet berries and u would like to gnaw on them vvv badly',
          'purplish crystals, look pretty dense, probably worth something to somebody'],
        sprites: ['BootsGreen', 'BootsSoft', 'BootsMetal'],
        names: ['green crystals', 'blue crystals', 'purple crystals'],
        oneTime: [true, true, true],
        yes: ['eat that thing!', 'eat that thing!', 'eat that thing!'],
        no: ['maybe i shouldn\'t eat that', 'maybe i shouldn\'t eat that', 'maybe i shouldn\'t eat that'],
        extended: ['you transform into a green speedster! like a stoner "The Flash(tm DC comic books)"!', 'you transform into a shiny blue popsicle! you find it harder to move around now', 'WHOA! just as you are about to eat the purple crystals they scream out "WHOA DON\'T EAT ME I AM A SHAPESHIFTER!" and magically transform into a pile of money. You shrug and stuff them into yr wallet. "mine now", you remark, smugly.'],
        fx: ['greenspeed','flashy','$25'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'nature', 'greed']// keys to an object of corpii for later?

      },
      {name: 'foods',
        descriptions: ['a delicious cold beer. yr a robot so i am not sure what will happen if you pour this all over yourself.... be careful!',
        'delicious bread. you can maybe hang slices of bread on the wall like art?',
        'some sort of leg to an animal. poor thing. you will honor the life of this magnificient creature by wielding this bone as a crude bludgeon in your quest for justice'],
        sprites: ['FoodAle', 'FoodBread', 'FoodDrumstick'],
        names: ['strong ale', 'bread loaf', 'animal leg'],
        oneTime: [true, true, false],
        yes: ['chug chug chug', 'cover the walls in bread', 'shake that leg'],
        no: ['no thx i prefer wine', 'save the bread for later', 'respect the animal'],

        extended: ['you feel pretty confident, courageous, and also woozy. very woozy', 'gosh, it really spruces up the place to have all this bread on the wall. and to think of the ants that will come to eat it soon! FRIENDS! FOR ME!', 'you lash out with the strange animal leg'],
        fx: ['faded','breadart','chickenattack'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'shrooms',
        descriptions: ['looks like the sort of mushroom that you get on pizzas. mmmm. pizza. yes you totally can probably eat this',
        'this one looks...intriguing. it has like, this kind of aura going on, you know? but the aura is also menacing?',
        'this mushroom is literally oozing out what appears to be blood, and when you put your ear close to it a faint grinding and gnashing sound can be heard.'],
        sprites: ['MushroomBrown', 'MushroomPurple', 'MushroomRed'],
        extended: ['you gain 25 hp! delicious!', 'you transform into a trippy monster. ummmmmmmm this is probably not good', 'you transform into a fire demon. This is probably not going to end well...'],
        names: ['brown mushroom', 'purple mushroom', 'red mushroom'],
        oneTime: [true, true, true],
        yes: ['eat that thang!', 'eat that thang!', 'eat that thang!'],
        no: ['mmmmm im ok, not that hungry', 'mmmmm im ok, not that hungry', 'mmmmm im ok, not that hungry'],

        fx: ['hp25','transformtrip','transformevil'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'big sodas',
        descriptions: ['this soda is blue, and it looks just like the ocean under the moon','this soda is green, which is the same as the emotion that i get from you','this soda is red, which is the color of your heart which you should give to me or else forget about it'],
        sprites: ['RobeB', 'RobeG', 'RobeR'],
        names: ['blue soda', 'green soda', 'red soda'],
        oneTime: [true, true, true],
        yes: ['chug chug chug!', 'chug chug chug!', 'chug chug chug!'],
        no: ['save yr thirst for twitter', 'save yr thirst for twitter', 'save yr thirst for twitter'],

        extended: ['you gain 25 hp!', 'you are so refreshed by this soda that you puke up ten bucks!', 'you gain 25 hp!'],
        fx: ['hp25','$10','hp25'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'nature', 'greed']// keys to an object of corpii for later?
      },
      {name: 'swords',
        descriptions: ['this sword appears to be constantly on fire, which is itself pretty frigging sweet, but on top of that free heater for life? KA CHING',
        'erm, this sword is pretty gross and just keeps leaking this slime everywhere, it kind of has the consistency of gak? do you remember gak? *googles to see if they still make gak*',
        'this sword casts a shadow upon everything near it and appears to be sucking in all the light in the room. do you dare try to wield this most powerful weapon in the entire game?'],
        sprites: ['Sword1', 'Sword2', 'Sword3'],
        oneTime: [false, false, false],
        yes: ['SWING THAT BURNING THANG!', 'SWING THAT GOOEY THANG!', 'SWING THAT THANG! I CAN TAKE IT! I WANT ALL THE POWER!!!!!'],
        no: ['um weapons r gross :/', 'um weapons r gross :/', 'i should probably not touch the demon weapon unless i really need to...'],

        extended: ['you lash out in a burst of flames', 'you lash out in a gush of goopiness', 'you grab the sword by the handle and feel the darkness consume your soul...'],
        names: ['fire sword', 'goo sword', 'sword of all-consuming darkness'],
        fx: ['fireslash','gooslash','darkslash'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'potions',
        descriptions: ['a green potion, the color of MORE MONEY! or is nature?',
        'a red potion, the color of your blood and the blood of your enemies!',
        'a yellow potion, the color of, um, piss? pee pee. number 1. *giggles*'],
        sprites: ['VialG', 'VialR', 'VialY'],
        oneTime: [true, true, true],
        yes: ['slurp down that potion', 'slurp down that potion', 'slurp down that potion'],
        no: ['save it for later', 'save it for later', 'save it for later'],

        extended: ['you accidentally spill the potion on the ground and a tree grows in that very spot. you have always had such a green thumb. hmmm,  good thing u did not drink that one tho O_O', 'you accidentally spill the potion on the ground which coagulates in that very spot into a bust of a werewolf that seems to be made of blood or perhaps spicy jello. good thing u did not drink that one....', 'you accidentally spill the potion on the ground and it turns into a pile of money! good thing u did not drink that one....'],
        names: ['green potion', 'red potion', 'yellow potion'],
        fx: ['makeTree','makeBloodSculpture','makeGold'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'fight', 'greed']// keys to an object of corpii for later?
      },
      {name: 'books',
    oneTime: [false, false, false],
        yes: ['read it', 'read it', 'read it'],
        no: ['save it for a rainy day', 'save it for a rainy day', 'save it for a rainy day'],

      descriptions: ['yr instructions! to help you Remember Yr Training (tm)! you have been looking everywhere for this!',
       '""HOW TO WRITE GOOD POEMS"", hmm might help to pass the time',
       'a filthy, bloody note. intriguing.'],
      sprites: ['instructions', 'poemsbook', 'bloodnote'],
      names: ['INSTRUCTIONS', 'poetry book', 'bloody note (folded)'],
      extended: ['it reads "WHEN ALARM BLARES LOUDLY WITH NO END IN SIGHT, PRESS THE BUTTON"',
      'HOW TO WRITE A GOOD POEM: write some words, not too many, however much is just enough. give it a title. or don\'t, whatever i\'m not your boss. share it or save it as a secret. you have written a good poem.',
      'it is dirty, covered in blood, wrinkled up, and might have been bitten? you are pretty sure that it faintly reads "ABSOLUTELY DO NOT PUSH THE BUTTON"'],
      fx: ['read', 'read', 'read'],
      seed: ['greed', 'fight', 'nature']}
    ])

  },
  create: function(){
    this.game.musician.fadeIn()
    this.game.state.start(features.startState)

  }
}
module.exports = preload
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}