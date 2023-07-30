import { io } from '../index.js';

async function senderClientMessage(req, res, next) {

  // podría generar un socket interno que se conecte con el otro con socket.io-client
  io.emit('message', {
      text: req.body.entry[0].changes[0].value.messages[0].text.body,
      from: req.body.entry[0].changes[0].value.messages[0].from,
      to: '',
      messageId: req.body.entry[0].changes[0].value.messages[0].id,
      type: req.body.entry[0].changes[0].value.messages[0].type,
      timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp
    }
    )
  next();
}

export { senderClientMessage };

