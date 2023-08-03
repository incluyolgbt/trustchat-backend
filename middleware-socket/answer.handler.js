import { Webhook } from './../services/webhook.service.js';

async function answerMessageSocket(socket, next) {
  
  const webhook = new Webhook();
  socket.on('message', async(data) => {
    try {
      const to = data.to;
      const message = data.text;
      const messageId = data.messageId;

      await webhook.read(messageId); //lo marcara como leido cuando reciba respueta del cliente 
      await webhook.answer(to, message);
    } catch (error) {
      console.error(error); //madar a agente que no se envió el mensaje 
    }
  });
  next();

}


export { answerMessageSocket };

