var db = require('../db')
var get = db.get
var set = db.set
var drawMenu = require('../drawMenu')
var bunker = function (game) {
  this.game = this.game
}
function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}


var poetryGen = require('../poet')

bunker.prototype = {
  create: function () {

    this.inDialog = false
    console.log("WE IN THE BUNKER")

    this.tableStuff = []

    this.vendingItems = shuffle([
      {name: 'RANDOM!',
        descriptions: [
          'these shiny pebbles might be worth something, or maybe it is food? A GAMBLE!',
          'a skeleton key! that means it can open any door in the building! i wonder if there are any doors tho...',
          'a lantern, excellent for exploring dark corridors.'],
        sprites: ['pebbles', 'key', 'lantern'],
        names: ['shiny pebbles', 'skeleton key', 'lantern'],
        fx: ['drop','key','light'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'greed', 'nature']// keys to an object of corpii for later?

      },
      {name: 'boots',
        descriptions: [
          'sparkly green crystals. so pretty',
          'these blue crystals smell like sweet berries and u would like to gnaw on them vvv badly',
          'purplish crystals, look pretty dense, probably worth something to somebody'],
        sprites: ['BootsGreen', 'BootsSoft', 'BootsMetal'],
        names: ['green crystals', 'blue crystals', 'purple crystals'],
        fx: ['greenspeed','flashy','kick'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'nature', 'greed']// keys to an object of corpii for later?

      },
      {name: 'foods',
        descriptions: ['a delicious cold beer. yr a robot so i am not sure what will happen if you pour this all over yourself.... be careful!',
        'delicious bread. you can maybe hang slices of bread on the wall like art?',
        'some sort of leg to an animal. poor thing. you will honor the life of this magnificient creature by wielding this bone as a crude bludgeon in your quest for justice'],
        sprites: ['FoodAle', 'FoodBread', 'FoodDrumstick'],
        names: ['strong ale', 'bread loaf', 'animal leg'],
        fx: ['faded','breadart','chickenattack'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'MAGICAL ITEMS',
        descriptions: ['a bright glowing star! good for illuminating dark spaces! or also as a party light.',
        '"DRINK FROM THIS CHALICE, AND U SHALL ATTAIN ALL KNOWLEDGE" is what it says underneath the microwave safe notice',
        'this orb is mysterious and probably powerful. or at least u could throw it at something'],
        names: ['star of glowingness', 'chalice of knowledge', 'orb of mystery'],
        sprites: ['GlovesGold', 'GlovesLeather', 'GlovesSteel'],
        fx: ['light','know','drop'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'greed', 'fight']// keys to an object of corpii for later?
      },
      {name: 'shrooms',
        descriptions: ['looks like the sort of mushroom that you get on pizzas. mmmm. pizza. yes you totally can probably eat this',
        'this one looks...intriguing. it has like, this kind of aura going on, you know? but the aura is also menacing?',
        'this mushroom is literally oozing out what appears to be blood, and when you put your ear close to it a faint grinding and gnashing sound can be heard.'],
        sprites: ['MushroomBrown', 'MushroomPurple', 'MushroomRed'],
        names: ['brown mushroom', 'purple mushroom', 'red mushroom'],
        fx: ['hp25','transformtrip','transformevil'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'big sodas',
        descriptions: ['this soda is blue, and it looks just like the ocean under the moon','this soda is green, which is the same as the emotion that i get from you','this soda is red, which is the color of your heart which you should give to me or else forget about it'],
        sprites: ['RobeB', 'RobeG', 'RobeR'],
        names: ['blue soda', 'green soda', 'red soda'],
        fx: ['hp25','$10','hp25'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'nature', 'greed']// keys to an object of corpii for later?
      },
      {name: 'swords',
        descriptions: ['this sword appears to be constantly on fire, which is itself pretty frigging sweet, but on top of that free heater for life? KA CHING',
        'erm, this sword is pretty gross and just keeps leaking this slime everywhere, it kind of has the consistency of gak? do you remember gak? *googles to see if they still make gak*',
        'this sword casts a shadow upon everything near it and appears to be sucking in all the light in the room. it appears quite powerful but may also control your soul if you wield it?'],
        sprites: ['Sword1', 'Sword2', 'Sword3'],
        names: ['fire sword', 'goo sword', 'sword of all-consuming darkness'],
        fx: ['fireslash','gooslash','darkslash'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['greed', 'nature', 'fight']// keys to an object of corpii for later?
      },
      {name: 'potions',
        descriptions: ['a green potion, the color of MORE MONEY! or is nature?',
        'a red potion, the color of your blood and the blood of your enemies!',
        'a yellow potion, the color of, um, piss? pee pee. number 1. *giggles*'],
        sprites: ['VialG', 'VialR', 'VialY'],
        names: ['green potion', 'red potion', 'yellow potion'],
        fx: ['makeTree','makeBloodSculpture','makeGold'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: ['nature', 'fight', 'greed']// keys to an object of corpii for later?
      },
    ])


    this.game.add.tileSprite(0, 720, 640, 960, 'walll');
    this.game.add.tileSprite(0, 0, 640, 720, 'wallll');
    var top = this.game.add.tileSprite(0, 0, 640, 150, 'walllll');


    // make the ladder drop down later
    var ladder = this.game.add.sprite(this.game.world.width / 2 + 40, 250, 'ladder');
    ladder.scale.setTo(0.15, 0.5)




    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our this.game


    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    var topBarrier = this.platforms.create(0, 150, 'blank')
    topBarrier.body.setSize(640, 1, 0, 0)
    topBarrier.body.immovable = true



    var chute = this.platforms.create(this.game.world.width / 2 + 25, 150, 'chute');
    chute.scale.setTo(0.45, 0.78)
    chute.body.immovable = true
    // Here we create the ground.



    var voltagebox = this.platforms.create(this.game.world.width / 2 - 120, 445, 'base');
    voltagebox.scale.setTo(0.1, 0.1)
    voltagebox.body.immovable = true


    var speakerL = this.platforms.create(this.game.world.width / 2 - 152, 465, 'speaker');
    speakerL.scale.setTo(0.45, 0.78)
    speakerL.body.immovable = true

    var speakerR = this.platforms.create(this.game.world.width / 2 - 27, 465, 'speaker');
    speakerR.scale.setTo(0.45, 0.78)
    speakerR.body.immovable = true


    var buttonthing = this.platforms.create(this.game.world.width / 2 - 120, 347, 'butts');
    buttonthing.scale.setTo(0.1, 0.1)
    buttonthing.body.immovable = true

    var tv = this.platforms.create(this.game.world.width / 2 - 153, 425, 'tv');
    tv.scale.setTo(0.4, 0.4)
    tv.body.immovable = true

    var radio = this.platforms.create(this.game.world.width / 2 - 125, 272, 'radio');
    radio.scale.setTo(0.45, 0.78)
    radio.body.setSize(93, 50, 5, 25)
    radio.body.immovable = true
//
    var fan = this.game.add.sprite(this.game.world.width / 2 - 158, 380, 'fan');
    fan.scale.setTo(0.5, 0.5)

    var mach = this.game.add.sprite(this.game.world.width / 2 - 90,  245, 'mach');
    mach.scale.setTo(0.4, 0.78)

    var siren = this.game.add.sprite(this.game.world.width / 2 - 20, 420, 'siren');
    siren.scale.setTo(0.45, 0.78)

    var bulb = this.game.add.sprite(this.game.world.width / 2 - 78, 220, 'bulb');
    bulb.scale.setTo(0.3, 0.7)

    var fuse = this.game.add.sprite(this.game.world.width / 2 - 117, 246, 'fuse');
    fuse.scale.setTo(0.5, 0.75)

    var arrows = this.game.add.sprite(205, 375, 'arrows');
    // arrows.scale.setTo(0.5, 0.5)

    var bars = this.game.add.sprite(225, 350, 'bars');
    // bars.scale.setTo(0.4, 0.78)

    var circs = this.game.add.sprite(206, 400, 'circs');
    // circs.scale.setTo(0.45, 0.78)

    var squares = this.game.add.sprite(204, 350, 'squares');
    // squares.scale.setTo(0.3, 0.7)

    var ticks = this.game.add.sprite(230, 350, 'ticks');
    // ticks.scale.setTo(0.5, 0.75)

    var switchy = this.game.add.sprite(200, 310, 'switchy');
    switchy.scale.setTo(0.75)

    arrows.animations.add('slow', [0, 1, 2, 3, 2, 1, 2, 3, 0, 1, 3, 0, 2], 0.5, true);
    arrows.animations.add('fast', [0, 1, 2, 3], 3, true);
    bars.animations.add('slow', [0, 1, 2, 1], 0.5, true);
    bars.animations.add('fast', [0, 1, 2], 2, true);
    circs.animations.add('slow', [0, 1, 2, 3, 4, 5], 0.75, true);
    circs.animations.add('fast', [0, 1, 2, 3, 4, 3, 2, 5, 4, 2, 3, 1, 2, 3, 1, 2, 5, 4], 5, true);
    squares.animations.add('slow', [0, 1, 2, 3], 0.33, true);
    squares.animations.add('fast', [0, 1, 2, 3], 3, true);
    ticks.animations.add('slow', [0, 1, 2, 3, 4, 5, 4, 5, 4, 3, 2, 1], 2, true);
    ticks.animations.add('fast', [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 7, true);
    switchy.animations.add('slow', [0, 1], 1, true);



    arrows.animations.play('slow');
    bars.animations.play('slow');
    circs.animations.play('slow');
    squares.animations.play('slow');
    ticks.animations.play('slow');
    // switchy.animations.play('slow');


    var staticy = this.game.add.sprite(217, 465, 'static');
    staticy.scale.setTo(0.75, 1)
    staticy.animations.add('roll')
    staticy.play('roll', 1.33, true)
    // this.game.world.bringToTop(staticy)

    var tippyTop = this.platforms.create(this.game.world.width / 2 - 72, 343, 'grid');
    tippyTop.scale.setTo(0.05, 0.1)
    tippyTop.body.setSize(1000, 1, 0, 0)
    tippyTop.body.immovable = true

    var chair = this.game.add.sprite(this.game.world.width / 2 , this.game.world.height - 305, 'chair');
    chair.scale.setTo(5)
    var table = this.game.add.sprite(this.game.world.width / 2 - 90, this.game.world.height - 310, 'table');
    table.scale.setTo(2, 1.5)

    var candle = this.game.add.sprite(this.game.world.width / 2 - 40, this.game.world.height - 330, 'candle');

    var art1 = this.game.add.sprite(10, 170, 'wallArt1');
    art1.scale.setTo(2)
    var art2 = this.game.add.sprite(500, 490, 'wallArt2');
    art2.scale.setTo(2)
    var art3 = this.game.add.sprite(550, 200, 'wallArt4');
    art3.scale.setTo(2)
    var art4 = this.game.add.sprite(75, 510, 'wallArt5');
    art4.scale.setTo(2)




    var books = this.game.add.sprite(this.game.world.width / 2 - 152, this.game.world.height - 332, 'books');
    books.scale.setTo(2)
    var candle1 = this.game.add.sprite(90, 365, 'wallArt3');
    candle1.scale.setTo(2)
    candle1.anchor.setTo(.5,.5);

candle1.scale.x *= -1; // wtf is this?
    var candle2 = this.game.add.sprite(505, 350, 'wallArt3');
    candle2.scale.setTo(2)
    var ground = this.platforms.create(0, this.game.world.height - 240, 'ground');

    //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
    ground.scale.setTo(1.6, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(this.game.world.width / 2 - 150, this.game.world.height - 420, 'platform');
    ledge.body.immovable = true;



    var vend = this.platforms.create(-8, this.game.world.height - 345, 'vend')
    vend.body.immovable = true
    vend.body.setSize(75, 75, 0, 27)

    // The this.player and its settings
    this.player = this.game.add.sprite(550, 666, 'dude');
    this.player.scale.setTo(1.5,1)
    //  We need to enable physics on the this.player
    this.game.physics.arcade.enable(this.player);
        //  This adjusts the collision body size to be a 100x50 box.
    //  50, 25 is the X and Y offset of the newly sized box.

    this.player.body.setSize(10, 43, 20, 0);

    //  this.Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3], 10, true);




    this.bed = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 305, 'cryobed');
    this.bed.frame = 1



    // var close = this.bed.animations.add('close', [0, 1, 2], 5500, true);

    // this.bed.animations.play('close', true)
    // close.loop = false
















    // //  The score
    this.redrawMenu()
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.startDay()
  },
  redrawMenu: function () {

  var wallet = this.game.add.sprite(150, 20, 'wallet');
  wallet.scale.setTo(1.5)
  var hp = this.game.add.sprite(16, 25, 'hp');
  var bag = this.game.add.sprite(16, 60, 'bag');

  bag.scale.setTo(0.75)
    this.hpDisplay = this.game.add.text(50, 25, '100/100', { fontSize: '22px', fill: '#FFF' });
    this.inventoryDisplay = this.game.add.text(65, 65, '' + get('inventory').map(function (item) {
        return item.name
    }).join(', '), { fontSize: '16px', fill: '#FFF', wordWrap: true, wordWrapWidth: 500 });

    this.walletDisplay = this.game.add.text(200, 25, get('wallet'), { fontSize: '22px', fill: '#FFF' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  redrawInventory: function () {
    this.inventoryDisplay.setText('inventory:' + get('inventory').map(function (item) {
        return item.name
    }).join(', '))
  },
  openInventoryDialog: function () {

  },
  openDialog: function (thing) {
    var that = this
    drawMenu(this.game, 'parch', thing, function (menu, obj) {
        // urggggh just put a gigantic case switch here for the few things that have fx?
        that.inDialog = false
        menu.destroy()
        if (obj.yes !== 'ok') {
            obj.description = obj.description + ' you ' + obj.yes
            obj.yes = 'ok'
            obj.no = ''
        }
    }, function (obj) {
        that.inDialog = false
        if (obj.yes !== 'ok') {
            obj.description = obj.description + ' you ' + obj.no
            obj.yes = 'ok'
            obj.no = ''
        }

    })


    // based on whatever the thing is...."inspect thing" etc.
    // draw a dialog box, display the thing, prompt the user to do stuff
    // IF the thing is the poetry journal, defer to openJournal
    // IF it's the chest/vending machine, defer to those
  },
  maybeGoToSleep: function () {
    if (this.hasWrittenAPoemToday) {
        var that = this
        drawMenu(this.game, 'parch',
                 {name: 'GO TO SLEEP?',
                    description: 'is it sleepy time?',
                    yes: 'PLZ',
                    no: 'i must work'
                },
                     function (menu) {
                        menu.destroy()
                        that.inDialog = false
                        that.game.musician.fadeOut()
                        that.game.state.start("DaySwitch")
                    }, function () {

                        that.inDialog = false
                    })
    } else {
        var that = this
        drawMenu(this.game, 'parch',
                 {name: 'CRYOBED',
                    description: 'you are not very tired right now, maybe write some poems to relax?',
                    yes: 'ok'
                },
                     function (menu) {
                        menu.destroy()
                        that.inDialog = false
                    })
    }

    // pop open a yes/no dialog, reset stuff accordingly. make sure they wrote a poem that day
  },
  useThing: function (thing, menmen) {
    switch(thing) {
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;
        case '':
            // stuff
            break;

    }

    var whatHappened  = this.game.add.text(150, 570, thing.used, { fontSize: '40px', fill: '#FFF' });
    var confirm  = this.game.add.text(150, 370, 'YAYYYYY!!!', { fontSize: '40px', fill: '#08D' });
    confirm.inputEnabled = true;
    var that = this
    //REFACTOR THISSSSSSSSSSS
    confirm.events.onInputDown.add(function  (thing) {
        // RUN THE STUFF!
        this.inDialog = false
        menmen.destroy()
        whatHappened.destroy()
        confirm.destroy()
    }, this);
    if (thing.oneTimeUse) {
        var inventory = get('inventory')
        var i = inventory.indexOf(thing)
        set('inventory', inventory.splice(i, 1))
    }

  },
  drawMenuBox: function (type) {
    var menuBox = this.game.add.sprite(0, 150, type);
    menuBox.scale.setTo(3.75, 5)
    return menuBox
  },
  vend: function () {
    var menmen = this.drawMenuBox('menu') // or 'parch'

    var that = this
    var cash
    if ((cash = get('wallet')) >= 5) {
        drawMenu(this.game, menmen, {name: 'VEND-O-3000', description: 'INSERT $5?', yes: 'YAY', no: 'NAY'},
                 function (men, obj) {
                    that.buyThing(men)
                    that.inDialog = false
                 }, function (obj) {
                    that.inDialog = false
                 })

    } else {
        drawMenu(this.game, menmen, {
                    name: 'VEND-O-3000',
                 description: 'YOU AINT GOT ENOUGH CASH! GET A JOB! oh wait, this is yr job, when do u get paid? hmmmm',
                 yes: 'ugh i hate capitalism',
                 no: 'i deserve this'},
                 function (men, obj) {
                    men.destroy()
                    that.inDialog = false
                 }, function (obj) {
                    that.inDialog = false
                 })

    }
  },
  buyThing: function (menu) {
    console.log("WHOOOA")
    var item = this.vendingItems.pop()
    // display them and stuffzzz.
    // add the click buttons too
    var title = this.game.add.text(50, 220, item.name, { fontSize: '60px', fill: '#FFF' });
    var that = this
    var items = []
    item.sprites.forEach(function (opt, i) {
      var staticy = that.game.add.sprite(75 + i * 180, 325, opt);
      staticy.scale.setTo(4)
      var descrip = that.game.add.text(75 + i * 180, 466, item.descriptions[i], { fontSize: '15px', fill: '#FFF', wordWrap: true, wordWrapWidth: 150  });
      staticy.inputEnabled = true
      staticy.events.onInputDown.add(function () {
        var inventory = get('inventory')
        inventory.push({name: item.names[i], description: item.descriptions[i], sprite: opt, fx: item.fx[i]})
        set('inventory', inventory)
        set(get('seeds').push(item.seed[i]))
        that.redrawInventory()
        items.forEach(function (it){ it.destroy()})
        menu.destroy()
        title.destroy()
        that.inDialog = false
      }, that)
      items.push(staticy)
      items.push(descrip)
    })



    // eventually
    // menu.destroy()
  },
  runPoem: function (next) {
    if (next) {
      this.poem += ' ' + (next == 'linebreak' ? '\n' : next)
    }
    this.poemDisplay.setText(this.poem)
    var words = this.poem.split(' ')
    if (next == 'linebreak') words = []
    console.log('NEXTS', [words[words.length - 2], words[words.length - 1]].join(' '))
    var nexts = [poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')), poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')), poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')), 'linebreak']
    var that = this
    nexts.forEach(function (opt, i) {
      var option = that.game.add.text(155 + i * 100, that.poemDisplay.bottom + 25 + i * 33, opt, { fontSize: '20px', fill: '#03F' })
      option.inputEnabled = true;
      option.events.onInputDown.add(select, that);
      that.currentOptions.push(option)
    })
    function select (thing) {
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      if (thing.text == 'linebreak') {
        that.game.musician.playFX('selecto')
      } else {
        that.game.musician.playFX(pick(['russel1', 'russel2', 'russel3']))
    }
      console.log(thing.text)
      this.runPoem(thing.text)
    }

  },
  writeAPoem: function () {
    this.currentOptions = []
    // var poetryBG = this.game.add.sprite(-160, 60, 'paper3')
    // poetryBG.scale.setTo(30, 25)
    this.game.musician.playFX('twinklelong')
    var bookAnim = this.game.add.sprite(-30, -250, 'sweetbook');
    bookAnim.scale.setTo(27, 35)
    bookAnim.animations.add('blocky', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], false)
    bookAnim.animations.play('blocky', 7)
    var that = this

    this.player.scale.setTo(9, 6)

    this.game.world.bringToTop(this.player)
    bookAnim.animations.currentAnim.onComplete.add(function () {
        that.writeThatStinkingPoem(bookAnim)

    }, this);

  },
  writeThatStinkingPoem: function (bookThingy) {

    var instructions = this.game.add.text(155, 175, 'WRITE A POEM', { fontSize: '30px', fill: '#000'});

    this.poem = poetryGen()
    this.poemDisplay = this.game.add.text(155, 250, this.poem, { fontSize: '15px', fill: '#000', align: 'left', wordWrap: true, wordWrapWidth: 450  })
    this.runPoem()
    var that = this
    var quit = that.game.add.text(175, 135, 'quit', { fontSize: '20px', fill: '#08D' })
    var save = that.game.add.text(250, 135, 'save', { fontSize: '20px', fill: '#08D' })




    save.inputEnabled = true;
    quit.inputEnabled = true;
//REFACTOR THISSSSSSSSSSS (maybe?)
    quit.events.onInputDown.add(function () {
      bookThingy.destroy()
      that.poemDisplay.destroy()
      quit.destroy()
      instructions.destroy()
      save.destroy()
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      that.player.y = 670
      that.player.x = 240
      that.player.scale.setTo(1.5,1)
      that.inDialog = false
      that.game.musician.playFX('crumple')
    }, this);

    save.events.onInputDown.add(function () {
      var c = get('poemCount')
      var days = ['', '', '', '']
      // record the day/time the poem was written
      // THE FIRST DAY! would be hellllla far in the past tho. only see that after exiting.
      set('poem' + c, that.poem)
      set('poemCount', ++c)

      bookThingy.destroy()
      that.poemDisplay.destroy()
      quit.destroy()
      instructions.destroy()
      save.destroy()
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      that.player.y = 670
      that.player.x = 240
      that.player.scale.setTo(1.5,1)
      that.hasWrittenAPoemToday = true
      that.inDialog = false
      that.game.musician.playFX('twinkleshort')
    }, this);
  },

  cleanUpAndStartNewDay: function () {
    // TURN OFF THE CONTROLS?
    // lower the robot into the bed
    // close the door (setTimeouts? OH WAIT I GET THE ANIM NOW)
    // fade 2 black (how 2 do?)
    // draw day to screen
    // fade open again, stuff is redrawn, etc.

    this.game.state.start("DaySwitch")
  },
  startDay: function () {




    // have player emerge from bed?
    // open the bed door?


    // STUFF GETS PROGRESSIVELY MORE GNAR














    this.hasWrittenAPoemToday = false
    var day = get('currentDay')
    if (day == 1) {
      this.tableStuff = [
        {name: 'Some book about stuff',
        description: 'yr pretty sure there is a PDF of it in yr memory banks somewhere *yawn*',
        yes: 'read it already', no: 'could not put it down! a real page turner, 5 stars'},
        {name: 'sad old mug',
        description: 'seems to contain...coffee? it is particularly sad looking, you think about smashing it',
        yes: 'remember drinking from it and decide to save the memories',
        no: 'take pity on the sad ceramic and resolve to find some super glue'}
      ]
      var book1 = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 310, 'book1');
      book1.scale.setTo(0.5)
      var mug = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 295, 'mug');
      mug.scale.setTo(0.75)
      var paper = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'linedpaper');
    } else if (day == 2) {
      this.tableStuff = [
        {name: 'a jug of unknown fluid',
        description: 'you wonder what it is inside of there...',
        yes: 'guess "batteries"',
        no: 'guess "internet"'},
        {name: 'Math Textbook',
        description: 'this would make an excellent doorstop...ugh it won\'t fit in yr pocket',
        yes: 'kiss the book gently',
        no: 'gnaw on the leather cover for the protein'}
      ]
      var jug = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 300, 'jug');
      jug.scale.setTo(0.5)
      var book2 = this.game.add.sprite(this.game.world.width / 2 , this.game.world.height - 305, 'book2');
      book2.scale.setTo(0.5)
      var paper2 = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'blankpaper');
    } else {
      this.tableStuff = [
        {name: 'some papers',
        description: 'you are an excellent doodler. yr art should be on walls everywhere',
        yes: 'reflect on the glory of your works',
        no: 'humbly sink into a depressive impostor syndrome'},
        {name: 'empty pizza box',
        description: 'you miss the pizza dearly :~~~~(',
        yes: 'accept the absence and move on',
        no: 'continue to mourn the loss'}

      ]
      var papert = this.game.add.sprite(this.game.world.width / 2 - 90, this.game.world.height - 325, 'papert');
      var pizza = this.game.add.sprite(this.game.world.width / 2 - 20, this.game.world.height - 315, 'pizza');
      pizza.scale.setTo(0.75)
      var paper3 = this.game.add.sprite(this.game.world.width / 2 - 60, this.game.world.height - 300, 'paper3');
    }
    // this.game.world.bringToTop(this.platforms)

    var bg = this.game.add.sprite(0, 0, 'black');
    bg.scale.setTo(5, 7)
    // bg.anchor.setTo(0.5, 0.5);
    bg.alpha = 1;
    var that = this
    var t = this.game.add.tween(bg).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, false, 0, 1000, 1).start();
    t.onLoop.add(function () {
        console.log('looped!')
        // t.onLoopCallback(function(){console.log('Y?')})
        that.game.tweens.remove(t)
      bg.destroy()




      // OHHH MAYBE DROP THE PLAYER IN HERE?
      that.game.world.bringToTop(that.player)
    }, this)

  },

  interactIfTouchingThing: function (x, y) {
    if (!this.inDialog) {
       console.log(x, y, 'idk')
      if (y > 669 && y < 685) {
          // TOUCHING THE GROUND!!!!!
          if (x >= 45 && x < 50) {
              // vending machine
              console.log('touching the vend')
              this.inDialog = true
              this.vend()
          } else if (x >= 210 && x < 245) {
              // left desk item
              console.log('touching the lefty')
              this.inDialog = true
              this.openDialog(this.tableStuff[0])

          } else if (x >= 250 && x < 275) {

            console.log('touching the desk')
              this.inDialog = true
            this.writeAPoem()
          } else if (x >= 280 && x < 320) {
              // right desk item
              console.log('touching the righty')

              this.inDialog = true
              this.openDialog(this.tableStuff[1])
          } else if (x >= 150 && x < 200) {
            // BOOKSHELF!
            console.log('touching the books')
              this.inDialog = true
            this.openDialog({name: 'a shelf of books',
                            description: 'wow there are some really good books here, unfortunately none of them are your training manual which u forgot :<',
        yes: 'struggle to remember your training',
        no: 'DGAF about the training you are here to party'})

          } else if (x >= 520 && x < 570) {
            console.log('touching the bed')
            this.inDialog = true
            this.maybeGoToSleep()
          }
      } else if ((y >= 400 && y < 405)) {
        // if (x >= 150 && x < 200) {
            console.log('touching the computer')
              this.inDialog = true
            this.openDialog({name: 'a huge computer machine',
                            description: 'it is making this wretched humming noise, i wonder if there is some way to stop it?',
        yes: 'think about the cooling system',
        no: 'try kicking it'})

            // main platformish?
            // kick thing? OK U NEED AN ITEM TO DO THAT?
          // }
      } else if (y >= 375 && y < 385) {

        this.inDialog = true
        this.openDialog({name: 'broken down fan',
                        description: 'gosh it would be nice if this thing worked...it would be vvvvvvvvvvvvvv bad if this machine overheated!',
        yes: 'wonder if there is a tool that could fix it',
        no: 'wonder if there is a tool that would let you record the sweet noises it will probably make when it explodes and takes you with it!'})
        // touching the fan thing!
      } else if  (y >= 295 && y < 305) {

        this.inDialog = true
        this.openDialog({name: 'control panel',
                        description: 'there is a gigantic switch here...you probably shouldn\'t push it though because you don\'t remember yr training or what it does :<',
        yes: 'back away slowly',
        no: 'aspire to push it one day',
        ifFaded: 'you are feeling bold, courageous, and decisive. push the button? '})
        // by the switch 220-240 switch, 240+ the machine tubes
      } else if (y >= 250 && y < 260) {

        this.inDialog = true
        this.openDialog({name: 'on top of the world',
                        description: 'wow, what a view from up here. I can almost touch the sky! i think? no, that is just the ceiling. better be careful hopping down tho!',
        yes: 'think carefully about how to get down from here',
        no: 'think that this game probably does not have fall damage'})
        // on top of the radio. mention the view?
      }
    }

    // figure these out once object positions are set in stone
  },
  update: function () {
    // console.log(this.game.input.x,
    // this.game.input.y)
    this.game.musician.updateComputerNoise(this.game, this.player.x, this.player.y)
    this.game.physics.arcade.collide(this.player, this.platforms);

    if (this.cursors.left.isDown) {
        //  Move to the left
        this.player.body.velocity.x = -150;
        if (this.player.body.touching.down) {
          this.player.animations.play('left');
        } else {
          this.player.animations.stop()
          this.player.frame = [5, 7][~~(Math.random() * 2)]
        }
    } else if (this.cursors.right.isDown) {
        //  Move to the right
        this.player.body.velocity.x = 150;
        if (this.player.body.touching.down) {
          this.player.animations.play('right');
        } else {
          this.player.animations.stop()
          this.player.frame = [11, 9][~~(Math.random() * 2)]
        }
    } else if (this.cursors.down.isDown && this.player.body.touching.down) {
        //  PLAYER IS PRESSING DOWN, TRYING TO ACTIVATE SOMETHING?
        // figure out what thing they are touching/near? and then openDialog(thatThingYouDo)
        this.player.animations.stop();
        this.player.frame = 12
        this.player.body.velocity.x = 0
        this.interactIfTouchingThing(this.player.x, this.player.y)
    } else {
      var goingUp = !this.player.body.velocity.x
      var goingRight = this.player.body.velocity.x > 0
      var goingLeft = !goingRight
      if (this.player.body.touching.down) {
        //  Stand still
        this.player.animations.stop();

        this.player.body.velocity.x = 0
      } else {
        if (goingUp) {
          // ???? almost never happens
        } else {
          this.player.body.velocity.x += goingRight ? -1 : 1
        }
      }
    }

    //  Allow the this.player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
    }
  }
}

module.exports = bunker


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