import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { requestType, messageType, databaseUserAdder, databaseAdder } from './middlewares/messages.handler.js';
import { senderClientMessage } from './middlewares/senderClientMessage.handler.js'
import { routerApi } from './routes/index.js';
import { databaseAdderSocket, messageTypeSocket} from './middleware-socket/messages.handler.js';
import { answerMessageSocket } from './middleware-socket/answer.handler.js';
import { disponibility } from './middlewares/disponibility.handler.js';

let setTrustChat = true; //Modo chats de confianza actilet o desactivar
let users = {}; //users conectados y sus sockets id
let pairing = {}; //wa_ids y los users asignados
let maxConnections = 1; // Número de chats permitidos menos 1 (en este caso 2)

const app = express();
app.use(cors());

//socket
const appSocket = express();

const server = http.createServer(appSocket);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
  socket.on('authenticate', (auth) => {
    users[auth.user_id] = {socket_id: socket.id, connections: 0}
  })

  socket.on('general', (msg) =>{
    socket.broadcast.emit('general', msg)
  })
});

//Recibidos por el socket
io.use(answerMessageSocket); //asesor responde
io.use(databaseAdderSocket); //guardar en base de datos mensaje 

server.listen(8080, () => {
  console.log('ServerSocket on port 8080')
});

//socket

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/activeUsers', (req, res) => {
  res.status(200).send({ ...users });
  return false;
});


routerApi(app);

//Recibidos por el webhook
app.use(requestType); //tipo de request
app.use(messageType); //tipo de mensaje
app.use(databaseUserAdder); //veo si wa_id está en base de datos o no y lo agrego
app.use(disponibility); //veo la disponibilidad de los asesores 
app.use(databaseAdder); //agrego a base de datos mensaje con asesor y wa_id
app.use(senderClientMessage); //enviarlo a ese asesor

// middleware de error 

app.listen(3000, () => {
  console.log('Server on port 3000')
});

export { io, users, pairing, maxConnections};