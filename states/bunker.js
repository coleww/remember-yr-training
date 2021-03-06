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
var feature = require('../features')
var poetryGen = require('../poet')
bunker.prototype = {
  create: function () {
    this.counter = 0
    if (get('fanStillBroken') && feature.playNoise) {
        this.game.musician.startComputerNoise()
    }
    this.stuffDone = 0
    this.poemCount = 0
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our this.game


    this.hasJustGottenFirstThing = true

    this.hasNotGoneOffYet = true
    var that = this
    this.game.musician.change('bunker')
    this.wall1 = get('wall1')
    this.wall2 = get('wall2')
    this.inDialog = false
    this.speediness = 1



    this.ascendingTheLadder = false









    this.theMainbg = this.game.add.tileSprite(0, 0, 640, 720, 'wallll');





    // The this.player and its settings
    this.player = this.game.add.sprite(550, 900, 'dude');
    this.player.scale.setTo(1.5,1)
    //  We need to enable physics on the this.player


    //  Our two animations, walking left and right.
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3], 10, true);



    this.game.add.tileSprite(0, 720, 640, 960, 'walll');
    var top = this.game.add.tileSprite(0, 0, 640, 150, 'walllll');


    // make the ladder drop down later
    this.ladder = this.game.add.sprite(this.game.world.width / 2 + 40, 250, 'ladder');
    this.ladder.scale.setTo(0.15, 0.5)




    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    var topBarrier = this.platforms.create(0, 150, 'blank')
    topBarrier.body.setSize(640, 1, 0, 0)
    topBarrier.body.immovable = true


    var tippyTop = this.platforms.create(this.game.world.width / 2 - 72, 343, 'grid');

    tippyTop.body.setSize(200, 1, 0, 0)
    tippyTop.body.immovable = true
    tippyTop.body.checkCollision.down = false;
    tippyTop.scale.setTo(2, 2)

    this.chute = this.platforms.create(this.game.world.width / 2 + 25, 150, 'chute');
    this.chute.scale.setTo(0.45, 0.78)
    this.chute.body.immovable = true
    // Here we create the ground.



    var voltagebox = this.platforms.create(this.game.world.width / 2 - 120, 445, 'base');
    // voltagebox.scale.setTo(0.1, 0.1)
    voltagebox.body.immovable = true


    var speakerL = this.platforms.create(this.game.world.width / 2 - 152, 465, 'speaker');
    speakerL.scale.setTo(0.45, 0.78)
    speakerL.body.immovable = true

    var speakerR = this.platforms.create(this.game.world.width / 2 - 27, 465, 'speaker');
    speakerR.scale.setTo(0.45, 0.78)
    speakerR.body.immovable = true

    var ear = this.game.add.sprite(235, 197, "earpiece")
    ear.scale.setTo(0.35)

    var buttonthing = this.platforms.create(this.game.world.width / 2 - 120, 347, 'butts');
    buttonthing.body.immovable = true

    var tv = this.platforms.create(this.game.world.width / 2 - 153, 425, 'tv');
    tv.scale.setTo(0.4, 0.4)
    tv.body.immovable = true

    var radio = this.platforms.create(this.game.world.width / 2 - 127, 272, 'radio');
    radio.scale.setTo(0.45, 0.78)
    radio.body.setSize(96, 50, 5, 25)
    radio.body.immovable = true
//
    this.game.the_fan = this.game.add.sprite(this.game.world.width / 2 - 158, 380, 'fan');
    this.game.the_fan.scale.setTo(0.5, 0.5)

    var mach = this.game.add.sprite(this.game.world.width / 2 - 90,  245, 'mach');
    mach.scale.setTo(0.4, 0.78)

    var siren = this.game.add.sprite(this.game.world.width / 2 - 20, 420, 'siren');
    siren.scale.setTo(0.45, 0.78)

    var bulb = this.game.add.sprite(this.game.world.width / 2 - 78, 220, 'bulb');
    bulb.scale.setTo(0.3, 0.7)

    var fuse = this.game.add.sprite(this.game.world.width / 2 - 117, 246, 'fuse');
    fuse.scale.setTo(0.5, 0.75)












    var c1 = this.game.add.sprite(205, 398, "Cog")
    var c2 = this.game.add.sprite(265, 465, "Cog2")








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




    var blinky1 =  this.game.add.sprite(this.game.world.width / 2 - 56, 490, "blinky1")
        blinky1.animations.add('slow', [0, 1], 3, true);



    blinky1.animations.play('slow');
    var blinky2 =  this.game.add.sprite(this.game.world.width / 2 - 56, 430, "blinky2")
        blinky2.animations.add('slow', [0, 1], 1, true);



    blinky1.animations.play('slow');
    blinky2.animations.play('slow');


    var staticy = this.game.add.sprite(217, 465, 'static');
    staticy.scale.setTo(0.75, 1)
    staticy.animations.add('roll')
    staticy.play('roll', 1.33, true)
    // this.game.world.bringToTop(staticy)

    var chair = this.game.add.sprite(this.game.world.width / 2 + 30 , this.game.world.height - 305, 'chair');
    chair.scale.setTo(5)





    var table = this.platforms.create(this.game.world.width / 2 - 90, this.game.world.height - 310, 'table');
    table.scale.setTo(2, 1.5)
    table.body.immovable = true
    table.body.checkCollision.down = false;
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
    books.body.checkCollision.down = false;



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



    this.bed = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 303, 'cryobed');
    this.bed.frame = 0
