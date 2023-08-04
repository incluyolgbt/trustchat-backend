import { users, io } from '../index.js';

async function senderClientMessage(req, res, next) {

  
  var messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
  messageFrom = messageFrom.replace(/^521/i, '52');
  
  const user_id = pairing[messageFrom] //será igual a user (user_id) 
  
  io.to(users[user_id].socket_id).emit('message', {
      text: req.body.entry[0].changes[0].value.messages[0].text.body,
      from: messageFrom,
      to: user_id,
      messageId: req.body.entry[0].changes[0].value.messages[0].id,
      type: req.body.entry[0].changes[0].value.messages[0].type,
      timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp
    }
    )
  next();
}

export { senderClientMessage };

