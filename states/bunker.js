var db = require('../db')
var get = db.get
var set = db.set

var bunker = function (game) {
  this.game = this.game
}

var poetryGen = require('../poet')

bunker.prototype = {
  create: function () {
    this.inDialog = false
    console.log("WE IN THE BUNKER")

    this.tableStuff = []

    this.vendingItems = shuffle([
      {name: 'boots',
        descriptions: [
          'green boots are great for running and hiking through nature! no grass stains! booyah!',
          'these soft luxurious boots are excellent for lounging and chilling',
          'you like to kick stuff rly hard and also you like shiny things'],
        sprites: ['BootsGreen', 'BootsSoft', 'BootsMetal'],
        fx: ['greenspeed','flashy','kick'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?

      },
      {name: 'foods',
        descriptions: ['a delicious cold beer. yr a robot so i am not sure what will happen if you pour this all over yourself.... be careful!',
        'delicious bread. you can maybe hang slices of bread on the wall like art?',
        'some sort of leg to an animal. poor thing. you will honor the life of this magnificient creature by wielding this bone as a crude bludgeon in your quest for justice'],
        sprites: ['FoodAle', 'FoodBread', 'FoodDrumstick'],
        fx: ['faded','breadart','chickenattack'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
      },
      {name: 'gloves',
        descriptions: ['gold is actually quite malleable and not very protective but DAMN THESE GLOVES LOOK GOOD',
        'leather gloves. sturdy, flexible, dependable. you can also wear one on your head and pretend to be a chicken',
        'CLEAN MEAN STEEL. good for punching people and also walls'],
        sprites: ['GlovesGold', 'GlovesLeather', 'GlovesSteel'],
        fx: ['flashy','chickenhead','punch'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
      },
      {name: 'shrooms',
        descriptions: ['looks like the sort of mushroom that you get on pizzas. mmmm. pizza. yes you totally can probably eat this',
        'this one looks...intriguing. it has like, this kind of aura going on, you know? but the aura is also menacing?',
        'this mushroom is literally oozing out what appears to be blood, and when you put your ear close to it a faint grinding and gnashing sound can be heard.'],
        sprites: ['MushroomBrown', 'MushroomPurple', 'MushroomRed'],
        fx: ['hp25','transformtrip','transformevil'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
      },
      {name: 'robes',
        descriptions: ['this robe is blue, and it looks just like the ocean under the moon','this robe is green, which is the same as the emotion that i get from you','this robe is red, which is the color of your heart which you should give to me or else forget about it'],
        sprites: ['RobeB', 'RobeG', 'RobeR'],
        fx: ['hp25','$10','hp25'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
      },
      {name: 'swords',
        descriptions: ['this sword appears to be constantly on fire, which is itself pretty frigging sweet, but on top of that free heater for life? KA CHING',
        'erm, this sword is pretty gross and just keeps leaking this slime everywhere, it kind of has the consistency of gak? do you remember gak? *googles to see if they still make gak*',
        'this sword casts a shadow upon everything near it and appears to be sucking in all the light in the room. it appears quite powerful but may also control your soul if you wield it?'],
        sprites: ['Sword1', 'Sword2', 'Sword3'],
        fx: ['fireslash','gooslash','darkslash'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
      },
      {name: 'potions',
        descriptions: ['a green potion, the color of MORE MONEY! or is nature?',
        'a red potion, the color of your blood and the blood of your enemies!',
        'a yellow potion, the color of, um, piss? pee pee. number 1. *giggles*'],
        sprites: ['VialG', 'VialR', 'VialY'],
        fx: ['makeTree','makeBloodSculpture','makeGold'],// what happens when the thing is used, run thru huge switch statement o_o
        seed: []// keys to an object of corpii for later?
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

    var radio = this.platforms.create(this.game.world.width / 2 - 123, 272, 'radio');
    radio.scale.setTo(0.45, 0.78)
    radio.body.setSize(93, 50, 5, 25)
    radio.body.immovable = true

    var fan = this.game.add.sprite(this.game.world.width / 2 - 158, 380, 'fan');
    fan.scale.setTo(0.5, 0.5)

    var mach = this.game.add.sprite(this.game.world.width / 2 - 90,  245, 'mach');
    mach.scale.setTo(0.4, 0.78)

    var siren = this.game.add.sprite(this.game.world.width / 2 - 20, 420, 'siren');
    siren.scale.setTo(0.45, 0.78)

    var bulb = this.game.add.sprite(this.game.world.width / 2 - 78, 220, 'bulb');
    bulb.scale.setTo(0.3, 0.7)

    var fuse = this.game.add.sprite(this.game.world.width / 2 - 114, 246, 'fuse');
    fuse.scale.setTo(0.5, 0.75)

    var arrows = this.game.add.sprite(215, 405, 'arrows');
    // arrows.scale.setTo(0.5, 0.5)

    var bars = this.game.add.sprite(230, 350, 'bars');
    // bars.scale.setTo(0.4, 0.78)

    var circs = this.game.add.sprite(173, 428, 'circs');
    // circs.scale.setTo(0.45, 0.78)

    var squares = this.game.add.sprite(205, 360, 'squares');
    // squares.scale.setTo(0.3, 0.7)

    var ticks = this.game.add.sprite(235, 350, 'ticks');
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
    var candle1 = this.game.add.sprite(220, 605, 'wallArt3');
    candle1.scale.setTo(2)
    candle1.anchor.setTo(.5,.5);

candle1.scale.x *= -1;
    var candle2 = this.game.add.sprite(120, 550, 'wallArt3');
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
    this.player = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 800, 'dude');
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
    this.startDay(1)
  },
  redrawMenu: function () {
    this.hpDisplay = this.game.add.text(16, 25, 'hp: 100/100', { fontSize: '22px', fill: '#FFF' });
    this.inventoryDisplay = this.game.add.text(16, 50, 'inventory:' + this.game.inventory.map(function (item) {
        return item.name
    }).join(', '), { fontSize: '22px', fill: '#FFF' });

    this.walletDisplay = this.game.add.text(16, 75, this.game.wallet + '$', { fontSize: '22px', fill: '#FFF' });
    // LATER: actually do this with like, erm, buttons for the items?
  },
  redrawInventory: function () {
    this.inventoryDisplay.setText('inventory:' + this.game.inventory.map(function (item) {
        return item.name
    }).join(', '))
  },
  openDialog: function (thing) {
    // based on whatever the thing is...."inspect thing" etc.
    // draw a dialog box, display the thing, prompt the user to do stuff
    // IF the thing is the poetry journal, defer to openJournal
    // IF it's the chest/vending machine, defer to those
  },
  useThing: function (thing) {
    // activate the fx of a thing
  },
  drawMenuBox: function () {
    var menuBox = this.game.add.sprite(0, 150, 'menu');
    menuBox.scale.setTo(3.75, 5)
    return menuBox
  },
  vend: function () {
    var menmen = this.drawMenuBox()


    var instruct = this.game.add.text(50, 220, 'INSERT $5?', { fontSize: '60px', fill: '#FFF' });
    if (this.game.wallet >= 5) {
      var yay  = this.game.add.text(150, 370, 'YAYYYYY!!!', { fontSize: '40px', fill: '#FFF' });
      var nay  = this.game.add.text(150, 450, 'NAHHHHHHH.', { fontSize: '40px', fill: '#FFF' });
      yay.inputEnabled = true;
      nay.inputEnabled = true
      var that = this
      yay.events.onInputDown.add(function  (thing) {
        // RUN THE STUFF!
        that.game.wallet -= 5
        this.walletDisplay.setText(that.game.wallet + '$')
        instruct.destroy()
        yay.destroy()
        nay.destroy()
        that.buyThing(menmen)
      }, this);
      nay.events.onInputDown.add(function  (thing) {

        instruct.destroy()
        yay.destroy()
        nay.destroy()
        menmen.destroy()
        that.inDialog = false

      }, this);
    } else {
      var ok  = this.game.add.text(150, 370, 'YOU AINT GOT ENOUGH CASH! GET A JOB! oh wait, this is yr job, when do u get paid? hmmmm', { fontSize: '40px', fill: '#FFF' });
      ok.inputEnabled = true
      ok.events.onInputDown.add(function (clicky) {
        ok.destroy()
        menmen.destroy()
      })
    }
    // this.game.world.bringToTop(yay)
    // this.game.world.bringToTop(nay)
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
        that.game.inventory.push({name: item.name, description: item.descriptions[i], sprite: opt})
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
      var option = that.game.add.text(155 + i * 100, that.poemDisplay.bottom + 25 + i * 33, opt, { fontSize: '20px', fill: '#F00' })
      option.inputEnabled = true;
      option.events.onInputDown.add(select, that);
      that.currentOptions.push(option)
    })
    function select (thing) {
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      console.log(thing.text)
      this.runPoem(thing.text)
    }

  },
  writeAPoem: function () {
    this.currentOptions = []
    var poetryBG = this.game.add.sprite(-160, 60, 'paper3')
    poetryBG.scale.setTo(30, 25)
    var instructions = this.game.add.text(155, 175, 'WRITE A POEM', { fontSize: '30px', fill: '#000'});

    this.poem = poetryGen()
    this.poemDisplay = this.game.add.text(155, 250, this.poem, { fontSize: '15px', fill: '#000', align: 'left', wordWrap: true, wordWrapWidth: 450  })
    this.runPoem()
    var that = this
    var quit = that.game.add.text(175, 135, 'quit', { fontSize: '20px', fill: '#00F' })
    var save = that.game.add.text(250, 135, 'save', { fontSize: '20px', fill: '#00F' })


    save.inputEnabled = true;
    quit.inputEnabled = true;

    quit.events.onInputDown.add(function () {
      poetryBG.destroy()
      that.poemDisplay.destroy()
      quit.destroy()
      instructions.destroy()
      save.destroy()
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      that.inDialog = false
    }, that);

    save.events.onInputDown.add(function () {
      var c = get('poemCount')
      set('poem' + c, that.poem)
      set('poemCount', ++c)

      poetryBG.destroy()
      that.poemDisplay.destroy()
      quit.destroy()
      instructions.destroy()
      save.destroy()
      that.currentOptions.forEach(function (opt) {
          opt.destroy()
      })
      that.inDialog = false
    }, that);
  },
  goToSleep: function () {
    var bookAnim = this.game.add.sprite(-30, -250, 'sweetbook');
    bookAnim.scale.setTo(25, 35)
    bookAnim.animations.add('blocky', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], false)
    bookAnim.animations.play('blocky', 50)
    var the_day = 1
    this.game.add.text(16, 75, 'September ' + (22 + the_day), { fontSize: '50px', fill: '#FFF' });
    // bookAnim.destroy() // settimeout?
    // reset data, re-run stuff? hrm? some way to re-start it? OH, make a dream state!
  },
  startDay: function (day) {

    if (day == 1) {
      this.tableStuff = [
        {name: 'Some book about stuff',
        description: 'whatever you are a robot you already downloaded a pdf of it and read it *yawn*'},
        {name: 'sad old mug',
        description: 'look at me i contain coffee! i think?'}
      ]
      var book1 = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 310, 'book1');
      book1.scale.setTo(0.5)
      var mug = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 295, 'mug');
      mug.scale.setTo(0.75)
      var paper = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'linedpaper');
    } else if (day == 2) {
      this.tableStuff = [
        {name: 'a jug of unknown fluid',
        description: '5 bucks says it piss. no wait 10.'},
        {name: 'Math Textbook',
        description: 'this would make an excellent doorstop...ugh it won\'t fit in yr pocket'}
      ]
      var jug = this.game.add.sprite(this.game.world.width / 2 - 80, this.game.world.height - 300, 'jug');
      jug.scale.setTo(0.5)
      var book2 = this.game.add.sprite(this.game.world.width / 2 , this.game.world.height - 305, 'book2');
      book2.scale.setTo(0.5)
      var paper2 = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 285, 'blankpaper');
    } else {
      this.tableStuff = [
        {name: 'some papers',
        description: 'you are an excellent doodler. yr works should be on walls everywhere'},
        {name: 'pizza box',
        description: 'you miss the pizza dearly :~~~~('}
      ]
      var papert = this.game.add.sprite(this.game.world.width / 2 - 90, this.game.world.height - 325, 'papert');
      var pizza = this.game.add.sprite(this.game.world.width / 2 - 20, this.game.world.height - 315, 'pizza');
      pizza.scale.setTo(0.75)
      var paper3 = this.game.add.sprite(this.game.world.width / 2 - 60, this.game.world.height - 300, 'paper3');
    }
    // this.game.world.bringToTop(this.platforms)
    this.game.world.bringToTop(this.player)
  },
  maybeGoToSleep: function () {
    // pop open a yes/no dialog, reset stuff accordingly. make sure they wrote a poem that day
  },
  interactIfTouchingThing: function (x, y) {
    if (!this.inDialog) {
       console.log(x, y, 'idk')
      if (y > 669 && y < 685) {
          // TOUCHING THE GROUND!!!!!
          if (x >= 45 && x < 50) {
              // vending machine
              console.log('touching the vend')
              this.vend()
              this.inDialog = true
          } else if (x >= 210 && x < 245) {
              // left desk item
              console.log('touching the lefty')
              this.openDialog(this.tableStuff[0])
              this.inDialog = true

          } else if (x >= 250 && x < 275) {

            console.log('touching the desk')
            this.writeAPoem()
            this.inDialog = true
          } else if (x >= 300 && x < 320) {
              // right desk item
              console.log('touching the righty')
              this.openDialog(this.tableStuff[1])
              this.inDialog = true
          } else if (x >= 150 && x < 200) {
            // BOOKSHELF!
            console.log('touching the books')
            this.openDialog({name: 'a shelf of books', description: 'wow there are some really good books here, unfortunately none of them are your training manual which u forgot :<'})
            this.inDialog = true
          } else if (x >= 520 && x < 570) {
            console.log('touching the bed')
            this.inDialog = true
            this.maybeGoToSleep()
          }
      } else if ((y >= 400 && y < 405)) {
        // if (x >= 150 && x < 200) {
            console.log('touching the computer')
            this.openDialog({name: 'a huge computer machine', description: 'it is making this wretched humming noise, i wonder if there is some way to stop it?', ifWeapon: 'that horrible noise continues, it sounds like yr band in college, you feel a sudden urge to hit this thing'})
            this.inDialog = true
            // main platformish?
            // kick thing? OK U NEED AN ITEM TO DO THAT?
          // }
      } else if (y >= 375 && y < 385) {
        this.openDialog({name: 'broken down fan', description: 'gosh it would be nice if this thing worked...it would be vvvvvvvvvvvvvv bad if this machine overheated!'})
        // touching the fan thing!
      } else if  (y >= 295 && y < 305) {
        this.openDialog({name: 'control panel', description: 'there is a gigantic switch here...you probably shouldn\'t push it though because you don\'t remember yr training or what it does :<', ifFaded: 'you are feeling bold, courageous, and decisive. push the button? '})
        // by the switch 220-240 switch, 240+ the machine tubes
      } else if (y >= 250 && y < 260) {
        this.openDialog({name: 'on top of the world', description: 'wow, what a view from up here. I can almost touch the sky! i think? no, that is just the ceiling. better be careful hopping down tho!'})
        // on top of the radio. mention the view?
      }
    }

    // figure these out once object positions are set in stone
  },
  update: function () {
    // console.log(this.game.input.x,
    // this.game.input.y)

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