const express = require('express');
const webhook = require('./webhook.router');
const client = require('./client.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/webhook', webhook);
  router.use('/client', client);
}

module.exports = routerApi;