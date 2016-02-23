function get (key) {
  return JSON.parse(localStorage.getItem('ryt-' + key))
}

function set (key, object) {
  localStorage.setItem('ryt-' + key, JSON.stringify(object))
}

function inc (key, amt) {
  return mathIt(key, (amt || 1))
}

function dec (key, amt) {
  return mathIt(key, -(amt || 1))
}

function mathIt (key, amt) {
  var newVal = get(key) + amt
  set(key, newVal)
  return newVal
}

module.exports = {
  get: get,
  set: set,
  inc: inc,
  dec: dec
}

// lol can save poems in a linked list w/arbitrary keys pointing back to the first which is always called "firstPoem"sdgsdgsdg

