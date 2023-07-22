const messagesId = require('./data');

class Webhook {

  // definir que tipo es: status o message

  // si es menssaje que tipo de mensaje es: texto, multimedia, etc. 
  // guardar en DB para no mandar mas mensajes 
  // colocar en leido cuando se haga algo con ese mensaje 
  // Usuarie manda mensaje: contestar con template de chatbot 
  //      chatbot: quieres apoyo inmediato (chatbot salud mental)
  //    quieres agendar un chat de confianza 
  //quieres terapia 
  // 
  // Responder: dependiendo de la opcion 
  // para chat de confianza mandar a otro numero de asesor 
  async requestType(req, res){
    if (req.body.entry[0].changes[0].value.statuses) { // mensaje enviado
      console.log(req.body.entry[0].changes[0].value.statuses[0].status);
    } else {
      console.log( // mensaje recibido 
        req.body.entry[0].changes[0].value.messages[0].text.body);

      res.status(200);

      //messageId
      const messageId = String(
        req.body.entry[0].changes[0].value.messages[0].id
      );

      //In case DB does not have message id then send response and mask as read
      if(this.isNotInDB(messageId)){
        this.read(messageId);
        this.answer(NUM);
        messagesId.push(messageId);
      }
  
    }
  }

  async isNotInDB(Id){
    if(!(messagesId.includes(Id))){
      return true;
    }
  }
  
  messageType(){
    return 'message'
  }
  
  async answer(num) {

    fetch('',

      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "preview_url": false,
          "recipient_type": "individual",
          "to": num,
          "type": "text",
          "text": {
            "body": "Hola, ¿cómo estás?"
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

  }

  async read(messageId) {
    fetch('',

      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "status": "read",
          "message_id": messageId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

}

module.exports = Webhook;