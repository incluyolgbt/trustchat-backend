import { Webhook } from './../services/webhook.service.js';
import { find, addToDB, findUser, addUserToDB } from './../services/database.service.js';
import { pairing } from '../index.js';

const webhook = new Webhook();

function requestType(req, res, next) { //tipo status

  console.log('[DEBUG] Request Type');

  if (req.body.entry[0].changes[0].value.statuses) {
  } else {
    next(); //messageType
  }
}

async function messageType(req, res, next) {

  console.log('[DEBUG] Message Type');

  // Check out which type of message had been recieved 
  const type = req.body.entry[0].changes[0].value.messages[0].type;

  switch (type) {
    case 'text':
      //For text type messages

      next(); // databaseAdder

      break;
    case 'image':
      //For image type message
      break;
    case 'audio':
      //For image type message
      break;
    case 'sticker':
      break;
    case 'document':
      //For image type message
      break;
    default:
      break;
  }
}

async function databaseUserAdder(req, res, next){

  console.log('[DEBUG] Database user adder');

  const userName = req.body.entry[0].changes[0].value.contacts[0].profile.name;
  let messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
  messageFrom = messageFrom.replace(/^521/i, '52');

  //checking out if user is in db
  const userExistance = await findUser(messageFrom);

  if (!userExistance.length) {
    await addUserToDB(userName, messageFrom) 
  }

  next();

}

async function databaseAdder(req, res, next) {

  console.log('[DEBUG] Databse Adder');

  const type = req.body.entry[0].changes[0].value.messages[0].type;
  let messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
  let messageTimestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
  const messageId = req.body.entry[0].changes[0].value.messages[0].id;
  const messageContent = req.body.entry[0].changes[0].value.messages[0];
  const userName = req.body.entry[0].changes[0].value.contacts[0].profile.name;

  // Convert timestamp to date 
  let date = new Date(messageTimestamp * 1000).toISOString();
  messageTimestamp = date;
 
  
  //getting rid of that 1 strange number 
  messageFrom = messageFrom.replace(/^521/i, '52');
  
  const user_id = pairing[messageFrom] //será igual a user (user_id) 

  const userExistance = await findUser(messageFrom);
  let clientId = userExistance[0]?.id;

  const messageTo = user_id;

  //check out if id it is in db 
  const existance = await find(messageId);

  //In case DB does not have message id then send response and mask as read
  if (!existance.length) {
    await addToDB(type,
      clientId,
      messageTimestamp,
      messageId,
      messageContent[type],
      messageTo,
      'input'); //conexion con base de datos para agregar
  }
  next();
}

export { requestType, messageType, databaseUserAdder, databaseAdder };