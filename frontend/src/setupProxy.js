const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-wilayah-indonesia', // Change this to match the specific API endpoint
    createProxyMiddleware({
      target: 'https://emsifa.github.io',
      changeOrigin: true,
    })
  );
};
