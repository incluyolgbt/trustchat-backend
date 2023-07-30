import { find, addToDB } from './../services/database.service.js';

async function messageTypeSocket(socket, next) {
  socket.on('message', (data) => {

    // Check out which type of message had been recieved 
    const type = data.type;

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

  })

}

async function databaseAdderSocket(socket, next) {
  const dataRecieved = {};
  socket.on('message', (data) => {
    dataRecieved = data;
  });

  const type = data.type;
  var messageFrom = data.from;
  var messageTimestamp = data.timestamp;
  const messageId = data.id;
  const messageContent = data.text;
  const messageTo = data.to;

  //check out if id it is in db 
  const existance = await find(messageId);

  //In case DB does not have message id then send response and mask as read
  if (existance.length === 0) {
    await addToDB(type,
      messageFrom,
      messageTimestamp,
      messageId,
      messageContent[type],
      messageTo
    ); //conexion con base de datos para agregar
  }
  next();
}

export { messageTypeSocket, databaseAdderSocket };