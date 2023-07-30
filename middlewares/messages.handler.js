import { Webhook } from './../services/webhook.service.js';
import { find, addToDB } from './../services/database.service.js';

const webhook = new Webhook();

function requestType(req, res, next) { //tipo status

  if (req.body.entry[0].changes[0].value.statuses) {

  } else {
    next(); //messageType
  }
}

async function messageType(req, res, next) {
  // Check out which type of message had been recieved 
  const type = req.body.entry[0].changes[0].value.messages[0].type;
  console.log(type)
  console.log(req.body.entry[0].changes[0].value.messages[0])

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

async function databaseAdder(req, res, next) {
  const type = req.body.entry[0].changes[0].value.messages[0].type;
  var messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
  var messageTimestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
  const messageId = req.body.entry[0].changes[0].value.messages[0].id;
  const messageContent = req.body.entry[0].changes[0].value.messages[0];

  // Convert timestamp to date 
  var date = new Date(messageTimestamp * 1000).toISOString();
  messageTimestamp = date;

  //check out if id it is in db 
  const existance = await find(messageId);

  //getting rid of that 1 strange number 
  messageFrom = messageFrom.replace(/^521/i, '52');
  //messageFrom = messageFrom.slice(0, 2) + messageFrom.slice(3,);


  //In case DB does not have message id then send response and mask as read
  if (existance.length === 0) {
    await addToDB(type,
      messageFrom,
      messageTimestamp,
      messageId,
      messageContent[type]); //conexion con base de datos para agregar
  }
  next();
}

export { requestType, messageType, databaseAdder };