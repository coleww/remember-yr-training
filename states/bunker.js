var db = require('../db')
var get = db.get
var set = db.set
var dec = db.dec
var inc = db.inc
var push = db.push
var remove = db.remove
var drawMenu = require('../drawMenu')
var bunker = function (game) {
  this.game = this.game
}
function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

var makeASong = require('../makeASong')
var poetryGen = require('../poet')
var makeAnticapitalistTract = require('../makeAnticapitalistTract')
bunker.prototype = {
  create: function () {
    this.game.musician.change('bunker')
    this.wall1 = get('wall1')
    this.wall2 = get('wall2')
    this.inDialog = false
    console.log("WE IN THE BUNKER")


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

    var chair = this.game.add.sprite(this.game.world.width / 2 + 30 , this.game.world.height - 305, 'chair');
    chair.scale.setTo(5)







    var table = this.platforms.create(this.game.world.width / 2 - 90, this.game.world.height - 310, 'table');
    table.scale.setTo(2, 1.5)
    table.body.immovable = true
    table.body.setSize(60, 1, 0, 15)
    this.world.bringToTop(table)

    var candle = this.game.add.sprite(this.game.world.width / 2 - 40, this.game.world.height - 330, 'candle');


    // "paintings"
    var art1 = this.game.add.sprite(10, 170, 'wallArt1');
    art1.scale.setTo(2)
    var art2 = this.game.add.sprite(465, 185, 'wallArt2');
    art2.scale.setTo(2)
    // candelebras
        var candle1 = this.game.add.sprite(50, 240, 'wallArt3');
    candle1.scale.setTo(2)
    candle1.anchor.setTo(.5,.5);

    candle1.scale.x *= -1; // wtf is this?
    var candle2 = this.game.add.sprite(475, 200, 'wallArt3');
    candle2.scale.setTo(2)

    // posters
    if (this.wall2) {
        var art3 = this.game.add.sprite(425, 615, 'wallArt4');
        art3.scale.setTo(1.5)
        this.wallart2 = art3
    }
    if (this.wall1) {
        var art4 = this.game.add.sprite(100, 615, 'wallArt5');
        art4.scale.setTo(1.5)
        this.wallart1 = art4
    }



    var books = this.platforms.create(this.game.world.width / 2 - 152, this.game.world.height - 332, 'books');
    books.scale.setTo(2)
    books.body.immovable = true
    books.body.setSize(30, 1, 0, 20)





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
  openWallet: function () {
    // INSPECTING YR WALLET
    // BASED on yr twine choices and how much u got, will say smth
    var wallet = get('wallet')
    var align = get('alignment')

    drawMenu(this.game, 'parch', makeAnticapitalistTract(wallet, align),
                 function (men, obj) {
                    men.destroy()
                    that.inDialog = false
                 })

  },
  openHealth: function () {
    // based on yr health level, will sing a song with matching markov sentiment
    var song = makeASong(get('health'))

    drawMenu(this.game, 'parch', song,
                 function (men, obj) {
                    men.destroy()
                    that.inDialog = false
                 })
  },
  openInventory: function () {
    // open a dialog, draw out inventory stuff w/ sprites AND ummm like if they are useable?

    var that = this
    var menmen = this.drawMenuBox('menu')
    var title = this.game.add.text(50, 220, 'YOUR BACKPACK', { fontSize: '60px', fill: '#FFF' });
    var that = this
    var items = []
    var inv = get('inventory')
    var bonus = 0
    var x = 0
    inv.forEach(function (opt, i) {
        if (i == 4) {
            bonus += 150
            x = 0
        }
        if (i == 8) {
            bonus += 150
            x = 0
        }
      var staticy = that.game.add.sprite(75 + x * 125, 325 + bonus, opt.sprite);
      staticy.scale.setTo(3.5)
      var descrip = that.game.add.text(75 + x * 125, 325 + bonus, opt.name, { fontSize: '20px', fill: '#3F3', wordWrap: true, wordWrapWidth: 120  });
      staticy.inputEnabled = true
      x++
      items.push(staticy)
      items.push(descrip)


      staticy.events.onInputDown.add(function () {
        items.forEach(function (it){ it.destroy()})
        that.game.musician.playFX('twinkleshort')
        title.setText(opt.name)
        drawMenu(that.game, menmen, opt, function (menu, obj) {
            // urggggh just put a gigantic case switch here for the few things that have fx?
            that.inDialog = false
            title.destroy()
            that.useThing(obj, menu) // this will deal with the FX of whatever
        }, function (thing) {
            that.inDialog = false
            title.destroy()
        })

      }, that)
    })
  },
  pauseGame: function () {
    console.log('meow')
    this.inDialog = true
    var that = this
    drawMenu(this.game, 'menu',
                 {name: 'PAWS\'d',
                    description: 'quit game?',
                    yes: 'PLZZZZZZZZZZZ',
                    no: 'keep playing'
                },
                     function (menu) {
                        menu.destroy()
                        that.inDialog = false
                        that.game.state.start('titleScreen')
                    }, function () {
                        that.inDialog = false
                    })
    // draw a save/close menu
  },
  saveGame: function () {
    // is there anything to even do here? it basically auto-saves actually
  },
  redrawMenu: function () {
    var that = this

    var pawsButton = this.game.add.sprite(500, 20, 'paw');
  pawsButton.inputEnabled = true
  pawsButton.events.onInputDown.add(function () {
    // that.openpawsButton()
    if (!that.game.paused) that.pauseGame()
  })
  pawsButton.scale.setTo(1.5)


  var wallet = this.game.add.sprite(150, 20, 'wallet');
  wallet.inputEnabled = true
  wallet.events.onInputDown.add(function () {
    that.openWallet()
  })
  wallet.scale.setTo(1.5)
  var hp = this.game.add.sprite(16, 25, 'hp');
  hp.inputEnabled = true
  hp.events.onInputDown.add(function () {
    that.openHealth()
  })
  var bag = this.game.add.sprite(16, 60, 'bag');
  bag.inputEnabled = true
  bag.events.onInputDown.add(function () {
    that.openInventory()
  })

  bag.scale.setTo(0.75)
    this.hpDisplay = this.game.add.text(50, 25, get('health') + '/100', { fontSize: '22px', fill: '#FFF' });
    this.inventoryDisplay = this.game.add.text(65, 65, '' + get('inventory').map(function (item) {
        return item.name
    }).join(', '), { fontSize: '16px', fill: '#FFF', wordWrap: true, wordWrapWidth: 500 });

    this.walletDisplay = this.game.add.text(200, 25, get('wallet') + '$', { fontSize: '22px', fill: '#FFF' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  redrawInventory: function () {
    this.inventoryDisplay.setText('inventory:' + get('inventory').map(function (item) {
        return item.name
    }).join(', '))
  },
  openDialog: function (thing) {
    var that = this
    drawMenu(this.game, 'parch', thing, function (menu, obj) {
        // urggggh just put a gigantic case switch here for the few things that have fx?
        that.inDialog = false
        if (thing.yes !== 'ok') {
            thing.description = thing.description + ' you ' + thing.yes
            thing.yes = 'ok'
            thing.no = ''
            if (thing.no) {
                var al = get('alignment')
                al[item.seed['neg']]++
                set('alignment', al)
            }
        }
        if (thing.fx) {
            that.useThing(obj, menu)
        } else {

            menu.destroy()
        }


    }, function (thing) {
        that.inDialog = false
        if (thing.yes !== 'ok') {
            thing.description = thing.description + ' you ' + thing.no
            thing.yes = 'ok'
            thing.no = ''

            var al = get('alignment')
            al[item.seed['pos']]++
            set('alignment', al)
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
                        inc('currentDay')
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
    switch(thing.fx) {
        case 'gameOver1':
            set('gameOver', 1)
            this.game.state.start("GameOverScreen")
            break;
        case 'destroyWallArt1':
            // stuff
            set('wall1', false)
            this.wallart1.destroy()
            this.wall1 = false
            break;
        case 'destroyWallArt2':
            // stuff
            set('wall2', false)
            this.wallart2.destroy()
            this.wall2 = false
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

    var whatHappened  = this.game.add.text(150, 570, thing.used, { fontSize: '20px', fill: '#FFF' });
    var confirm  = this.game.add.text(150, 370, 'YAYYYYY!!!', { fontSize: '20px', fill: '#08D' });
    confirm.inputEnabled = true;
    var that = this
    //REFACTOR THISSSSSSSSSSS
    confirm.events.onInputDown.add(function  (thin) {
        // RUN THE STUFF!
        console.log(thing)
        this.inDialog = false
        if (thing.item) {
            console.log('PUSHING')
            push('inventory', thing.item)
            that.redrawInventory()
        }
        menmen.destroy()
        whatHappened.destroy()
        confirm.destroy()
    }, this);
    if (thing.oneTimeUse) {
        remove('inventory', thing)
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
    var item = this.game.vendingItems.pop()
    var newMoneyFlow = dec('wallet', 5)
    this.walletDisplay.setText(newMoneyFlow + '$')
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
        var al = get('alignment')
        al[item.seed[i]]++
        set('alignment', al)

        inventory.push({name: item.names[i], description: item.descriptions[i], sprite: opt, fx: item.fx[i]})
        set('inventory', inventory)
        set(get('seeds').push(item.seed[i]))
        that.redrawInventory()
        items.forEach(function (it){ it.destroy()})
        that.game.musician.playFX('twinkleshort')
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
    var words = this.poem.replace(/[^a-zA-Z0-9 ]/g, '').replace(/(^\s+|\s+$)/g, '').replace(/\s+/g, ' ').split(' ')
    console.log(words)
    if (next == 'linebreak') words = []
    console.log('NEXTS', [words[words.length - 2], words[words.length - 1]].join(' '))
    var nexts = [poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')),
    poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')),
    poetryGen([words[words.length - 2], words[words.length - 1]].join(' ')),
    'linebreak','(', ')', '[', ']', '!', '?', '.', ':', ';', '~', '/', '\\']
    var that = this
    var acc = 0
    nexts.forEach(function (opt, i) {

      if (i % 4 == 0){
        acc = 0
      }
      var size = 20
      if (opt.length == 1) {size = 40}
      var option = that.game.add.text(75 + acc * 100, that.poemDisplay.bottom + 25 + i * 23, opt, { fontSize: size + 'px', fill: '#03F' })
      option.inputEnabled = true;
      option.events.onInputDown.add(select, that);
      that.currentOptions.push(option)
      acc++
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
    this.poemDisplay = this.game.add.text(55, 250, this.poem, { fontSize: '15px', fill: '#000', align: 'left', wordWrap: true, wordWrapWidth: 450  })
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





    this.game.world.bringToTop(this.player)








    this.hasWrittenAPoemToday = false
    var day = get('currentDay')


      if (day == 2) {
      var book1 = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 310, 'book1');
      book1.scale.setTo(0.5)
      var mug = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 295, 'mug');
      mug.scale.setTo(0.75)
      var paper = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'linedpaper');
          this.game.world.bringToTop(this.player)
      this.game.world.bringToTop(mug)

      // this.game.world.bringToTop(book1)

    } else if (day == 3) {

      this.game.tableStuff[0] =  {name: 'a jug of unknown fluid',
        description: 'you wonder what it is inside of there...',
        yes: 'guess "batteries"',
        no: 'guess "internet"'}
        this.game.tableStuff[1] =  {name: 'Math Textbook',
        description: 'this would make an excellent doorstop...ugh it won\'t fit in yr pocket',
        yes: 'kiss the book gently',
        no: 'gnaw on the leather cover for the protein'}

      var jug = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 300, 'jug');
      jug.scale.setTo(0.5)
      var book2 = this.game.add.sprite(this.game.world.width / 2 , this.game.world.height - 305, 'book2');
      book2.scale.setTo(0.5)
      var paper2 = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'blankpaper');
    this.game.world.bringToTop(this.player)
      this.game.world.bringToTop(jug)

      // this.game.world.bringToTop(book2)

    } else {

      this.game.tableStuff[0] = {name: 'some papers',
        description: 'you are an excellent doodler. yr art should be on walls everywhere',
        yes: 'reflect on the glory of your works',
        no: 'humbly sink into a depressive impostor syndrome'}

        this.game.tableStuff[1] = {name: 'empty pizza box',
        description: 'you miss the pizza dearly :~~~~(',
        yes: 'accept the absence and move on',
        no: 'continue to mourn the loss'}
      var papert = this.game.add.sprite(this.game.world.width / 2 - 90, this.game.world.height - 315, 'papert');
      var pizza = this.game.add.sprite(this.game.world.width / 2 - 20, this.game.world.height - 315, 'pizza');
      pizza.scale.setTo(0.75)
      var paper3 = this.game.add.sprite(this.game.world.width / 2 - 60, this.game.world.height - 300, 'paper3');

      this.game.world.bringToTop(this.player)
      this.game.world.bringToTop(pizza)

      this.game.world.bringToTop(papert)
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
          } else if (x >= 80 && x < 130 && this.wall1) {
            // BOOKSHELF!
            console.log('touching the L poster')
              this.inDialog = true
            this.openDialog(this.game.tableStuff[3])

          }else if (x >= 150 && x < 200) {
            // BOOKSHELF!
            console.log('touching the books')
              this.inDialog = true
            this.openDialog(this.game.tableStuff[2])

          } else if (x >= 210 && x < 235) {
              // left desk item
              console.log('touching the lefty')
              this.inDialog = true
              this.openDialog(this.game.tableStuff[0])

          } else if (x >= 240 && x < 275) {

            console.log('touching the desk')
              this.inDialog = true
            this.writeAPoem()
          } else if (x >= 280 && x < 320) {
              // right desk item
              console.log('touching the righty')

              this.inDialog = true
              this.openDialog(this.game.tableStuff[1])
          }  else if (x >= 420 && x < 450 && this.wall2) {
            console.log('touching the R poster')
            this.inDialog = true
            this.openDialog(this.game.tableStuff[4])
          }else if (x >= 520 && x < 570) {
            console.log('touching the bed')
            this.inDialog = true
            this.maybeGoToSleep()
          }
      } else if ((y >= 400 && y < 405)) {
        // if (x >= 150 && x < 200) {
            console.log('touching the computer')
              this.inDialog = true
            this.openDialog(this.game.computerStuff[2])

            // main platformish?
            // kick thing? OK U NEED AN ITEM TO DO THAT?
          // }
      } else if (y >= 375 && y < 385) {

        this.inDialog = true
        this.openDialog(this.game.computerStuff[3])
        // touching the fan thing!
      } else if  (y >= 295 && y < 305) {

        this.inDialog = true
        this.openDialog(this.game.computerStuff[1])
        // by the switch 220-240 switch, 240+ the machine tubes
      } else if (y >= 250 && y < 260) {

        this.inDialog = true
        this.openDialog(this.game.computerStuff[0])
        // on top of the radio. mention the view?
      }
    }

    // figure these out once object positions are set in stone
  },
  checkForDeath: function () {
    if (get('health') <= 0) {
        set('gameOver', 420)
        this.game.state.start("GameOverScreen")
    }
  },
  update: function () {
    // console.log(this.game.input.x,
    // this.game.input.y)
    this.game.musician.updateComputerNoise(this.game, this.player.x, this.player.y)
    this.game.physics.arcade.collide(this.player, this.platforms);



    if (this.player.body.touching.down) {
        if (this.willTakeFallDamage && this.player.y > 580) {
            this.hpDisplay.setText(dec('health', 15) + '/100')
            // this.game.tint
            this.game.musician.playFX('crunch')
            this.checkForDeath()
        }
        this.willTakeFallDamage = false
    } else if (this.player.x < 311 && this.player.y < 400) {
        this.willTakeFallDamage = true
    }





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
        console.log(this.player.x, this.player.y)
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
        this.game.musician.playFX('pew')
      this.player.body.velocity.y = -340;

    }
  }
}

module.exports = bunker


