const express = require('express');

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('CLIENT')
  res.status(200);
  try {
    console.log('mensaje del cliente web');
    //checar tipo de req ya existe 
    
    //checar tipo de mensaje ya existe

    //manda a base de datos ese mensaje si no existe 

    next();

   
    
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;


