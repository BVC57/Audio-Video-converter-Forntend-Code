// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (App) {
  App.use(
    '/upload_pdf', // Your API endpoint
    createProxyMiddleware({
      target: 'https://pyrtqap426.execute-api.ap-south-1.amazonaws.com',
      changeOrigin: true,
    })
  );
};
