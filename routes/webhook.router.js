const express = require('express');
const WebhookService = require('./../services/webhook.service');

const router = express.Router();
const service = new WebhookService();


router.get('/', async (req, res, next) => {
  const verify_token = 'holaholahola';
  const queries = req.query;

  if (verify_token === queries['hub.verify_token']) {
    res.send(queries['hub.challenge']);
  }
});

router.post('/', async (req, res, next) => {
  try{
    res.status(200);
    next(); //requestType
  }catch (error) {
    console.error(error);
  }
});

module.exports = router;