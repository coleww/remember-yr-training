var loadSample2Buff = require('load-sample-2-buff')

var SamplePlayer = require('@coleww/openmusic-sample-player')

module.exports = function (ac, mainVol) {
  var samplers = {}
  var samples = [
    'alclock', 'countdown', 'crumple', 'explosion',
    'horribletone', 'missilelaunch', 'modem', 'noise',
    'pew', 'pow', 'russel1', 'russel2', 'russel3', 'selecto',
    'thuddy', 'twinklelong', 'twinkleshort', 'WAHHHHH', 'windloop', 'wobbly', 'woosh'
  ]

  // var panner = ac.createPanner();
  // panner.coneOuterGain = 0.1;
  // panner.coneOuterAngle = 180;
  // panner.coneInnerAngle = 0;
  // //
  // panner.setPosition(230, 400, 0);
  var foleyVol = ac.createGain()
  var loaded = 0
  samples.forEach(function (sample) {
    samplers[sample] = SamplePlayer(ac)
    loadSample2Buff(ac, './assets/sounds/' + sample + '.ogg', function(buffer){
      console.log('loading')
        samplers[sample].buffer = buffer
        loaded++
        if (['noise', 'windloop', 'horribletone'].indexOf(sample) !== -1) {
          samplers[sample].loop = true
          samplers[sample].connect(foleyVol)
          // samplers[sample].connect(panner)
          // panner.connect(foleyVol)
        } else {
          samplers[sample].connect(foleyVol)
        }

        // if (sample == 'noise') samplers[sample].start(ac.currentTime)
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
    updateComputerNoise: function (game, x, y) {
      // ac.listener.setPosition(x, y, 0);

    }
  }
}

