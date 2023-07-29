import {Webhook} from './../services/webhook.service.js';

async function answerMessage(req, res, next) {

  const webhook = new Webhook();

  if (req.body.to) { // si tiene este elemento entonces es del cliente.
    //console.log('answerMessage');
    try {
      const to = req.body.to;
      //console.log(to)
      const message = req.body.entry[0].changes[0].value.messages[0].text.body;
      //console.log(message)
      const messageId = req.body.entry[0].changes[0].value.messages[0].id;

      //await webhook.read(messageId); //lo marcara como leido cuando reciba respueta del cliente 
      await webhook.answer(to, message);

      next();
    } catch (error) {
      console.error(error);
    }

  } else { // sino es de webhook
    next();
  }

}

export { answerMessage };

