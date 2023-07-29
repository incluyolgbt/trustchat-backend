import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const verify_token = 'holaholahola';
  const queries = req.query;

  if (verify_token === queries['hub.verify_token']) {
    res.send(queries['hub.challenge']);
  }
});

router.post('/', async (req, res, next) => {
  try{
    res.sendStatus(200);
    next(); //requestType
  }catch (error) {
    console.error(error);
  }
});

export {router as webhook};