const {find, addToDB} = require('./../services/database.service');

const token = 'Bearer '

class Webhook {
  
  async requestType(req, res){ //tipo status
    if (req.body.entry[0].changes[0].value.statuses) { // mensaje enviado
      // estrategia para determinar el status de los mensajes enviados 
      console.log(req.body.entry[0].changes[0].value.statuses[0].status);
    } else { 
      //next();
      await this.messageType(req, res);

      res.status(200);
  
    }
  }
  
  async messageType(req, res){

    //Check out which type of message had been recieved 
    const type = req.body.entry[0].changes[0].value.messages[0].type;
    const messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
    var messageTimestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
    const messageId = req.body.entry[0].changes[0].value.messages[0].id;
    const messageContent = req.body.entry[0].changes[0].value.messages[0];

    // convert timestamp to date 
    var date = new Date(messageTimestamp * 1000).toISOString();
    messageTimestamp = date
    
    const existance = await find(messageId);
  
    
    switch (type){
        case 'text':
          //logica de texto
          //For text type messages

          //In case DB does not have message id then send response and mask as read
        // Este sera otro middleware
          if(existance.length === 0){
            this.read(messageId);
            this.answer(''); // presenta un error el messageFrom 
            await addToDB(type,
                        messageFrom,
                        messageTimestamp,
                        messageId,
                        messageContent[type]); //conexion con base de datos para agregar
          }

          break;
        case 'image':
          //For image type message
          break;
        default:
          break;
      }
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
          'Authorization': token
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success answering'));

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
          'Authorization': token
        }
      }).then(res => res.json())
      .then(response => console.log('Success marking as read'))
      .catch(error => console.error('Error:', error));
  }

}

module.exports = Webhook;