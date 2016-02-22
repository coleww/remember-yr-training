    var loadSample2Buff = require('load-sample-2-buff')

    var SamplePlayer = require('openmusic-sample-player')

    var audioContext = new AudioContext()
    var player = SamplePlayer(audioContext)

    loadSample2Buff(audioContext, './noise.ogg', function(buffer){
        player.buffer = buffer
        player.start()
    })