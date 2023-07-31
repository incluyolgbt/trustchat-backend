import { find, addToDB } from './../services/database.service.js';
import { v4 } from 'uuid';

async function messageTypeSocket(socket, next) {
  console.log('mensjae tipo socket');
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
  console.log('agregado a base de datos')
  socket.on('message', async(data) => {
    const type = data.type;
    var messageFrom = data.from;
    var messageTimestamp = new Date();
    const messageId = v4(); // debo generar un id random
    const messageContent = data.text;
    const messageTo = data.to;
    console.log(type, messageFrom, messageTimestamp, messageId, messageContent, messageTo);

    //check out if id it is in db 
    const existance = await find(messageId);

    //In case DB does not have message id then send response and mask as read
    if (existance.length === 0) {
      await addToDB(type,
        messageFrom,
        messageTimestamp,
        messageId,
        messageContent, 
        messageTo,
        'output'
      ); //conexion con base de datos para agregar
    }
  });
  next();
}

export { messageTypeSocket, databaseAdderSocket };