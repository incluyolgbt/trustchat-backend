const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const { requestType, messageType, databaseAdder } = require('./middlewares/messages.handler.js')
const { answerMessage } = require('./middlewares/answer.handler.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors({
  origin: 'https://chatbot.danielmartine91.repl.co'
}));

app.get('/', (req, res) => {
  res.send('hello');
});

const routerApi = require('./routes');

routerApi(app);

app.use(requestType);
app.use(messageType);
app.use(databaseAdder);
app.use(answerMessage);

// middleware de error 

app.listen(3000, () => {
  console.log('Mi port 3000')
});