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