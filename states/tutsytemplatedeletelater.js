function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}






















































// var playState = {

//     preload: function() {
//         game4.stage.backgroundColor = '#3498db';

//         game4.load.spritesheet('player', 'assets/player.png', 28, 22);
//         game4.load.image('wall', 'assets/wall.png');
//         game4.load.image('ground', 'assets/ground.png');
//         game4.load.image('dust', 'assets/dust.png');
//         game4.load.image('exp', 'assets/exp.png');
//         game4.load.image('enemy', 'assets/enemy.png');
//         game4.load.image('coin', 'assets/coin.png');

//         if (!game4.device.desktop) {
//             game4.load.image('right', 'assets/right.png');
//             game4.load.image('left', 'assets/left.png');
//             game4.load.image('jump', 'assets/jump.png');
//         }

//         /*game4.load.audio('dead', 'assets/dead.wav');
//         game4.load.audio('dust', 'assets/dust.wav');
//         game4.load.audio('jump', 'assets/jump.wav');
//         game4.load.audio('coin', 'assets/coin.wav');*/
//     },

//     create: function() {
//         game4.physics.startSystem(Phaser.Physics.ARCADE);
//         this.cursor = game4.input.keyboard.createCursorKeys();
//         game4.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT]);

//         game4.sound.mute = true;
//         this.level = 0;

//         /*this.deadSound = game4.add.audio('dead', 0.1);
//         this.jumpSound = game4.add.audio('jump', 0.1);
//         this.dustSound = game4.add.audio('dust', 0.1);
//         this.coinSound = game4.add.audio('coin', 0.1);*/

//         this.player = game4.add.sprite(250, 50, 'player');
//         this.player.anchor.setTo(0.5, 0.5);
//         game4.physics.arcade.enable(this.player);
//         this.player.body.gravity.y = 600;
//         this.player.animations.add('idle', [3, 4, 5, 4], 5, true);
//         this.player.body.setSize(20, 20, 0, 0);
//         this.player.anchor.setTo(0.5, 0.5);
//         this.playerDead = false;

//         this.loadLevel();
//         this.setParticles();

//         this.spawnPlayer();

//         if (!game4.device.desktop)
//             this.addMobileInputs();
//     },

//     update: function() {
//         game4.physics.arcade.collide(this.player, this.level);
//         game4.physics.arcade.overlap(this.player, this.enemy, this.spawnPlayer, null, this);
//         game4.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

//         this.inputs();

//         this.exp.forEachAlive(function(p){
//             p.alpha = game4.math.clamp(p.lifespan / 100, 0, 1);
//         }, this);
//     },

//     inputs: function() {

//         if (this.cursor.left.isDown || this.moveLeft) {
//             this.player.body.velocity.x = -200;
//             this.player.frame = 2;
//         }
//         else if (this.cursor.right.isDown || this.moveRight) {
//             this.player.body.velocity.x = 200;
//             this.player.frame = 1;
//         }
//         else {
//             this.player.body.velocity.x = 0;
//         }

//         if (this.player.body.velocity.x == 0)
//             this.player.animations.play('idle');

//         if (this.player.body.touching.down && this.player.y > 100) {
//             if (this.hasJumped) {
//                 //this.dustSound.play();
//                 this.dust.x = this.player.x;
//                 this.dust.y = this.player.y+10;
//                 this.dust.start(true, 300, null, 8);
//             }

//             this.hasJumped = false;
//         }

//         if (this.cursor.up.isDown) {
//             this.jumpPlayer();
//         }
//     },

//     jumpPlayer: function() {
//         if (this.player.body.touching.down && this.player.y > 100) {
//             this.hasJumped = true;
//             //this.jumpSound.play();
//             this.player.body.velocity.y = -220;
//         }
//     },

//     spawnPlayer: function() {
//         if (this.playerDead) {
//             this.exp.x = this.player.x;
//             this.exp.y = this.player.y+10;
//             //this.exp.start(true, 300, null, 20);

//             //this.shakeEffect(this.level);
//             //this.shakeEffect(this.enemy);

//             //this.deadSound.play();
//         }

//         this.player.scale.setTo(0, 0);
//         game4.add.tween(this.player.scale).to({x:1, y:1}, 300).start();
//         this.player.reset(250, 50);

