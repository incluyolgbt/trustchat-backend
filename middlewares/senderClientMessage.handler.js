import { users, pairing, io } from '../index.js';
import { findUser } from '../services/database.service.js';

async function senderClientMessage(req, res, next) {

  console.log('[DEBUG] Sender client message');

  let messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
  messageFrom = messageFrom.replace(/^521/i, '52');

  const userExistance = await findUser(messageFrom);
  let clientId = userExistance[0]?.id;


  const user_id = pairing[messageFrom] //será igual a user (user_id) 

  io.to(users[user_id]['socket_id']).emit('message', {
    text: req.body.entry[0].changes[0].value.messages[0].text.body,
    from: clientId,
    to: user_id,
    messageId: req.body.entry[0].changes[0].value.messages[0].id,
    type: req.body.entry[0].changes[0].value.messages[0].type,
    timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp
  }
  )
  next();
}

export { senderClientMessage };

