function get (key) {
  return JSON.parse(localStorage.getItem('ryt-' + key))
}

function set (key, object) {
  localStorage.setItem('ryt-' + key, JSON.stringify(object))
}

module.exports = {
  get: get,
  set: set
}

// lol can save poems in a linked list w/arbitrary keys pointing back to the first which is always called "firstPoem"sdgsdgsdg

