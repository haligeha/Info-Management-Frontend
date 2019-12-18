function jsonToParams(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return ''
  return Object.keys(obj).filter(key => (obj[key] && typeof obj[key] !== 'object') || obj[key] === 0)
    .map(key => `${key}=${obj[key]}`).join('&')
}