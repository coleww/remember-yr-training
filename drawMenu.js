module.exports = function (game, bg, obj, yesCB, noCB) {
  // bg is a string or a previous bg instance
  // obj has like, name, descrip, sprite, yes/no text, callbacks get passed the obj.
  // auto cleans up whatever it does so the callback don't have to *nice*
  // that.inDialog = false

      var menmen
      if (typeof bg == 'string') {
        menmen = game.add.sprite(0, 150, bg);
        if (bg == 'parch') {
          menmen.scale.setTo(1, 1.5)
        } else {
          menuBox.scale.setTo(3.75, 5)
        }
      } else {
        menmen = bg
      }

      var instruct = game.add.text(50, 220, obj.name, { fontSize: '30px', fill: '#111' });
      var descrip = game.add.text(50, 420, obj.description, { fontSize: '25px', fill: '#111', wordWrap: true, wordWrapWidth: 450  });
  //REFACTOR THISSSSSSSSSSS
      var yay  = game.add.text(50, 670, obj.yes, { fontSize: '20px', fill: '#08D', wordWrap: true, wordWrapWidth: game.world.width / 3 });
      yay.inputEnabled = true;
      var nay
      var that = this
      yay.events.onInputDown.add(function  (thing) {
          // RUN THE STUFF!
          instruct.destroy()
          descrip.destroy()
          yay.destroy()
          if (obj.no) nay.destroy()
          yesCB(menmen, obj)
      }, this);
      if (obj.no) {
        nay = game.add.text(game.world.width / 2, 670, obj.no, { fontSize: '20px', fill: '#D30', wordWrap: true, wordWrapWidth: game.world.width / 3 });

        nay.inputEnabled = true
        nay.events.onInputDown.add(function  (thing) {

            instruct.destroy()
            descrip.destroy()
            yay.destroy()
            nay.destroy()
            menmen.destroy()
            noCB(obj)

        }, this);
      }

}