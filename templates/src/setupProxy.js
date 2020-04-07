
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  // app.use(
  //   "/api",
  //   proxy({
  //     target: "http://10.25.72.18:52034/", // 开发
  //     // target: "http://59.36.208.8:8080", // 测试环境
  //     changeOrigin: true
  //   })
  // );
};