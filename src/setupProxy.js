const target = 'http://39.104.189.84:30300';

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy("/api",{ target }));
};