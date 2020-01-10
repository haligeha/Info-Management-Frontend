// const target = 'http://39.104.189.84:30300';  //阿里云IP
// const target = 'http://10.128.175.8:8086'
//const target = 'http://10.112.217.199:8100';
//const target = 'http://10.112.217.199:8086';
//const targets = 'http://10.112.12.81:8100';  // 实验室服务器-学姐
//const target = 'http://10.112.12.81:8086';  // 实验室服务器-张宇非
const target = 'http://10.112.217.199:30300';  // 容器API
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy("/api/", { target: target })
  );
  // app.use(
  //   proxy("/api/v1/user/", { target: "http://10.112.12.81:8086" }) // 张宇非
  // );
  // app.use(
  //   proxy("/api/v1/info/", { target: "http://10.112.12.81:8100" }) // 艺
  // );
};