//         this.hasJumped = true;
//         this.playerDead = true;

//         this.moveLeft = false;
//         this.moveRight = false;

//         this.addCoins();
//     },

//     loadLevel: function(coins, enemies) {
//         this.level = game4.add.group();
//         this.level.enableBody = true;
//         game4.add.sprite(90, 200/2 -50, 'wall', 0, this.level);
//         game4.add.sprite(390, 200/2 -50, 'wall', 0, this.level);
//         game4.add.sprite(500/2 - 160, 200/2 +30, 'ground', 0, this.level);
//         this.level.setAll('body.immovable', true);

//         this.enemy = game4.add.sprite(360, 120, 'enemy');
//         game4.physics.arcade.enable(this.enemy);
//         this.enemy.anchor.setTo(0.5, 0.5);
//     },

//     addCoins: function() {
//         if (!this.coins) {
//             this.coins = game4.add.group();
//             this.coins.enableBody = true;
//         }
//         else {
//             this.coins.forEachAlive(function(e){
//                 e.kill();
//             }, this);
//         }

//         game4.add.sprite(140, 120, 'coin', 0, this.coins);
//         game4.add.sprite(170, 120, 'coin', 0, this.coins);
//         game4.add.sprite(200, 120, 'coin', 0, this.coins);

//         this.coins.forEachAlive(function(e){
//             e.isTaken = false;
//             e.scale.setTo(0,0);
//             e.anchor.setTo(0.5);
//             game4.add.tween(e.scale).to({x:1, y:1}, 200).start();
//         }, this);
//     },

//     takeCoin: function(a, b) {
//         if (!b.isTaken) {
//             b.isTaken = true;
//             game4.add.tween(b.scale).to({x:0}, 150).start();
//             game4.add.tween(b).to({y:50}, 150).start();
//             //this.coinSound.play();
//             b.body.enable = false;
//         }
//     },

//     setParticles: function() {
//         this.dust = game4.add.emitter(0, 0, 20);
//         this.dust.makeParticles('dust');
//         this.dust.setYSpeed(-100, 100);
//         this.dust.setXSpeed(-100, 100);
//         this.dust.gravity = 0;

//         this.exp = game4.add.emitter(0, 0, 20);
//         this.exp.makeParticles('exp');
//         this.exp.setYSpeed(-150, 150);
//         this.exp.setXSpeed(-150, 150);
//         this.exp.gravity = 0;
//     },

//     shakeEffect: function(g) {
//         var move = 5;
//         var time = 20;

//         game4.add.tween(g)
//             .to({y:"-"+move}, time).to({y:"+"+move*2}, time*2).to({y:"-"+move}, time)
//             .to({y:"-"+move}, time).to({y:"+"+move*2}, time*2).to({y:"-"+move}, time)
//             .to({y:"-"+move/2}, time).to({y:"+"+move}, time*2).to({y:"-"+move/2}, time)
//             .start();

//         game4.add.tween(g)
//             .to({x:"-"+move}, time).to({x:"+"+move*2}, time*2).to({x:"-"+move}, time)
//             .to({x:"-"+move}, time).to({x:"+"+move*2}, time*2).to({x:"-"+move}, time)
//             .to({x:"-"+move/2}, time).to({x:"+"+move}, time*2).to({x:"-"+move/2}, time)
//             .start();
//     },

//     addMobileInputs: function() {
//         this.jumpButton = game4.add.sprite(430, 130, 'jump');
//         this.jumpButton.inputEnabled = true;
//         this.jumpButton.events.onInputDown.add(this.jumpPlayer, this);
//         this.jumpButton.alpha = 0.5;

//         this.moveLeft = false;
//         this.moveRight = false;

//         this.leftButton = game4.add.sprite(10, 130, 'left');
//         this.leftButton.inputEnabled = true;
//         this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
//         this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this);
//         this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
//         this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
//         this.leftButton.alpha = 0.5;

//         this.rightButton = game4.add.sprite(110, 130, 'right');
//         this.rightButton.inputEnabled = true;
//         this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this);
//         this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this);
//         this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
//         this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
//         this.rightButton.alpha = 0.5;
//     }
// };

// var game4 = new Phaser.Game(500, 200, Phaser.CANVAS, 'game4');

// game4.state.add('play', playState);
// game4.state.start('play');

