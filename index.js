import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { requestType, messageType, databaseAdder } from './middlewares/messages.handler.js';
import { senderClientMessage } from './middlewares/senderClientMessage.handler.js'
import { routerApi } from './routes/index.js';
import { databaseAdderSocket, messageTypeSocket} from './middleware-socket/messages.handler.js';
import { answerMessageSocket } from './middleware-socket/answer.handler.js';

const app = express();

//socket

const appSocket = express();

const server = http.createServer(appSocket);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
 
});

//Recibidos por el socket
io.use(answerMessageSocket);

server.listen(8080, () => {
  console.log('ServerSocket on port 8080')
});

//socket

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});


routerApi(app);

//Recibidos por el webhook
app.use(requestType);
app.use(messageType);
app.use(databaseAdder);
app.use(senderClientMessage);

// middleware de error 

app.listen(3000, () => {
  console.log('Server on port 3000')
});

export { io };