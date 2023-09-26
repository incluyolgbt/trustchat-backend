import { find, addToDB } from './../services/database.service.js';
import { v4 } from 'uuid';

async function messageTypeSocket(socket, next) {
  socket.on('message', (data) => {

    console.log('[DEBUG] messageTypeSocket');

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
  socket.on('message', async(data) => {

    console.log('[DEBUG] databaseAdderSocket');

    const type = data.type;
    let messageFrom = data.from;
    let messageTimestamp = new Date();
    const messageId = v4(); // debo generar un id random
    const messageContent = data.text;
    const messageTo = data.to;

    //check out if id it is in db 
    const existance = await find(messageId);

    //In case DB does not have message id then send response and mask as read
    if (existance.length === 0) {
      await addToDB(type,
        messageTo,
        messageTimestamp,
        messageId,
        messageContent, 
        messageFrom,
        'output'
      ); //conexion con base de datos para agregar
    }
  });
  next();
}

export { messageTypeSocket, databaseAdderSocket };