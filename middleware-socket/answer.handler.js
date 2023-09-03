import { Webhook } from './../services/webhook.service.js';
import { findUserNumber } from '../services/database.service.js';

async function answerMessageSocket(socket, next) {

  const webhook = new Webhook();
  socket.on('message', async (data, callback) => {
    try {
      const to = data.to;
      const message = data.text;
      const messageId = data.messageId;

      let number = await findUserNumber(to);

      const read  = await webhook.read(messageId); //lo marcara como leido cuando reciba respueta del cliente 
      const answer = await webhook.answer(number, message);
      callback({
        status: answer.status, //Responsdo el estatus que me envía WA 
      });

    } catch (error) {
      console.error(error); //madar a agente que no se envió el mensaje 
    }
  });
  next();

}


export { answerMessageSocket };

