const express = require('express');
const webhook = require('./webhook.router');


function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/webhook',  webhook);
}

module.exports = routerApi;