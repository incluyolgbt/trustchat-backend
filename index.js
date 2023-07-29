import express from 'express';
import cors  from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import {Server as SocketServer} from 'socket.io';

import { requestType, messageType, databaseAdder } from './middlewares/messages.handler.js';
import { answerMessage } from './middlewares/answer.handler.js'
import {routerApi} from './routes/index.js';

const app = express();

//socket
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors:{
    origin: "http://localhost:5173"
  }
});

io.on('connection', socket => {
  console.log('cliente connected')

  socket.on('message', (data)=>{
    socket.broadcast.emit('message', data); //ese data será el json
  })
})

server.listen(4000, ()=>{
  console.log('ServerSocket on port 4000')
});

//socket

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});


routerApi(app);

app.use(requestType);
app.use(messageType);
app.use(databaseAdder);
app.use(answerMessage);

// middleware de error 

app.listen(3000, () => {
  console.log('Server on port 3000')
});