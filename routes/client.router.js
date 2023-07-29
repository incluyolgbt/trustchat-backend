import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('CLIENT')
  res.sendStatus(200);
  try {
    console.log('mensaje del cliente web');

    next();

   
    
  } catch (error) {
    console.error(error);
  }
});

export {router as client};


