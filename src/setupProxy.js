<<<<<<< HEAD
const target = 'http://39.104.189.84:30300';  //阿里云IP
=======
const target = 'http://39.104.189.84:30300';
>>>>>>> b3f59ee0817d10666d290827e5493d99939a32f9
//const target = 'http://10.112.217.199:8100';
//const target = 'http://10.112.217.199:8086';

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy("/api",{ target })
  );
};