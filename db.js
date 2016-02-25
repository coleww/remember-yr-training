function get (key) {
  return JSON.parse(localStorage.getItem('ryt-' + key))
}

function set (key, object) {
  var stringCheese = JSON.stringify(object)
  if (stringCheese.length > 5242878) alert('something truly awful has happened')
  localStorage.setItem('ryt-' + key, stringCheese)
}

function inc (key, amt) {
  return mathIt(key, (amt || 1))
}

function dec (key, amt) {
  return mathIt(key, -(amt || 1))
}

function mathIt (key, amt) {
  var oldVal = get(key)
  if (typeof oldVal !== 'number') alert('u tried to __crement ' + oldVal + ' but it wasnt having it')
  var newVal = oldVal + amt
  set(key, newVal)
  return newVal
}

function push (key, el) {
  var arr = get(key)
  arr.push(el)
  set(key, arr)
}

function remove (key, el) {
  var arr = get(key)
  var i = arr.indexOf(el)
  set(key, arr.splice(i, 1))
}

module.exports = {
  get: get,
  set: set,
  inc: inc,
  dec: dec,
  push: push,
  remove: remove
}

// lol can save poems in a linked list w/arbitrary keys pointing back to the first which is always called "firstPoem"sdgsdgsdg

