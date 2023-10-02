import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { requestType, messageType, databaseUserAdder, databaseAdder } from './middlewares/messages.handler.js';
import { senderClientMessage } from './middlewares/senderClientMessage.handler.js'
import { routerApi } from './routes/index.js';
import { databaseAdderSocket, messageTypeSocket } from './middleware-socket/messages.handler.js';
import { answerMessageSocket } from './middleware-socket/answer.handler.js';
import { disponibility } from './middlewares/disponibility.handler.js';

const PORT = 8080;
let setTrustChat = true; //Modo chats de confianza actilet o desactivar
let users = {}; //users conectados y sus sockets id
let pairing = {}; //wa_ids y los users asignados
let maxConnections = 1; // Número de chats permitidos menos 1 (en este caso 2)

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chdc.onrender.com"]
  })
);

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chdc.onrender.com"]
  }
});

io.on("connection", (socket) => {
  console.log('User connected:', socket?.id);

  socket.on('authenticate', (auth) => {
    if (auth) {
      console.log('User auth:', auth?.user_id);
      users[auth.user_id] = { socket_id: socket.id, connections: 0 }
    }
  })

  socket.on('general', (msg) => {
    socket.broadcast.emit('general', msg)
  })

  socket.on("disconnect", () => {
    console.log('Socket al desconectarse: ', socket.id)
    if (socket) {
      console.log('User disconnected:', socket.id);
      const disconnectedUserId = Object.keys(users).find(
        userId => users[userId].socket_id === socket.id
      );
      if (disconnectedUserId) {
        delete users[disconnectedUserId]; //aquí necesito ponerlo como undefined
      }
    }
  })
});

io.on('message', async (data, callback) => {
  console.log('Response detected', data);
})

//Recibidos por el socket
io.use(answerMessageSocket); //asesor responde
io.use(databaseAdderSocket); //guardar en base de datos mensaje 

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

app.post('/assignUser', (req, res, next) => {
  const { contact, user_id } = req.body;
  if (pairing[contact]) {
    pairing[contact] = user_id;
    res.status(200).send({});
  } else {
    res.status(400);
  }
  next();
});

routerApi(app);

app.use((req, res, next) => {
  console.log(`[${req.method}] - ${req.url}`);
  if (req.body.entry) {
    console.log('>>> Request is a message')
    //Recibidos por el webhook
    try {
      requestType(req, res, next);
      messageType(req, res, next);
      databaseUserAdder(req, res, next);
      disponibility(req, res, next);
      databaseAdder(req, res, next);
      senderClientMessage(req, res, next);
    } catch (e) {
      console.log(e);
    }
  }
});

server.listen(PORT, () => {
  console.log(`>>> Server is up and running on port ${PORT}`)
});

export { io, users, pairing, maxConnections };