//








// hrm, some little animation thing could be cool? would probs have to be in startDay tho?

    var close = this.bed.animations.add('close', [1, 0], 0.5, false);

    var open = this.bed.animations.add('open', [0, 1], 0.5, false);


    // close.loop = false





    this.inDialog = true



    // //  The score
    this.redrawMenu()
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.startDay()
    this.runTheWizard()
  },

  turnOnFan: function () {
    this.game.the_fan.loadTexture('fanworking')
    // var fanworking = this.game.add.sprite(this.game.world.width / 2 - 158, 380, 'fanworking');
    this.game.the_fan.scale.setTo(0.5, 0.5)
    this.game.the_fan.animations.add('working', [0, 1, 2, 3, 4], 3, true);
    this.game.the_fan.animations.play('working')
  },
  openInventory: function () {
    // open a dialog, draw out inventory stuff w/ sprites AND ummm like if they are useable?
    this.hasUsedSomething = true
    var that = this
    if (that.arrowinv) that.arrowinv.destroy()
    if (that.invtext) that.invtext.destroy()
    var menmen = this.drawMenuBox('menu')
    var title = this.game.add.text(50, 220, 'YR BACKPACK', { fontSize: '50px', fill: '#000' });
    var that = this
    var items = []
    var inv = get('inventory')
    var bonus = 0
        var x = 0
    var closey = that.game.add.text(500, 220, 'X', { fontSize: '40px', fill: '#3F3', wordWrap: true, wordWrapWidth: 120  });
    closey.inputEnabled = true
    items.push(closey)


    closey.events.onInputDown.add(function () {
      items.forEach(function (it){ it.destroy()})
      menmen.destroy()
      title.destroy()
      that.game.musician.playFX('twinkleshort')
      that.inDialog = false
    }, that)

    inv.forEach(function (opt, i) {
        if (i == 4) {
            bonus += 150
            x = 0
        }
        if (i == 8) {
            bonus += 150
            x = 0
        }
      var staticy = that.game.add.button(75 + x * 125, 325 + bonus, opt.sprite);
      staticy.scale.setTo(3.5)
      var descrip = that.game.add.text(75 + x * 125, 325 + bonus, opt.name, { fontSize: '23px', fill: '#3F3', wordWrap: true, wordWrapWidth: 120  });
      staticy.inputEnabled = true
      x++
      items.push(staticy)
      items.push(descrip)


      staticy.events.onInputDown.add(function () {
        items.forEach(function (it){ it.destroy()})
        that.game.musician.playFX('twinkleshort')
        title.destroy()
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
  redrawMenu: function () {
    var that = this
    var wallet = this.game.add.sprite(150, 20, 'wallet');
    wallet.scale.setTo(1.5)
    var hp = this.game.add.sprite(16, 25, 'hp');
    var bag = this.game.add.button(16, 60, 'bag');
    bag.inputEnabled = true
    bag.events.onInputDown.add(function () {
        if (!that.inDialog) that.openInventory()

        that.inDialog = true
    })

    bag.scale.setTo(0.75)
    this.hpDisplay = this.game.add.text(50, 25, get('health') + '/100', { fontSize: '22px', fill: '#FFF' });


    this.inventoryDisplay = this.game.add.text(65, 65, '' + get('inventory').map(function (item) {
        return item.name
    }).join(', '), { fontSize: '16px', fill: '#FFF', wordWrap: true, wordWrapWidth: 500 });

    this.inventoryDisplay.inputEnabled = true
    this.inventoryDisplay.events.onInputDown.add(function () {
        if (!that.inDialog) that.openInventory()

        that.inDialog = true
    })



    this.walletDisplay = this.game.add.text(200, 25, get('wallet') + '$', { fontSize: '22px', fill: '#FFF' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  redrawInventory: function () {
    this.inventoryDisplay.setText(get('inventory').map(function (item) {
        return item.name
    }).join(', '))
  },
  escapeTheBunker: function (launced) {
    // TODO TURN THIS BACK ON!
    // this.game.musician.stopAlarm()
    if (this.arrow) this.arrow.destroy()
    this.isEscaping = true
    if (launced) {
        // this.game.musician.playFX('modem')

        this.game.musician.playFX('missilelaunch')
        this.game.add.text(5, 850, 'YOU MUST ESCAPE THE BUNKER BEFORE IT EXPLODES!!!!', { fontSize: '20px', fill: '#000', wordWrap: true, wordWrapWidth: 400})
        var counter = 0

        var that = this
        this.over = false
        setInterval(function () {
            counter++

            if (counter > 30 && !that.ascendingTheLadder && !that.over) {
                that.over = true
                set('gameOver', 999)
                that.explodinate('evil')
            }
        }, 1000)

        // play missile launch sound
        // play tense soundtrack
    } else {
        this.game.musician.playFX('windloop')
        this.game.add.text(5, 850, 'Yr p sure that was a false alarm, but maybe u should climb to the surface just to double check?', { fontSize: '25px', fill: '#000', wordWrap: true, wordWrapWidth: 500})

        // silence everthing
        // play nice ambient music
    }

    set('launched', launced)
    var that = this
    that.arrow = that.game.add.sprite(355, 450, 'arrow')
            var tweenarrow = that.game.add.tween(that.arrow).to({width: 30, height:75}, 250, "Linear", true, 0, -1, true)
            // tween.onComplete.add(function () {
            //     danagePixel.destroy()
            // }, that)
                tweenarrow.yoyo(true)






    this.lowerLadder = true


// MOVE THE LADDER
// this.game.physics.arcade.moveToXY(
//     this.ladder,
// this.game.world.width / 2 + 40, 350,
//     2500 // velocity to move at
// )




    // somehow animate the ladder lowering?
    // get it's x/y
    // add this to the update loop:
    // somehow animate the dudy climbing up?
    // this.game.state.start('Silo')







    // set some game values?
    // lower the ladder, activate an action to walk up it?
  },

  openDialog: function (thing) {
            this.stuffDone+= 0.5
    var that = this
    if (this.isFaded && thing.faded) {
        thing = thing.faded
    } else if (!this.hasNotGoneOffYet && thing.alarmed) {
        thing = thing.alarmed
    }

    drawMenu(this.game, 'parch', thing, function (menu, obj) {
        // urggggh just put a gigantic case switch here for the few things that have fx?
        that.inDialog = false
        if (thing.yes !== 'ok') {
            thing.description = thing.description + ' you ' + thing.yes
            thing.yes = 'ok'
            thing.no = ''
            if (thing.no && thing.seed) {
                var al = get('alignment')
                al[thing.seed['neg']]++
                set('alignment', al)
            }
        }
        if (thing.fx) {
            that.useThing(obj, menu)
        } else {

            menu.destroy()
        }
        if (thing.theSwitch) {
            that.launchedTheMissiles = true
            that.escapeTheBunker(true)
        }

    }, function (thing) {
        thing.fx = false
        that.inDialog = false
        if (thing.yes !== 'ok') {
            thing.description = thing.description + ' you ' + thing.no
            thing.yes = 'ok'
            thing.no = ''

            if (thing.seed){
                var al = get('alignment')
                al[thing.seed['pos']]++
                set('alignment', al)
            }
        }
        if (thing.theSwitch) {
            that.escapeTheBunker(false)
        }
    })


    // based on whatever the thing is...."inspect thing" etc.
    // draw a dialog box, display the thing, prompt the user to do stuff
    // IF the thing is the poetry journal, defer to openJournal
    // IF it's the chest/vending machine, defer to those
  },
  maybeGoToSleep: function () {

        var that = this
        drawMenu(this.game, 'parch',
                 {name: 'CRY-O-BED',
                    description: 'you are not very tired right now bc u r a robot and robots do not get sleepy',
                    yes: 'oh, um...ok'
                },
                     function (menu) {
                        menu.destroy()
                        that.inDialog = false
                    })

  },
  hitTheFanIfYouAreThereAndYouHaventHitItYet: function (obj, menmen) {

    var y = this.player.y
    if (get('fanStillBroken') && this.player.body.touching.down && y >= 375 && y < 385) {
        set('fanStillBroken', false)
        this.game.musician.stopComputerNoise()


        this.game.computerStuff[3] = {name: 'a supra-dimensional fan',
                        description: 'it seems to be powered by an unknown and frightening energy source. maybe u should just let it do its job now that u fixed it ok',
        yes: 'ok',
        no: 'no i want to hit it again'}

        this.game.computerStuff[2].description = 'this computer is huge and confusing and you cannot quite remember what it does'
        this.game.computerStuff[2].yes = 'ok that sounds safe'
        // draw
        var that = this
        drawMenu(this.game, menmen,
                 {name: 'YOU FIXED IT!',
                    description: 'you hit the fan with your ' + obj.name + ' and that seems to fix the horrendous noise! what a weird fan tho it appears all extra-dimensional and stuff O_o',
                    yes: 'why yes ofc i am tough and also strong'
                },
                     function (menu) {
                        // THE FAN

                        that.turnOnFan()
                        menu.destroy()
                        that.inDialog = false
                    })
        return false
    } else if (this.player.body.touching.down && y >= 375 && y < 385) {
        // OH THIS SHOULD EXPLODINATE!

var that = this
        drawMenu(this.game, menmen,
                 {name: 'YOU DESTROYED IT!',
                    description: 'you hit the fan AGAIN with your ' + obj.name + ', despite being warned about it, and you rupture the ultra-dimensional power source. Great job.',
                    yes: 'i am a nihilist who revels in the destruction of all existence, yes thanks'
                },
                     function (menu) {
                        // THE FAN
                        set('gameOver', 505)
                        that.turnOnFan()
                        menu.destroy()
                        that.explodinate('evil')
                        that.inDialog = false
                    })



























        return false
    } else {
        return this.alsoHitTheVendingMachineIfYouAreThereAndYouHaventHitItYet(obj, menmen)
    }
  },

  alsoHitTheVendingMachineIfYouAreThereAndYouHaventHitItYet: function (obj, menmen) {
    console.log('checking the thing!', this.player.x, this.vendBroken)
    var x = this.player.x
    if (!this.vendBroken && this.player.body.touching.down && x >= 45 && x < 50) {
        this.vendBroken = true
        this.game.musician.playFX('shatter')


        this.hpDisplay.setText(dec('health', 15) + '/100')
        // this.game.tint
        this.game.musician.playFX('crunch')
        this.takeDamage()
        this.checkForDeath()



        // check for vendbroken in vend thing, say something else instead
        // deduct some health, do the pain animation
        // same for no option





        var that = this
        drawMenu(this.game, menmen,
                 {name: 'OUCH!',
                    description: 'you hit the vending machine with your ' + obj.name + ' and hurt yrself in the process and now its broken good job',
                    yes: 'worth it *flexes*'
                },
                     function (menu) {
                        // THE FAN

                        menu.destroy()
                        that.inDialog = false
                    })
        return false
    } else if (this.player.body.touching.down && x >= 45 && x < 50) {
        // OH THIS SHOULD EXPLODINATE!
        this.hpDisplay.setText(dec('health', 25) + '/100')
        // this.game.tint
        this.game.musician.playFX('crunch')
        this.takeDamage()
        this.checkForDeath()
var that = this
        drawMenu(this.game, menmen,
                 {name: 'again? srsly?',
                    description: 'you hit the vending machine AGAIN with your ' + obj.name + ', which didnt help, and actually hurt more. nice.',
                    yes: 'i am a nihilist who revels in the destruction of all existence, yes thanks'
                },
                     function (menu) {
                        // THE FAN
                        menu.destroy()
                        that.inDialog = false
                    })



























        return false
    } else {
        return true
    }
  },
  explodinate: function (type) {
    this.bed.frame = 2
    var explodinations = {
        evil: ['fireball', 'fireblast', 'flame'],
        trippy: ['rainbow1', 'rainbow2', 'unicorn']
    }

    var sprites = explodinations[type]
    var count = 0
    var that = this

    var interv = setInterval(function () {
        count++
        var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 3)
        exploding.angle = (Math.random() * 360) - 180
        if (count > 50) {
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 4)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 100) {
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 5)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 150){
var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 6)
        exploding.angle = (Math.random() * 360) - 180
        }
        if (count > 250) {
            var exploding = that.game.add.sprite( Math.random() * that.game.world.width, Math.random() * that.game.world.height, pick(sprites));
        exploding.scale.setTo(Math.random() * 7)
        exploding.angle = (Math.random() * 360) - 180
        }
        // fuckme
        that.game.world.bringToTop(that.player)

        if (count > 250) {
            clearInterval(interv)
            that.game.state.start("GameOverScreen")
        }
    }, 50)
  },
  openPortalToTheDeathPit: function () {
    var that = this
    this.game.musician.playFX('twinklelong')
    this.game.musician.playFX('WAHHHHH')
    var portal = this.game.add.sprite(this.player.x, this.player.y, 'portal');
    portal.anchor.set(0.5)
        var tween = this.game.add.tween(portal).to({width: 2240, height:5000}, 6500, "Linear", true, 0, 0, false)
        tween.onComplete.add(function () {
            portal.destroy()
            that.game.state.start("DeathPit")
        }, this)
  },
  turnOffTV: function () {
    // var cnv = this.game.canvas
    // var ctx = this.game.context()

    // // 640 X 960
    // var y = 0
    // var h = 960
    // for (var i = 0; i < 240; i++){
    //     ctx.drawImage(cnv, 0, y + i, 640, h - i * 2)
    // }
    // for (var i = 0; i < 320; i++){
    //     ctx.drawImage(cnv, 0 + i, 479, 640 - i * 2, 482)
    // }

            this.game.state.start("GameOverScreen")
  },
  useThing: function (thing, menmen) {
    var continueMenu = true
    var explodeIt
    var that = this
    switch(thing.fx) {
        case 'gameOver1':
            set('gameOver', 1)
            this.turnOffTV()












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
        case 'hp25':
            this.hpDisplay.setText(inc('health', 25) + '/100')
            break;
        case 'hp50':
            this.hpDisplay.setText(inc('health', 50) + '/100')
            break;
        case 'canpunch':
            this.canPunch = true
            push('inventory', {
                name: 'your fists',
                description: 'that tofu thing u ate has made you hecka swole and ready to fight',
                fx: 'punchStuff',
                sprite: 'fist',
                yes: 'lash out at the world',
                extended: 'you punch out at the world, it is their own fault if someone happens to get in the way',
                no: 'write some poetry instead',
                oneTimeUse: false
            })
            this.redrawInventory()
            break;
        case 'greenspeed':
            this.player.loadTexture('greendude', 0);
            set('fast', true)
            this.speediness = 2
            break;
        case 'flashy':
            this.player.loadTexture('bluedude', 0);
            set('slow', true)
            this.speediness = 0.5
            // stuff
            break;
        case '$10':
            // stuff
            this.walletDisplay.setText(inc('wallet', 5) + '$')
            break;
        case '$25':
            // stuff
            this.walletDisplay.setText(inc('wallet', 5) + '$')
            break;
        case 'faded':
            // stuff
            this.isFaded = true
            break;
        case 'breadart':
            // stuff
            var that = this

            ;[[114, 685], [245, 625], [350, 620], [515, 650], [615, 630]].forEach(function (coords) {
                var bread = that.game.add.sprite(coords[0], coords[1], 'breaded');
                bread.anchor.setTo(0.5, 0.5);

                bread.angle = ((Math.random() * 2) - 1) * ((Math.random() * 25) + 5)
                bread.scale.setTo(0.35)
                that.world.sendToBack(bread)
            })
            this.world.bringToTop(menmen)
            this.world.sendToBack(this.theMainbg)
            break;
        case 'punchStuff':
            continueMenu = this.hitTheFanIfYouAreThereAndYouHaventHitItYet(thing, menmen)
            break;
        case 'chickenattack':
            // stuff
            continueMenu = this.hitTheFanIfYouAreThereAndYouHaventHitItYet(thing, menmen)
            // IF AT THE FAN, can hit it to stop the noise?
            break;
        case 'transformtrip':
            this.player.loadTexture('trippyb', 0);
            // open iframes of other games?
            set('gameOver', 420)
            explodeIt = 'trippy'
            //
            // stuff
            break;
        case 'transformevil':
            this.player.loadTexture('boss', 0);
            // player should begin spewing fire everywhere and slowly taking damage
            set('gameOver', 451)

            explodeIt = 'evil'
            // stuff
            break;
        case 'fireslash':
            // stuff
            continueMenu = this.hitTheFanIfYouAreThereAndYouHaventHitItYet(thing, menmen)
            // IF AT THE FAN, can hit it to stop the noise?
            break;
        case 'gooslash':
            // stuff
            continueMenu = this.hitTheFanIfYouAreThereAndYouHaventHitItYet(thing, menmen)
            // IF AT THE FAN, can hit it to stop the noise?
            break;
        case 'darkslash':
            // stuff
            set('isTrappedInTheDeathPitForever', true)
            this.openPortalToTheDeathPit()
            // draw that portal sprite over you?
            // tween it to cover the whole screen?
            // on animation complete, move to gameOver
            break;
        case 'makeTree':
            // stuff
            // just draw the sprite behind the character wherever they are standing


            var tree = this.game.add.sprite(this.player.x, this.player.y, 'tree');
            this.game.treeCoords = [this.player.x, this.player.y]
            tree.scale.setTo(1.2)
            this.world.bringToTop(menmen)
            break;
        case 'makeBloodSculpture':
            // stuff
            // just draw the sprite behind the character wherever they are standing
            var bloodsculpt = this.game.add.sprite(this.player.x, this.player.y, 'bloodsculpt');
            this.game.bloodSculptureCoords = [this.player.x, this.player.y]
            bloodsculpt.scale.setTo(0.5)
            this.world.bringToTop(menmen)
            break;
        case 'makeGold':
            // stuff
            this.walletDisplay.setText(inc('wallet', 500) + '$')
            break;
        case 'read':
            // i think thiss all?
            break;
        case 'drunkescape':
            // continueMenu = false
            set('escapingDrunkenly', true)
            set('launchedTheMissiles', true)
            this.launchedTheMissiles = true
            this.setOffTheBoomBoom(true)
            this.escapeTheBunker(true)
            this.hasNotGoneOffYet = false
            break;
    }
    if (continueMenu) {
        var whatHappened  = this.game.add.text(50, 370, thing.extended, { fontSize: '20px', fill: '#000', wordWrap: true, wordWrapWidth: 500 });
        var confirm  = this.game.add.text(150, 570, 'OK COOL THANKS', { fontSize: '20px', fill: '#08D' });
        confirm.inputEnabled = true;
        var that = this
        //REFACTOR THISSSSSSSSSSS
        confirm.events.onInputDown.add(function  (thin) {
            // RUN THE STUFF!
            that.inDialog = false
            if (thing.item) {
                if (that.hasJustGottenFirstThing) that.addInventoryArrow()
                that.hasJustGottenFirstThing = false
                push('inventory', thing.item)
                that.redrawInventory()
            }
            if (explodeIt) {

                this.explodinate(explodeIt)
            }
            menmen.destroy()
            whatHappened.destroy()
            confirm.destroy()
        }, this);
    } else {
        that.inDialog = false
            // menmen.destroy()????
    }

    if (thing.oneTimeUse) {
        var inv = get('inventory')
        set('inventory', inv.filter(function (it) {
            return it.name !== thing.name
        }))
        that.redrawInventory()
    }

  },
  takeDamage: function () {
    var danagePixel = this.game.add.sprite(300,300, "damage")
    danagePixel.anchor.set(0.5)
    var tween = this.game.add.tween(danagePixel).to({width: 2240, height:5000}, 500, "Linear", true, 0, 0, false)
    tween.onComplete.add(function () {
        danagePixel.destroy()
    }, this)
    // tween.yoyo(true)
  },
  drawMenuBox: function (type) {
    var menuBox = this.game.add.sprite(0, 150, type);
    menuBox.scale.setTo(3.75, 5)
    return menuBox
  },
  vend: function () {
    var menmen = this.drawMenuBox('menu') // or 'parch'

    if (this.arrowvend) this.arrowvend.destroy()
    var that = this
    var cash
    if (this.vendBroken){
        drawMenu(this.game, menmen, {
                    name: 'VEND-O-3000',
                 description: 'u broke the vending machine, remember? GOOD JOB',
                 yes: 'nice',
                 no: 'wowwwwww'},
                 function (men, obj) {
                    men.destroy()
                    that.inDialog = false
                 }, function (obj) {
                    that.inDialog = false
                 })
    } else if (!this.game.vendingItems.length) {
        drawMenu(this.game, menmen, {
                    name: 'VEND-O-3000',
                 description: 'SOLD OUT! YOU HAVE CONSUMED EVERYTHING THERE IS TO CONSUME GOOD JOB',
                 yes: 'nice',
                 no: 'wowwwwww'},
                 function (men, obj) {
                    men.destroy()
                    that.inDialog = false
                 }, function (obj) {
                    that.inDialog = false
                 })

    } else if ((cash = get('wallet')) >= 5) {
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
            this.stuffDone++
    var item = this.game.vendingItems.pop()
    var newMoneyFlow = dec('wallet', 5)
    this.hasBoughtStuff = true
    this.walletDisplay.setText(newMoneyFlow + '$')
    // display them and stuffzzz.
    // add the click buttons too
    var title = this.game.add.text(50, 220, item.name, { fontSize: '60px', fill: '#000' });
    var that = this
    var items = []
    item.sprites.forEach(function (opt, i) {
      var staticy = that.game.add.button(75 + i * 180, 325, opt);
      staticy.scale.setTo(4)
      var descrip = that.game.add.text(75 + i * 180, 466, item.descriptions[i], { fontSize: '19px', fill: '#000', wordWrap: true, wordWrapWidth: 150  });
      staticy.inputEnabled = true
      staticy.events.onInputDown.add(function () {
        var al = get('alignment')
        al[item.seed[i]]++
        set('alignment', al)
        push('inventory', {name: item.names[i], description: item.descriptions[i], sprite: opt, fx: item.fx[i], oneTimeUse: item.oneTime[i], extended: item.extended[i], yes: item.yes[i], no: item.no[i]})
        push('seeds', item.seed[i])
        if (that.hasJustGottenFirstThing) that.addInventoryArrow()
        that.hasJustGottenFirstThing = false
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
    if (next == 'linebreak') words = []
    var nexts = [poetryGen(words[words.length - 1]),
    poetryGen(words[words.length - 1]),
    poetryGen(words[words.length - 1])].filter(function (m,i,a) {
        return a.indexOf(m) == i
    })

    while (nexts.length < 3) {
        nexts.push(poetryGen())
    }


    var punct = ['linebreak','(', ')', '[', ']', '!', '?', '.', ':', ';', '~', '/', '\\']

    nexts = nexts.concat(punct)




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
      this.runPoem(thing.text)
    }

  },
  writeAPoem: function () {
    if (this.arrowpo) {
        this.arrowpo.destroy()
        this.isTheFirstPoem = true
    }
    this.currentOptions = []
    // var poetryBG = this.game.add.sprite(-160, 60, 'paper3')
    // poetryBG.scale.setTo(30, 25)
    this.game.musician.playFX('twinklelong')
    this.game.musician.change('poetry')
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

    var instructions = this.game.add.text(175, 175, 'CLICK TEH BLUE WORDS 2 WRITE A POEM', { fontSize: '20px', fill: '#700'});




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

    this.game.musician.change('bunker')
    }, this);

    save.events.onInputDown.add(function () {
        this.stuffDone++
      var c = get('poemCount')
      this.poemCount++
      var days = ['', '', '', '']
      // record the day/time the poem was written
      // THE FIRST DAY! would be hellllla far in the past tho. only see that after exiting.
      set('poem' + c, {poem: that.poem})
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
          this.game.musician.change('bunker')
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
    if (!get('fanStillBroken')) this.turnOnFan()

    if (this.isFaded) {
        this.isFaded = false
    }

    this.hasUsedSomething = false
    this.lowerLadder = false
    this.isEscaping = false
    this.launchedTheMissiles = false
    this.vendBroken = false
    this.isFaded = false
    this.canPunch = false
    this.hasBoughtStuff = false
    this.hasWrittenAPoemToday = false
    this.ascendingTheLadder = false
    this.isDone = false


    // have player emerge from bed?
    // open the bed door?


    // STUFF GETS PROGRESSIVELY MORE GNAR









this.itIsTheLastDay = true

    this.hasWrittenAPoemToday = false
    var day = pick([2, 3, 4])

      if (day == 2) {
      var book1 = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 310, 'book1');
      book1.scale.setTo(0.5)
      this.mug = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 315, 'mug');
      this.mug.scale.setTo(0.75)
      var paper = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'linedpaper');


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

      this.jug = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 315, 'jug');
      this.jug.scale.setTo(0.5)
      var book2 = this.game.add.sprite(this.game.world.width / 2 , this.game.world.height - 310, 'book2');
      book2.scale.setTo(0.5)
      var paper2 = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'blankpaper');

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
      this.papert = this.game.add.sprite(this.game.world.width / 2 - 90, this.game.world.height - 315, 'papert');
      this.pizza = this.game.add.sprite(this.game.world.width / 2 - 20, this.game.world.height - 315, 'pizza');
      this.pizza.scale.setTo(0.75)
      var paper3 = this.game.add.sprite(this.game.world.width / 2 - 60, this.game.world.height - 300, 'paper3');


    }
    // this.game.world.bringToTop(this.platforms)

    var bg = this.game.add.sprite(0, 0, 'black');
    bg.scale.setTo(5, 7)
    // bg.anchor.setTo(0.5, 0.5);
    bg.alpha = 1;
    var that = this
    var t = this.game.add.tween(bg).to( { alpha: 0 }, 2500, "Linear", true, 0, 0, false).start();
    t.onComplete.add(function () {
        console.log('nope?')
        that.game.tweens.remove(t)
        that.bed.animations.play('open', true)


        var inty = setInterval (function () {
            that.player.y -= 10
            if (that.player.y < 666) {
                clearInterval(inty)
                           that.inDialog = false
            that.game.physics.arcade.enable(that.player);
                //  that adjusts the collision body size to be a 100x50 box.
            //  50, 25 is the X and Y offset of the newly sized box.

            that.player.body.setSize(10, 43, 20, 0);

            //  that.Player physics properties. Give the little guy a slight bounce.
            that.player.body.bounce.y = 0.2;
            that.player.body.gravity.y = 300;
            that.player.body.collideWorldBounds = true;

            that.game.world.bringToTop(that.player)
              if (day == 2) {
              that.game.world.bringToTop(that.mug)

              // this.game.world.bringToTop(book1)

            } else if (day == 3) {


              that.game.world.bringToTop(that.jug)
              // this.game.world.bringToTop(book2)

            } else {

              that.game.world.bringToTop(that.pizza)

              that.game.world.bringToTop(that.papert)
            }
            if (feature.explode) {
            that.hasNotGoneOffYet = false
            that.setOffTheBoomBoom()
        }
            }
        }, 100)







        // that.game.physics.arcade.moveToXY(
        //     that.player,
        //     that.player.x,
        //     670,
        //     10, // speed,
        //     2500 // maxTimeToFinish(ms)
        // );
        // setTimeout(function () {

        // }, 2650)



        // TODO ANIMATE THE PALYER EMERGING
      bg.destroy()




      // OHHH MAYBE DROP THE PLAYER IN HERE?

    }, this)




  },

  interactIfTouchingThing: function (x, y) {
    if (!this.inDialog) {
      if (y > 669 && y < 685) {
          // TOUCHING THE GROUND!!!!!
          if (x >= 45 && x < 50) {
              // vending machine
              this.inDialog = true
              this.vend()
          } else if (x >= 80 && x < 130 && this.wall1) {
            // BOOKSHELF!
              this.inDialog = true
            this.openDialog(this.game.tableStuff[3])

          }else if (x >= 150 && x < 200) {
            // BOOKSHELF!
              this.inDialog = true
            this.openDialog(this.game.tableStuff[2])

          } else if (x >= 210 && x < 235) {
              // left desk item
              this.inDialog = true
              this.openDialog(this.game.tableStuff[0])

          } else if (x >= 240 && x < 275) {

              this.inDialog = true
            this.writeAPoem()
          } else if (x >= 280 && x < 320) {
              // right desk item

              this.inDialog = true
              this.openDialog(this.game.tableStuff[1])
          }  else if (x >= 420 && x < 450 && this.wall2) {
            this.inDialog = true
            this.openDialog(this.game.tableStuff[4])
          }else if (x >= 520 && x < 570) {
            this.inDialog = true
            this.maybeGoToSleep()
          }
      } else if ((y >= 400 && y < 405)) {
        // if (x >= 150 && x < 200) {
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
      } else if (this.isEscaping && !this.over && y > 490 && y < 500 && x > 320 && x < 360) {

        this.ascendingTheLadder = true
        this.game.world.bringToTop(this.chute)
        this.game.world.bringToTop(this.platforms)
        this.inDialog = true
        // this.player.body.gravity = -1
        this.chute.body.setSize(0,0,0, 0);
        this.player.body.velocity.y = -1000
      }
    }

    // figure these out once object positions are set in stone
  },
  checkForDeath: function () {
    if (get('health') <= 0) {
        set('gameOver', 3)
        this.game.state.start("GameOverScreen")
    }
  },

  runTheWizard: function () {
    // vending
    // poems
    // inventory, etc.
    // bed


this.wizard = this.game.add.text(400, 320, 'use arrow keys to move. press down to inspect objects.', { fontSize: '20px', fill: '#111', wordWrap: true, wordWrapWidth: 200 });



    this.arrowpo = this.game.add.sprite(265, 595, 'arrow')
    var tweenarrowpo = this.game.add.tween(this.arrowpo).to({width: 30, height:75}, 250, "Linear", true, 0, -1, true)
    tweenarrowpo.yoyo(true)

    this.arrowvend = this.game.add.sprite(60, 600, 'arrow')
    var tweenarrowvend = this.game.add.tween(this.arrowvend).to({width: 30, height:75}, 250, "Linear", true, 0, -1, true)
    tweenarrowvend.yoyo(true)

  },







  addInventoryArrow: function () {
    this.invtext = this.game.add.text(200, 50, 'click on yr bag to open inventory.', { fontSize: '20px', fill: '#EEE', wordWrap: true, wordWrapWidth: 200 });

    this.arrowinv = this.game.add.sprite(210, 60, 'arrow')
    this.arrowinv.angle = 90
    var tweenarrowinv = this.game.add.tween(this.arrowinv).to({width: 30, height:75}, 250, "Linear", true, 0, -1, true)
    tweenarrowinv.yoyo(true)
  },





  setOffTheBoomBoom: function (noarrow) {
    this.game.musician.playFX('alclock')
    this.game.musician.playFX('WAHHHHH')
    this.game.musician.change('tense')
    var danagePixel = this.game.add.sprite(300,300, "damage")
    danagePixel.anchor.set(0.5)
    var that = this
    var tween = this.game.add.tween(danagePixel).to({width: 2240, height:5000}, 250, "Linear", true, 0, 6, false)
    tween.onComplete.add(function () {
        danagePixel.destroy()
        if (!noarrow){
            that.arrow = that.game.add.sprite(235, 250, 'arrow')
            var tweenarrow = that.game.add.tween(that.arrow).to({width: 30, height:75}, 250, "Linear", true, 0, -1, true)
            // tween.onComplete.add(function () {
            //     danagePixel.destroy()
            // }, that)
                tweenarrow.yoyo(true)
            // arrow.scale.setTo(100)
                    // arrow.angle = 90
            // ?
        }
    }, this)
    tween.yoyo(true)
  },


  update: function () {
    // this.game.input.y)
    this.game.physics.arcade.collide(this.player, this.platforms);

    if (this.ascendingTheLadder && !this.isDone) {
        if (this.player.y < 200 && !this.isDone) {
            this.isDone = true
            var al = get('alignment')


            // {greed: 0, fight: 0, nature: 0, pos: 0, neg: 0
            function getAlignment (al) {
              var arr = [al.greed, al.fight, al.nature]
              var i = arr.indexOf(Math.max.apply(Math, arr));
              var firstHighest = arr[i]
              var conflicted = arr.lastIndexOf(firstHighest) !== i
              return conflicted ? 'conflicted' : ['greed', 'fight', 'nature'][i]
            }

            var align = getAlignment(al)

            this.game.state.start(this.launchedTheMissiles ? 'explosion' : align)
        }
    }

if (!this.inDialog){
    if (this.lowerLadder && this.ladder.y < 360) {
        this.ladder.y += 0.5
    }
    var xDir = 0
    var yDir = 0


    if (!this.launchedTheMissiles && this.stuffDone > 5 && !this.inDialog && this.itIsTheLastDay && this.hasWrittenAPoemToday && this.hasBoughtStuff && this.hasUsedSomething && this.hasNotGoneOffYet && ((this.poemCount >= 3 && Math.random() < 0.05) || (Math.random() < 0.0015)  )              ){
        this.hasNotGoneOffYet = false
        this.setOffTheBoomBoom()
        // make everything explode?
    }


    if (this.player.body.touching.down) {
        if (this.willTakeFallDamage && this.player.y > 580) {
            this.hpDisplay.setText(dec('health', 15) + '/100')
            // this.game.tint
            this.game.musician.playFX('crunch')
            this.takeDamage()
            this.checkForDeath()
        }
        this.willTakeFallDamage = false
    } else if (this.player.x < 311 && this.player.y < 400) {
        this.willTakeFallDamage = true
    }


    var fadedMulti = 1


    if (this.cursors.left.isDown || (this.isFaded && Math.random() < 0.05)) {
        if (this.wizard) this.wizard.destroy()
        //  Move to the left
        if (this.isFaded && Math.random() < 0.1) fadedMulti = ~~(Math.random() * 2) - 1
        xDir = -5  * fadedMulti
        if (this.isFaded && Math.random() < 0.1) fadedMulti = (Math.random() * 2) - 1
        this.player.body.velocity.x = -150 * this.speediness * fadedMulti;
        if (this.player.body.touching.down) {
          this.player.animations.play('left');
        } else {
          this.player.animations.stop()
          this.player.frame = [5, 7][~~(Math.random() * 2)]
        }
    } else if (this.cursors.right.isDown || (this.isFaded && Math.random() < 0.05)) {
        if (this.wizard) this.wizard.destroy()
        if (this.isFaded && Math.random() < 0.1) fadedMulti = ~~(Math.random() * 2) - 1
        xDir = 5  * fadedMulti
        if (this.isFaded && Math.random() < 0.1) fadedMulti = (Math.random() * 2) - 1
        this.player.body.velocity.x = 150 * this.speediness * fadedMulti;
        if (this.player.body.touching.down) {
          this.player.animations.play('right');
        } else {
          this.player.animations.stop()
          this.player.frame = [11, 9][~~(Math.random() * 2)]
        }
    } else if (this.cursors.down.isDown) {
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
        if (this.wizard) this.wizard.destroy()
        this.game.musician.playFX('pew')
      this.player.body.velocity.y = -320 - (20 * this.speediness);


    }




    this.game.musician.updateComputerNoise(this.game, this.player.x, this.player.y, xDir, 0)
}
  }
}

module.exports = bunker


