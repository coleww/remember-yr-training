var $ = require('cheerio')
var request = require('request')

var fs = require('fs')

function doThatThang(domain) {
  request(domain, function gotHTML(err, resp, html) {
    if (err) return console.error(err)
    var parsedHTML = $.load(html)
    // get all img tags and loop over them
    try {
      fs.appendFileSync('./theNoiseCredits', parsedHTML('#sound_author a').text() + '\n')
      fs.appendFileSync('./theNoiseCredits', parsedHTML('#single_sample_header').last().text() + '\n')
      fs.appendFileSync('./theNoiseCredits', parsedHTML('#sound_license a').attr('href') + '\n')
      fs.appendFileSync('./theNoiseCredits', domain + '\n')
      console.log('---------------------------------------------------')
    } catch (e) {
      console.error(e)
    }
  })
}



var worker = require('work-ethic')

worker(require('./credits'), doThatThang, console.log.apply('DONE'), 1000)