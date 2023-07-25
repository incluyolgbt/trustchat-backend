const Webhook = require('./../services/webhook.service.js');
const { find, addToDB } = require('./../services/database.service.js');

const webhook = new Webhook();

function requestType(req, res, next) { //tipo status
  console.log('requestType');
  if (req.body.entry[0].changes[0].value.statuses) {
    //algo
  } else {

    const from = req.body.entry[0].changes[0].value.metadata.display_phone_number;
    next(); //messageType

  }
}

async function messageType(req, res, next) {
  console.log('messageType');
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
    default:
      break;
  }
}

async function databaseAdder(req, res, next) {
  console.log('databaseAdder');
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

module.exports = { requestType, messageType, databaseAdder };