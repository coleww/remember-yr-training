var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('bisley', 'assets/pics/alex-bisleys_horsy_5.png');

}

var picture;

function create() {

    game.stage.backgroundColor = '#6688ee';

    picture = game.add.sprite(game.world.centerX, game.world.centerY, 'bisley');
    picture.anchor.setTo(0.5, 0.5);

    //  Here we'll create a basic timed event. This is a one-off event, it won't repeat or loop:
    //  The first parameter is how long to wait before the event fires. In this case 4 seconds (you could pass in 4000 as the value as well.)
    //  The next parameter is the function to call ('fadePicture') and finally the context under which that will happen.

    game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);

}

function fadePicture() {

    game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

}

function render() {

    game.debug.text("Time until event: " + game.time.events.duration, 32, 32);

}











//////////////////////////



// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

// function preload() {

//     game.load.image('picture7', 'assets/pics/slayer-sorry_im_the_beast.png');

// }

// // var timer;
// // var total = 0;

// function create() {

//     // game.stage.backgroundColor = '#000';

// }

// function updateCounter() {

// }

// function render() {

//     game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

// }//











/////////////////////////////////////











// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

// function preload() {

//     game.load.image('picture7', 'assets/pics/slayer-sorry_im_the_beast.png');

// }

// var timer;
// var total = 0;

// function create() {

//     game.stage.backgroundColor = '#000';

//     //  Create our Timer
//     timer = game.time.create(false);

//     //  Set a TimerEvent to occur after 2 seconds
//     timer.loop(2000, updateCounter, this);

//     //  Start the timer running - this is important!
//     //  It won't start automatically, allowing you to hook it to button events and the like.
//     timer.start();

// }

// function updateCounter() {

//     total++;

// }

// function render() {

//     game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
//     game.debug.text('Loop Count: ' + total, 32, 64);

// }












////////////////////////


















