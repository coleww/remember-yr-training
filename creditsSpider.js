var $ = require('cheerio')
var request = require('request')

var fs = require('fs')

function doThatThang(domain) {
  request(domain, function gotHTML(err, resp, html) {
    if (err) return console.error(err)
    var parsedHTML = $.load(html)
    // get all img tags and loop over them
    try {
      fs.appendFileSync('./theNoiseCredits', parsedHTML('.username').first().text() + '\n')
      fs.appendFileSync('./theNoiseCredits', parsedHTML('div.field-item.even h2').text() + '\n')
      fs.appendFileSync('./theNoiseCredits', parsedHTML('.license-icon a').attr('href') + '\n')
      fs.appendFileSync('./theNoiseCredits', domain + '\n')
      console.log('---------------------------------------------------')
    } catch (e) {
      console.error(e)
    }
  })
}



var worker = require('work-ethic')

worker(require('./credits').sprites, doThatThang, console.log.apply('DONE'), 1000)