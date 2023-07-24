const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
  
})

const routerApi = require('./routes');

routerApi(app);

// middleware de validacion de mensaje 
// middleware de error 

app.listen(3000, () => {
  console.log('Mi port 3000')
});