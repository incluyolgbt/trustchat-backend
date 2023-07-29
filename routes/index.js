import express from 'express';
import {webhook} from './webhook.router.js';
import {client} from './client.router.js';


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/webhook/', webhook);
  router.use('/client', client);
}

export {routerApi};