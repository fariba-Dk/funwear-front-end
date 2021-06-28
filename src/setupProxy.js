const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};

//if any requests starts with "/api" or "/auth" => we want to connect to server
//we are proxying to localhost:5000 port
//we do not need to import it - magic file name when we install it it connects under the hood
