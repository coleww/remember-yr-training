var loadSample2Buff = require('load-sample-2-buff')

var SamplePlayer = require('@coleww/openmusic-sample-player')

var features = require('../features')
module.exports = function (ac, mainVol) {
  var samplers = {}
  var samples = [
    'alclock', 'countdown', 'crumple', 'explosion', 'crunch',
    'cackle', 'punch', 'punchtoo', 'wooshair', 'giggle', 'kaching',
    'horribletone', 'missilelaunch', 'modem', 'noise',
    'pew', 'pow', 'russel1', 'russel2', 'russel3', 'selecto', 'slowpew',
    'thuddy', 'twinklelong', 'twinkleshort', 'WAHHHHH', 'windloop', 'wobbly', 'woosh'
  ]

  var panner = ac.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 1000000000;
panner.rolloffFactor = 0.00513;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 360;
panner.coneOuterGain = 1;
  //
  panner.setPosition(210, 400, 0);
  var foleyVol = ac.createGain()
  var loaded = 0
  samples.forEach(function (sample) {
    samplers[sample] = SamplePlayer(ac)
    loadSample2Buff(ac, './assets/sounds/' + sample + '.ogg', function(buffer){
      console.log('loading')
        samplers[sample].buffer = buffer
        loaded++
        if (['noise', 'windloop', 'horribletone', 'WAHHHHH', 'alclock'].indexOf(sample) !== -1) {
          samplers[sample].loop = true
          //
          if (sample == 'noise') {
            samplers[sample].connect(panner)
            panner.connect(foleyVol)
          } else  {
              samplers[sample].connect(foleyVol)
          }
        } else {
          samplers[sample].connect(foleyVol)
        }


    })
  })

  foleyVol.connect(mainVol)

  return {
    play: function (key) {
      samplers[key].start(ac.currentTime)
    },
    stop: function (key) {
      samplers[key].stop(ac.currentTime)
    },
    ready: function () {
      return loaded == samples.length
    },
    updateVolume: function (params) {
      //..
    },
    startComputerNoise: function () {
      if (features.playNoise) {
        samplers['horribletone'].start(ac.currentTime)
        samplers['noise'].start(ac.currentTime)
      }
    },
    stopAlarmNoise: function () {
      samplers['WAHHHHH'].stop(ac.currentTime)
      samplers['alclock'].stop(ac.currentTime)
    },
    stopComputerNoise: function () {
      samplers['noise'].stop(ac.currentTime)
      samplers['horribletone'].stop(ac.currentTime)
    },
    updateComputerNoise: function (game, x, y, xDir, yDir) {
      ac.listener.setPosition(x, y, 0);
      // ac.listener.setVelocity(xDir, yDir, 0);
      // console.log('dating')
    }
  }
}

